import React from 'react';
import SectionBackground, { TextureType } from './SectionBackground';
import InlineTextEdit from '../ui/InlineTextEdit';

// ... (Layout types unchanged) ...
type HeroLayout =
    | 'classic_split' | 'classic_card' | 'classic_centered'
    | 'impact_full' | 'impact_big_type'
    | 'centered' | 'full_left' | 'split_right' | 'split_left' | 'minimal_centered' | 'artistic_intense';

type HeroContent = {
    headline: string;
    subheadline: string;
    cta: string;
};

type HeroProps = {
    layout: HeroLayout;
    theme: 'minimal' | 'bold' | 'trust';
    businessName: string;
    industry?: string; // NEW
    primaryColor: string;
    tone: string;
    logo?: string;

    // Config/State Props
    content?: HeroContent; // OPTIONAL: if provided, use this. Else generate defaults.
    isEditing?: boolean;
    onContentChange?: (field: keyof HeroContent, value: string) => void;

    // BG Props
    backgroundImage?: string;
    backgroundVideo?: string; // New
    overlayOpacity?: number;
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
    overlayTexture?: TextureType;
    textureOpacity?: number;
};

// ... (getHeroContent and getHeroConfig unchanged helper functions) ...
export const getHeroContent = (tone: string, businessName: string, industry?: string): HeroContent => {
    // 1. Industry Specific Defaults
    if (industry === 'music') return {
        headline: `Novo Som: ${businessName}`,
        subheadline: "Disponível em todas as plataformas digitais. Sinta a vibe e conecte-se com a música.",
        cta: "Ouvir Agora"
    };
    if (industry === 'health') return {
        headline: `${businessName}: Sua Saúde em Primeiro Lugar`,
        subheadline: "Atendimento humanizado e especialistas dedicados ao seu bem-estar e qualidade de vida.",
        cta: "Agendar Consulta"
    };
    if (industry === 'digital') return {
        headline: "Liberdade para Vender Online",
        subheadline: "Transforme seu home office em uma máquina de vendas com nossas estratégias digitais.",
        cta: "Começar Agora"
    };
    if (industry === 'services') return {
        headline: `Soluções Ágeis para Você`,
        subheadline: "Serviços de qualidade no conforto da sua casa. Solicite um orçamento sem compromisso.",
        cta: "Pedir Orçamento"
    };

    // 2. Tone Fallbacks
    if (tone.includes('Criativo')) return {
        headline: `Inovação e Design para ${businessName}`,
        subheadline: "Transformamos suas ideias em experiências digitais memoráveis e únicas.",
        cta: "Começar Agora"
    };
    if (tone.includes('Sério')) return {
        headline: `Soluções Corporativas ${businessName}`,
        subheadline: "Excelência, segurança e confiança para impulsionar seus resultados estratégicos.",
        cta: "Fale Conosco"
    };
    return {
        headline: `Bem-vindo à ${businessName}`,
        subheadline: "Ajudamos você a alcançar seus objetivos com qualidade superior e eficiência.",
        cta: "Saiba Mais"
    };
};

export const getHeroConfig = (legacyStyle: string) => {
    if (legacyStyle.includes('Minimalista')) return { layout: 'centered', theme: 'minimal' };
    if (legacyStyle.includes('Impacto')) return { layout: 'full_left', theme: 'bold' };
    return { layout: 'split_right', theme: 'trust' };
};

