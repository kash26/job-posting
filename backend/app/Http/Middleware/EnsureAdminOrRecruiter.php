<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminOrRecruiter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $role = $request->user()?->role
            ?? $request->header('X-User-Role')
            ?? $request->cookie('trx_role');

        if (! in_array($role, ['admin', 'recruiter'], true)) {
            return response()->json([
                'message' => 'Forbidden. Admin or recruiter role required.',
            ], 403);
        }

        return $next($request);
    }
}
