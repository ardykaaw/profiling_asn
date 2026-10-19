<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $userData = null;
        if ($user) {
            $userData = array_merge($user->toArray(), [
                'is_admin' => $user->isAdmin(),
                'is_verified' => $user->isVerified(),
                'is_expired' => $user->isExpired(),
                'remaining_days' => $user->remaining_days,
                'verified_at_formatted' => $user->verified_at ? $user->verified_at->translatedFormat('d M Y') : null,
                'expires_at_formatted' => $user->expires_at ? $user->expires_at->translatedFormat('d M Y') : null,
            ]);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $userData,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
