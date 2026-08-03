#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"
RUNTIME_DIR="$ROOT_DIR/.project-runtime"
FRONTEND_PID_FILE="$RUNTIME_DIR/frontend-dev.pid"
FRONTEND_PORT_FILE="$RUNTIME_DIR/frontend-dev.port"
FRONTEND_LOG_FILE="$RUNTIME_DIR/frontend-dev.log"

export FRONTEND_HOST="${FRONTEND_HOST:-0.0.0.0}"
export FRONTEND_PORT="${FRONTEND_PORT:-3000}"
export BACKEND_HTTP_PORT="${BACKEND_HTTP_PORT:-8000}"
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:${BACKEND_HTTP_PORT}/api}"

usage() {
	cat <<'EOF'
Usage: ./launcher.sh <start|stop|restart|status|health|logs> [all|back|frontend]

If no target is provided, target defaults to all.

Commands:
	start all        Start Docker backend services and the local frontend dev server
	start back       Start Docker backend services only
	start frontend   Start only the local frontend dev server
	stop all         Stop backend services and the local frontend dev server
	stop back        Stop only backend services
	stop frontend    Stop only the local frontend dev server
	restart all      Restart backend services and the local frontend dev server
	restart back     Restart only backend services
	restart frontend Restart only the local frontend dev server
	status all       Show backend + frontend status
	status back      Show backend status
	status frontend  Show frontend status
	health           Show quick HTTP health summary
	logs frontend    Follow frontend logs
	logs back        Follow backend Docker logs
	logs all         Follow backend Docker logs

Environment:
	FRONTEND_HOST       Frontend host bind address (default: 0.0.0.0)
	FRONTEND_PORT       Preferred frontend dev server port (default: 3000)
	BACKEND_HTTP_PORT   Backend HTTP port exposed by Docker/Nginx (default: 8000)
	NEXT_PUBLIC_API_URL Frontend API base URL (default: http://localhost:8000/api)

Examples:
	./launcher.sh start all
	./launcher.sh start frontend
	./launcher.sh status all
	./launcher.sh logs back
EOF
}

ensure_runtime_dir() {
	mkdir -p "$RUNTIME_DIR"
}

ensure_project_paths() {
	if [[ ! -d "$FRONTEND_DIR" ]]; then
		echo "Missing frontend directory: $FRONTEND_DIR"
		exit 1
	fi

	if [[ ! -d "$BACKEND_DIR" ]]; then
		echo "Missing backend directory: $BACKEND_DIR"
		exit 1
	fi
}

ensure_compose_compat_paths() {
	if [[ ! -e "$ROOT_DIR/front" ]]; then
		ln -s "frontend" "$ROOT_DIR/front"
	fi

	if [[ ! -e "$ROOT_DIR/back" ]]; then
		ln -s "backend" "$ROOT_DIR/back"
	fi
}

command_exists() {
	command -v "$1" >/dev/null 2>&1
}

port_in_use() {
	local port="$1"
	lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

read_frontend_port() {
	if [[ -f "$FRONTEND_PORT_FILE" ]]; then
		cat "$FRONTEND_PORT_FILE"
	else
		echo "$FRONTEND_PORT"
	fi
}

find_available_frontend_port() {
	local preferred_port="$1"
	local port="$preferred_port"
	local attempts=0

	while (( attempts < 20 )); do
		if ! port_in_use "$port"; then
			echo "$port"
			return 0
		fi

		port=$((port + 1))
		attempts=$((attempts + 1))
	done

	echo "Unable to find an available frontend port starting from $preferred_port" >&2
	exit 1
}

frontend_pids() {
	ps -eo pid=,command= \
		| rg "$FRONTEND_DIR" \
		| rg "next dev|next/dist/bin/next" \
		| awk '{print $1}' || true
}

cleanup_frontend_processes() {
	local pids
	pids="$(frontend_pids | tr '\n' ' ' | sed 's/[[:space:]]\+$//')"
	if [[ -n "$pids" ]]; then
		echo "Stopping stale frontend process(es): $pids"
		kill $pids 2>/dev/null || true
		return 0
	fi

	return 1
}

frontend_pid_running() {
	[[ -f "$FRONTEND_PID_FILE" ]] && kill -0 "$(cat "$FRONTEND_PID_FILE")" 2>/dev/null
}

print_frontend_status() {
	if frontend_pid_running; then
		local current_port
		current_port="$(read_frontend_port)"
		echo "Frontend: running (pid $(cat "$FRONTEND_PID_FILE"), port $current_port)"
		echo "URL: http://localhost:$current_port"
		echo "Logs: $FRONTEND_LOG_FILE"
	elif [[ -n "$(frontend_pids)" ]]; then
		echo "Frontend: running, but not managed by launcher (pid(s) $(frontend_pids | tr '\n' ' ' | sed 's/[[:space:]]\+$//'))."
	else
		echo "Frontend: stopped"
	fi
}

start_backend() {
	ensure_compose_compat_paths
	(
		cd "$ROOT_DIR"
		docker compose up -d db redis back nginx
	)
}

stop_backend() {
	ensure_compose_compat_paths
	(
		cd "$ROOT_DIR"
		docker compose stop nginx back db redis
	)
	echo "Backend stopped."
}

status_backend() {
	ensure_compose_compat_paths
	(
		cd "$ROOT_DIR"
		docker compose ps db redis back nginx
	)
}

start_frontend() {
	local selected_port

	cleanup_frontend_processes || true
	rm -f "$FRONTEND_PID_FILE"

	if frontend_pid_running; then
		echo "Frontend already running (pid $(cat "$FRONTEND_PID_FILE"))."
		return
	fi

	if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
		echo "Frontend dependencies are missing. Run 'cd frontend && npm install' first."
		exit 1
	fi

	selected_port="$(find_available_frontend_port "$FRONTEND_PORT")"

	(
		cd "$FRONTEND_DIR"
		NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
		nohup npm run dev -- --hostname "$FRONTEND_HOST" --port "$selected_port" > "$FRONTEND_LOG_FILE" 2>&1 &
		echo $! > "$FRONTEND_PID_FILE"
		echo "$selected_port" > "$FRONTEND_PORT_FILE"
	)

	sleep 2
	if frontend_pid_running; then
		echo "Frontend started on http://localhost:$selected_port (pid $(cat "$FRONTEND_PID_FILE"))."
	else
		echo "Frontend failed to start."
		[[ -f "$FRONTEND_LOG_FILE" ]] && tail -n 30 "$FRONTEND_LOG_FILE"
		rm -f "$FRONTEND_PID_FILE" "$FRONTEND_PORT_FILE"
		exit 1
	fi
}

stop_frontend() {
	local stopped_any=0

	if cleanup_frontend_processes; then
		stopped_any=1
	fi

	if [[ -f "$FRONTEND_PID_FILE" ]]; then
		local pid
		pid="$(cat "$FRONTEND_PID_FILE")"
		if kill -0 "$pid" 2>/dev/null; then
			kill "$pid"
		fi
		rm -f "$FRONTEND_PID_FILE" "$FRONTEND_PORT_FILE"
		stopped_any=1
	else
		rm -f "$FRONTEND_PORT_FILE"
	fi

	if (( stopped_any )); then
		echo "Frontend stopped."
	else
		echo "Frontend already stopped."
	fi
}

health() {
	local backend_status frontend_status frontend_port
	frontend_port="$(read_frontend_port)"
	backend_status="$(curl -sS -o /dev/null -w "%{http_code}" "http://localhost:${BACKEND_HTTP_PORT}" || true)"
	frontend_status="$(curl -sS -o /dev/null -w "%{http_code}" "http://localhost:${frontend_port}" || true)"
	echo "JOB_POSTING_BACKEND_HTTP=${backend_status:-DOWN}"
	echo "JOB_POSTING_FRONTEND_HTTP=${frontend_status:-DOWN}"
}

logs_backend() {
	ensure_compose_compat_paths
	(
		cd "$ROOT_DIR"
		docker compose logs -f db redis back nginx
	)
}

logs_frontend() {
	if [[ -f "$FRONTEND_LOG_FILE" ]]; then
		tail -f "$FRONTEND_LOG_FILE"
	else
		echo "No frontend log file found yet. Start the frontend first."
	fi
}

main() {
	local action="${1:-}"
	local target="${2:-all}"

	cd "$ROOT_DIR"
	ensure_runtime_dir
	ensure_project_paths

	if ! command_exists rg; then
		echo "This launcher requires 'rg' to inspect local processes."
		exit 1
	fi

	if [[ -z "$action" ]]; then
		usage
		exit 1
	fi

	case "$target" in
		all|back|backend|frontend|front)
			;;
		*)
			echo "Unknown target: $target"
			usage
			exit 1
			;;
		esac

	case "$action" in
		start)
			case "$target" in
				all)
					start_backend
					start_frontend
					echo "Project started."
					;;
				back|backend)
					start_backend
					echo "Backend started."
					;;
				frontend|front)
					start_frontend
					;;
			esac
			;;
		stop)
			case "$target" in
				all)
					stop_frontend
					stop_backend
					;;
				back|backend)
					stop_backend
					;;
				frontend|front)
					stop_frontend
					;;
			esac
			;;
		restart)
			case "$target" in
				all)
					stop_frontend
					stop_backend
					start_backend
					start_frontend
					;;
				back|backend)
					stop_backend
					start_backend
					;;
				frontend|front)
					stop_frontend
					start_frontend
					;;
			esac
			;;
		status)
			case "$target" in
				all)
					status_backend
					print_frontend_status
					;;
				back|backend)
					status_backend
					;;
				frontend|front)
					print_frontend_status
					;;
			esac
			;;
		health)
			health
			;;
		logs)
			case "$target" in
				all)
					logs_backend
					;;
				back|backend)
					logs_backend
					;;
				frontend|front)
					logs_frontend
					;;
			esac
			;;
		-h|--help|help)
			usage
			;;
		*)
			echo "Unknown command: $action"
			usage
			exit 1
			;;
		esac
}

main "$@"