export default function SmartHero({
    layout,
    theme,
    businessName,
    primaryColor,
    tone,
    logo,
    content: externalContent,
    isEditing = false,
    onContentChange,
    backgroundImage,
    backgroundVideo, // New
    overlayOpacity,
    overlayColor,
    overlayGradient,
    overlayTexture,
    textureOpacity,
    industry
}: HeroProps) {

    // If no external content state provided, generate defaults on fly (read-only mode essentially)
    // In PageEditor we will pass the state so it persists.
    const defaultContent = getHeroContent(tone, businessName, industry);
    const content = externalContent || defaultContent;

    // ... Themes (unchanged) ...
    const themes = {
        minimal: {
            bg: 'bg-white',
            textTitle: 'text-neutral-900 tracking-tight',
            textSub: 'text-neutral-500',
            button: 'text-white shadow-lg border-2 border-transparent'
        },
        bold: {
            bg: 'bg-black text-white',
            textTitle: 'text-white font-black uppercase tracking-wider',
            textSub: 'text-neutral-400 font-mono',
            button: 'text-black font-bold uppercase tracking-widest hover:bg-white/90'
        },
        trust: {
            bg: 'bg-slate-50',
            textTitle: 'text-slate-900 font-bold',
            textSub: 'text-slate-600 leading-relaxed',
            button: 'text-white font-semibold rounded-lg shadow-md hover:brightness-110'
        }
    };
    const t = themes[theme] || themes.trust;
    const hasCustomBg = !!backgroundImage;
    const containerClass = `relative min-h-[600px] flex items-center py-20 px-6 overflow-hidden ${!hasCustomBg ? t.bg : ''}`;

    // Helper for Text Colors (adapts to custom BG)
    const titleClass = `${t.textTitle} ${hasCustomBg ? 'text-white' : ''}`;
    const subClass = `${t.textSub} ${hasCustomBg ? 'text-neutral-200' : ''}`;

    // Renders
    const renderCommonContent = () => (
        <>
            <InlineTextEdit
                value={content.headline}
                onChange={(v) => onContentChange?.('headline', v)}
                isEditing={isEditing}
                tagName="h1"
                className={`text-4xl md:text-6xl mb-6 leading-tight ${titleClass}`}
            />
            <InlineTextEdit
                value={content.subheadline}
                onChange={(v) => onContentChange?.('subheadline', v)}
                isEditing={isEditing}
                tagName="p"
                multiline
                className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${subClass}`}
            />
            <div className="flex gap-4 justify-center">
                <button className={`px-8 py-4 text-lg rounded-full transition-all ${t.button}`} style={{ backgroundColor: primaryColor }}>
                    <InlineTextEdit
                        value={content.cta}
                        onChange={(v) => onContentChange?.('cta', v)}
                        isEditing={isEditing}
                        tagName="span"
                    />
                </button>
            </div>
        </>
    );

    // --- RENDERERS ---

    if (layout === 'classic_card') {
        return (
            <section className={`relative min-h-[700px] flex items-center justify-center py-20 px-6 ${!hasCustomBg ? t.bg : ''}`}>
                <SectionBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
                {!hasCustomBg && <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent"></div>}

                <div className="relative z-10 w-full max-w-6xl">
                    <div className="bg-white p-12 md:p-16 rounded-2xl shadow-2xl max-w-2xl border-t-8 mr-auto animate-fade-in-up" style={{ borderColor: primaryColor }}>
                        {logo && <img src={logo} alt="Logo" className="h-10 mb-8" />}
                        <InlineTextEdit value={content.headline} onChange={(v) => onContentChange?.('headline', v)} isEditing={isEditing} tagName="h1" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight" />
                        <InlineTextEdit value={content.subheadline} onChange={(v) => onContentChange?.('subheadline', v)} isEditing={isEditing} tagName="p" multiline className="text-lg text-slate-600 mb-8 leading-relaxed" />
                        <button className="px-8 py-4 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: primaryColor }}>
                            <InlineTextEdit value={content.cta} onChange={(v) => onContentChange?.('cta', v)} isEditing={isEditing} tagName="span" />
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (layout === 'impact_big_type') {
        return (
            <section className={`relative min-h-[800px] flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden ${!hasCustomBg ? 'bg-black text-white' : ''}`}>
                <SectionBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />

                <div className="relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur mb-10 text-sm font-medium animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span> Disponível Agora
                    </div>
                    {/* Simplified big type edit: just render standard editable header for now to avoid complex split logic bugs */}
                    <InlineTextEdit value={content.headline} onChange={(v) => onContentChange?.('headline', v)} isEditing={isEditing} tagName="h1" className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white" />

                    <InlineTextEdit value={content.subheadline} onChange={(v) => onContentChange?.('subheadline', v)} isEditing={isEditing} tagName="p" multiline className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12" />

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="px-10 py-5 rounded-full font-bold text-black bg-white hover:scale-105 transition-transform"><InlineTextEdit value={content.cta} onChange={(v) => onContentChange?.('cta', v)} isEditing={isEditing} tagName="span" /></button>
                        <button className="px-10 py-5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-transform">Ver Vídeo</button>
                    </div>
                </div>
            </section>
        );
    }

    if (layout === 'centered' || layout === 'minimal_centered' || layout === 'classic_centered') {
        const isMinimal = layout === 'minimal_centered';
        return (
            <section className={`${containerClass} justify-center`}>
                <SectionBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {logo && <img src={logo} alt="Logo" className="h-16 mx-auto mb-8 shadow-2xl rounded-full" />}
                    {renderCommonContent()}
                </div>
            </section>
        );
    }

    if (layout === 'artistic_intense') {
        const bg = backgroundImage ? `url(${backgroundImage})` : 'none';
        return (
            <section className="relative min-h-screen flex items-end justify-center py-24 px-4 overflow-hidden bg-black text-white">
                {/* Background Layer with Zoom Effect */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    {backgroundImage ? (
                        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 scale-105" style={{ backgroundImage: bg }}></div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-slate-900 opacity-100"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
                    {/* Floating Tag */}
                    <div className="animate-bounce mb-8">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em]">
                            Novo Lançamento
                        </span>
                    </div>

                    {/* Massive Typography */}
                    <div className="relative mb-8 group">
                        <InlineTextEdit
                            value={content.headline}
                            onChange={(v) => onContentChange?.('headline', v)}
                            isEditing={isEditing}
                            tagName="h1"
                            className="text-7xl md:text-[9rem] hover:scale-105 transition-transform duration-700 font-black uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl"
                        />
                        {/* Glitch Shadow Effect */}
                        <h1 className="absolute top-1 left-1 w-full text-7xl md:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter text-red-500/0 group-hover:text-red-500/30 -z-10 transition-all duration-300 select-none">
                            {content.headline}
                        </h1>
                    </div>

                    <InlineTextEdit
                        value={content.subheadline}
                        onChange={(v) => onContentChange?.('subheadline', v)}
                        isEditing={isEditing}
                        tagName="p"
                        multiline
                        className="text-lg md:text-2xl text-neutral-300 font-light tracking-wide max-w-2xl mb-12 mix-blend-plus-lighter"
                    />

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                        <button className="flex-1 bg-white text-black h-14 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                            <InlineTextEdit value={content.cta} onChange={(v) => onContentChange?.('cta', v)} isEditing={isEditing} tagName="span" />
                        </button>
                        <button className="flex-1 border border-white/30 text-white h-14 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all">
                            Ver Tour
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // Default Split
    const isReverse = layout === 'split_left';
    return (
        <section className={containerClass}>
            <SectionBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
            <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`order-2 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    {logo && <img src={logo} alt="Logo" className="h-10 mb-6 opacity-80" />}
                    <InlineTextEdit value={content.headline} onChange={(v) => onContentChange?.('headline', v)} isEditing={isEditing} tagName="h1" className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight ${titleClass}`} />
                    <InlineTextEdit value={content.subheadline} onChange={(v) => onContentChange?.('subheadline', v)} isEditing={isEditing} tagName="p" multiline className={`text-lg mb-8 leading-relaxed ${subClass}`} />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className={`px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20 ${t.button}`} style={{ backgroundColor: primaryColor }}>
                            <InlineTextEdit value={content.cta} onChange={(v) => onContentChange?.('cta', v)} isEditing={isEditing} tagName="span" />
                        </button>
                    </div>
                </div>
                <div className={`order-1 ${isReverse ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    {!hasCustomBg ? (
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
                            <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center"><span className="text-slate-300 font-bold">Imagem / Dashboard</span></div>
                        </div>
                    ) : <div className="h-full min-h-[300px]"></div>}
                </div>
            </div>
        </section>
    );
}
