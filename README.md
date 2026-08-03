# Job Posting Monorepo

Monorepo de base pour une plateforme de publication d'offres d'emploi.

## Structure

- front: Next.js + Tailwind CSS
- back: Laravel API
- docker: configuration Docker (PHP-FPM, Nginx)
- docker-compose.yml: orchestration locale complete
- AGENTS.md: regles et standards obligatoires avant commit

## Reusable Agent Prompt Workflow

The repository now includes a reusable AI prompt system to avoid rewriting the same implementation constraints for every task.

- Canonical project context: `data/context.md`
- Official design source: `DESIGN.md`
- Governance and quality rules: `AGENTS.md`
- Reusable prompts and asset notes: `data/resources/`
- Design exploration archive: `data/stitch_design/`

Recommended usage:

1. Start with `data/resources/agent_pre_prompt.md` or one of the frontend/backend variants.
2. Replace the task placeholder with the current implementation goal.
3. Let the agent load `AGENTS.md`, `data/context.md`, `DESIGN.md`, and any directly impacted files.
4. After implementation, use `data/resources/agent_post_prompt.md` to produce a consistent delivery summary.

## Prerequis

- Docker + Docker Compose
- Node.js (si execution front hors Docker)
- PHP/Composer (si execution back hors Docker)

## Demarrage Local (Docker)

1. Copier les variables d'environnement:
   - cp .env.example .env
   - cp front/.env.example front/.env.local
   - cp back/.env.example back/.env
2. Lancer les conteneurs:
   - docker compose up --build -d
3. Installer les dependances backend dans le conteneur:
   - docker compose exec back composer install
4. Generer la cle Laravel:
   - docker compose exec back php artisan key:generate
5. Executer les migrations:
   - docker compose exec back php artisan migrate

## URLs Locales

- Frontend: http://localhost:3000
- Backend API via Nginx: http://localhost:8000
- MySQL: localhost:3306
- Redis: localhost:6379

## Notes Deployment

- Frontend cible: Vercel
- Variable frontend a configurer sur Vercel:
  - NEXT_PUBLIC_API_URL=https://votre-api-domaine.tld/api
- Backend: deploiement sur une infra PHP/Laravel (VPS, PaaS, conteneur).

## Commandes Utiles

- Arreter la stack: docker compose down
- Voir les logs: docker compose logs -f
- Ouvrir un shell backend: docker compose exec back sh
- Ouvrir un shell frontend: docker compose exec front sh
# job-posting
