import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="32" height="32" rx="8" fill="#F0A500" />
            <text
                x="16"
                y="21"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fontFamily="JetBrains Mono, monospace"
                fill="#0B1023"
            >
                CP
            </text>
        </svg>
    );
}

