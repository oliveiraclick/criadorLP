import React from 'react';
import LogoDisplay from '@/components/ui/LogoDisplay';

type HeroProps = {
    layout: 'centered' | 'full_left' | 'split_right'; // Replaces 'style' for structure
    theme: 'minimal' | 'bold' | 'trust'; // Replaces 'style' for colors/fonts
    businessName: string;
    primaryColor: string;
    tone: string;
    logo?: string;
    // Background Customization
    backgroundImage?: string;
    overlayOpacity?: number; // 0 to 100
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
};

// Map legacy 'style' prop to new layout/theme system
export const getHeroConfig = (legacyStyle: string) => {
    switch (legacyStyle) {
        case 'Limpo & Minimalista': return { layout: 'centered', theme: 'minimal' };
        case 'Ousado & Escuro': return { layout: 'full_left', theme: 'bold' };
        case 'Corporativo / Confiança':
        default: return { layout: 'split_right', theme: 'trust' };
    }
}

export default function SmartHero({
    layout,
    theme,
    businessName,
    primaryColor,
    tone,
    logo,
    backgroundImage,
    overlayOpacity = 80,
    overlayColor = '#000000',
    overlayGradient = 'none'
}: HeroProps) {

    // Content Generation Logic
    const getHeadline = () => {
        if (tone === 'Urgente & Promocional') return `Oferta Exclusiva da ${businessName}!`;
        if (tone === 'Luxuoso & Exclusivo') return `Redefinindo a Excelência em ${businessName}`;
        if (tone === 'Amigável & Acolhedor') return `Bem-vindo à família ${businessName}`;
        return `Soluções Profissionais com a ${businessName}`;
    };

    const getSubheadline = () => {
        if (tone === 'Urgente & Promocional') return "Garanta sua vaga agora antes que acabe. O tempo está correndo!";
        return "Transformando seus objetivos em realidade com qualidade e dedicação.";
    };

    const headline = getHeadline();
    const subheadline = getSubheadline();

    // --- THEME DEFINITIONS ---
    const themes = {
        minimal: {
            bg: 'bg-white',
            textTitle: 'text-neutral-900 font-serif',
            textSub: 'text-neutral-500 font-light',
            btnPrimary: 'text-white rounded-full hover:opacity-90',
            btnSecondary: 'border border-neutral-200 text-neutral-600 rounded-full hover:bg-neutral-50',
            badge: 'bg-neutral-100 text-neutral-500',
            accent: primaryColor // Minimal uses primary color sparsely
        },
        bold: {
            bg: 'bg-neutral-900',
            textTitle: 'text-white font-black uppercase tracking-tighter',
            textSub: 'text-neutral-400 font-medium',
            btnPrimary: 'text-black font-bold uppercase tracking-wide hover:scale-105',
            btnSecondary: 'border-2 border-neutral-700 text-white font-bold uppercase hover:bg-neutral-800',
            badge: 'bg-neutral-800 text-white uppercase font-bold tracking-widest',
            accent: primaryColor // Bold uses it for high contrast
        },
        trust: {
            bg: 'bg-slate-50',
            textTitle: 'text-slate-900 font-bold',
            textSub: 'text-slate-600',
            btnPrimary: 'text-white font-semibold rounded-lg shadow-lg hover:shadow-xl',
            btnSecondary: 'text-slate-600 font-medium hover:text-slate-900',
            badge: 'bg-blue-50 text-blue-700 font-semibold',
            accent: primaryColor
        }
    };

    const currentTheme = themes[theme as keyof typeof themes] || themes.trust;

    // --- SHARED ELEMENTS ---

    // Background Layer Logic
    const BackgroundLayer = () => {
        if (!backgroundImage) return null;

        // Opacity conversion (0.0 to 1.0)
        const op = overlayOpacity / 100;

        return (
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundColor: overlayGradient === 'none' ? overlayColor : undefined,
                        backgroundImage: overlayGradient !== 'none' ? `linear-gradient(${overlayGradient === 'to_bottom' ? '180deg' : '90deg'}, ${overlayColor}, transparent)` : undefined,
                        // Note: Fixing gradient logic simplifies it a bit for demo: Solid Color OR Linear Gradient from Color to Transparent
                        // For 'radial', we'll simulate.
                        opacity: op
                    }}
                />
            </div>
        );
    }

    // If background image is present, we need to ensure text is visible.
    // We override theme text colors to white if we have a dark overlay? 
    // Or we assume the user picks the right theme (e.g. Bold/Dark) for image backgrounds.
    // Let's enforce relative placement on sections to contain the absolute background.

    const LogoOrBadge = () => (
        logo ? <LogoDisplay src={logo} alt={businessName} className={`${layout === 'centered' ? 'mx-auto' : ''} h-12 mb-6`} fallback={<div className={`inline-block px-3 py-1 ${currentTheme.badge} rounded-full text-xs mb-6`}>{businessName}</div>} /> :
            <div className={`inline-block px-3 py-1 ${currentTheme.badge} rounded-full text-xs mb-6`}>
                {businessName}
            </div>
    );

    const Buttons = () => (
        <div className={`flex ${layout === 'centered' ? 'justify-center' : ''} gap-4 mt-8`}>
            <button
                style={{ backgroundColor: currentTheme.accent }}
                className={`px-8 py-3 transition-all ${currentTheme.btnPrimary}`}
            >
                Começar Agora
            </button>
            <button className={`px-8 py-3 transition-all ${currentTheme.btnSecondary}`}>
                Saber Mais
            </button>
        </div>
    );

    // --- LAYOUTS ---

    // 1. CENTERED LAYOUT
    if (layout === 'centered') {
        return (
            <section className={`py-24 px-6 ${currentTheme.bg} relative`}>
                <BackgroundLayer />
                <div className="max-w-4xl mx-auto text-center relative z-20">
                    <LogoOrBadge />
                    <h1 className={`text-5xl md:text-6xl mb-6 leading-tight ${currentTheme.textTitle}`}>
                        {headline}
                    </h1>
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto ${currentTheme.textSub}`}>
                        {subheadline}
                    </p>
                    <Buttons />
                </div>
            </section>
        );
    }

    // 2. FULL LEFT (Bold Impact)
    if (layout === 'full_left') {
        return (
            <section className={`py-32 px-6 ${currentTheme.bg} relative overflow-hidden`}>
                <BackgroundLayer />
                {!backgroundImage && (
                    <div
                        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ backgroundColor: primaryColor }}
                    />
                )}

                <div className="max-w-6xl mx-auto relative z-20">
                    <div className="max-w-3xl">
                        <LogoOrBadge />
                        <h1 className={`text-6xl md:text-8xl mb-8 leading-[0.9] ${currentTheme.textTitle}`}>
                            {headline}
                        </h1>
                        <div className="w-24 h-2 mb-8" style={{ backgroundColor: primaryColor }} />
                        <p className={`text-2xl mb-10 ${currentTheme.textSub}`}>
                            {subheadline}
                        </p>
                        <Buttons />
                    </div>
                </div>
            </section>
        );
    }

    // 3. SPLIT RIGHT (Classic Corporate)
    return ( // Default split
        <section className={`py-20 px-6 ${currentTheme.bg} relative`}>
            <BackgroundLayer />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
                <div>
                    <LogoOrBadge />
                    <h1 className={`text-4xl md:text-5xl mb-6 leading-tight ${currentTheme.textTitle}`}>
                        {headline}
                    </h1>
                    <p className={`text-lg leading-relaxed mb-8 ${currentTheme.textSub}`}>
                        {subheadline}
                    </p>
                    <Buttons />
                    <div className="mt-8 flex items-center gap-2 text-sm opacity-60">
                        <span>⭐⭐⭐⭐⭐</span>
                        <span>Mais de 500 clientes satisfeitos</span>
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="aspect-square bg-neutral-200 rounded-2xl relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">
                        Imagem do {businessName}
                    </div>
                </div>
            </div>
        </section>
    );
}
