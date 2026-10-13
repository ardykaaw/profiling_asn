import type { SVGAttributes } from 'react';

export default function AppLogoIcon({ className = 'size-8', ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <defs>
                <linearGradient id="proasnGrad1" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#065F46" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="proasnGrad2" x1="14" y1="8" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="proasnGlow" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#065F46" stopOpacity="0.05" />
                </linearGradient>
            </defs>

            {/* Subtle Minimalist Rounded Plate */}
            <rect width="36" height="36" rx="10" fill="url(#proasnGlow)" />
            <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#E2E8F0" strokeOpacity="0.8" />

            {/* Geometric Ascend Monogram: Modern faceted P / Growth Chevron */}
            <path
                d="M10 26V10C10 8.89543 10.8954 8 12 8H20C24.4183 8 28 11.5817 28 16C28 20.4183 24.4183 24 20 24H15"
                stroke="url(#proasnGrad1)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Dynamic Upward Momentum Facet */}
            <path
                d="M16 16L20 12L24 16"
                stroke="url(#proasnGrad2)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Precision Focal Dot */}
            <circle cx="10" cy="26" r="1.8" fill="#047857" />
        </svg>
    );
}
