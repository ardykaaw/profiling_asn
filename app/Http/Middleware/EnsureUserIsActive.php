<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        // Administrators bypass verification checks
        if ($user->isAdmin()) {
            return $next($request);
        }

        // Allow logging out at any time
        if ($request->routeIs('logout')) {
            return $next($request);
        }

        // If user is verified and active:
        if ($user->isVerified()) {
            // If they accidentally visit the waiting page, redirect to dashboard
            if ($request->routeIs('waiting-verification')) {
                return redirect()->route('dashboard');
            }
            return $next($request);
        }

        // If user is NOT verified (pending or inactive/expired):
        // Allow them to view the waiting verification page
        if ($request->routeIs('waiting-verification')) {
            return $next($request);
        }

        // Redirect all protected attempts to the waiting verification screen
        return redirect()->route('waiting-verification');
    }
}
