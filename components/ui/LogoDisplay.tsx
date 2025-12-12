"use client";

import { useEffect, useState } from 'react';

type LogoDisplayProps = {
    src?: string;
    alt: string;
    className?: string;
    fallback: React.ReactNode;
};

export default function LogoDisplay({ src, alt, className, fallback }: LogoDisplayProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!src) return;

        if (src === 'local') {
            // Retrieve from local storage
            const stored = localStorage.getItem('project_logo');
            if (stored) {
                setImageSrc(stored);
            }
        } else {
            setImageSrc(src);
        }
    }, [src]);

    if (!src) return <>{fallback}</>;

    // While checking storage, we might show nothing or fallback
    // But usually this effect runs fast.

    if (src === 'local' && !imageSrc) {
        // Still loading or not found
        return <>{fallback}</>;
    }

    return <img src={imageSrc || src} alt={alt} className={className} />;
}
