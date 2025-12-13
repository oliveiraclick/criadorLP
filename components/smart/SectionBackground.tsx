import React from 'react';

export type TextureType = 'none' | 'dots' | 'grid' | 'noise' | 'lines' | 'mesh';

type SectionBackgroundProps = {
    backgroundImage?: string;
    overlayOpacity?: number; // 0-100
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
    overlayTexture?: TextureType;
    textureOpacity?: number; // 0-100
    theme?: 'minimal' | 'bold' | 'trust'; // to decide texture color
};

export default function SectionBackground({
    backgroundImage,
    overlayOpacity = 80,
    overlayColor = '#000000',
    overlayGradient = 'none',
    overlayTexture = 'none',
    textureOpacity = 30,
    theme = 'trust'
}: SectionBackgroundProps) {

    const hasCustomBg = !!backgroundImage;

    // 1. BG IMAGE STYLE
    const bgStyle = hasCustomBg ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    // 2. COLOR OVERLAY STYLE
    const getGradientStyle = () => {
        if (!hasCustomBg && !backgroundImage) return {};
        const opacityHex = Math.round((overlayOpacity / 100) * 255).toString(16).padStart(2, '0');
        const colorWithOp = `${overlayColor}${opacityHex}`;

        if (overlayGradient === 'to_bottom') return { background: `linear-gradient(to bottom, ${colorWithOp}, ${overlayColor})` };
        if (overlayGradient === 'to_right') return { background: `linear-gradient(to right, ${colorWithOp}, transparent)` };
        if (overlayGradient === 'radial') return { background: `radial-gradient(circle, transparent 20%, ${colorWithOp} 100%)` };

        return { backgroundColor: colorWithOp };
    };
    const overlayStyle = getGradientStyle();

    // 3. TEXTURE OVERLAY STYLE
    const getTextureStyle = () => {
        if (overlayTexture === 'none') return {};

        const opacity = textureOpacity / 100;
        const color = theme === 'bold' || hasCustomBg ? '255, 255, 255' : '0, 0, 0';

        switch (overlayTexture) {
            case 'dots':
                return {
                    backgroundImage: `radial-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                };
            case 'grid':
                return {
                    backgroundImage: `linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                };
            case 'lines':
                return {
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(${color}, ${opacity}) 0, rgba(${color}, ${opacity}) 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '10px 10px'
                };
            case 'mesh':
                return {
                    backgroundImage: `radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
                                       radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                                       radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)`,
                    opacity: opacity
                };
            case 'noise':
                return {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${opacity}'/%3E%3C/svg%3E")`,
                };
            default:
                return {};
        }
    };
    const textureStyle = getTextureStyle();

    return (
        <div className="absolute inset-0 z-0 pointer-events-none" style={bgStyle}>
            {hasCustomBg && <div className="absolute inset-0" style={overlayStyle}></div>}
            {overlayTexture !== 'none' && <div className="absolute inset-0" style={textureStyle}></div>}
        </div>
    );
}
