import React from 'react';
import SectionBackground, { TextureType } from './SectionBackground';
import InlineTextEdit from '../ui/InlineTextEdit';

// ... (Layout types unchanged) ...
type HeroLayout =
    | 'classic_split' | 'classic_card' | 'classic_centered'
    | 'impact_full' | 'impact_big_type'
    | 'centered' | 'full_left' | 'split_right' | 'split_left' | 'minimal_centered';

type HeroContent = {
    headline: string;
    subheadline: string;
    cta: string;
};

type HeroProps = {
    layout: HeroLayout;
    theme: 'minimal' | 'bold' | 'trust';
    businessName: string;
    primaryColor: string;
    tone: string;
    logo?: string;

    // Config/State Props
    content?: HeroContent; // OPTIONAL: if provided, use this. Else generate defaults.
    isEditing?: boolean;
    onContentChange?: (field: keyof HeroContent, value: string) => void;

    // BG Props
    backgroundImage?: string;
    overlayOpacity?: number;
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
    overlayTexture?: TextureType;
    textureOpacity?: number;
};

// ... (getHeroContent and getHeroConfig unchanged helper functions) ...
export const getHeroContent = (tone: string, businessName: string): HeroContent => {
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
    overlayOpacity,
    overlayColor,
    overlayGradient,
    overlayTexture,
    textureOpacity
}: HeroProps) {

    // If no external content state provided, generate defaults on fly (read-only mode essentially)
    // In PageEditor we will pass the state so it persists.
    const defaultContent = getHeroContent(tone, businessName);
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
                <SectionBackground backgroundImage={backgroundImage} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
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
                <SectionBackground backgroundImage={backgroundImage} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />

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
                <SectionBackground backgroundImage={backgroundImage} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {logo && <img src={logo} alt="Logo" className="h-16 mx-auto mb-8 shadow-2xl rounded-full" />}
                    {renderCommonContent()}
                </div>
            </section>
        );
    }

    if (layout === 'full_left' || layout === 'impact_full') {
        return (
            <section className={containerClass}>
                <SectionBackground backgroundImage={backgroundImage} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        {logo && <img src={logo} alt="Logo" className="h-12 mb-8" />}
                        <InlineTextEdit value={content.headline} onChange={(v) => onContentChange?.('headline', v)} isEditing={isEditing} tagName="h1" className={`text-5xl md:text-7xl mb-8 leading-tight ${titleClass}`} />
                        <InlineTextEdit value={content.subheadline} onChange={(v) => onContentChange?.('subheadline', v)} isEditing={isEditing} tagName="p" multiline className={`text-lg mb-8 max-w-md ${subClass}`} />
                        <button className={`px-10 py-5 text-xl rounded-lg font-bold transition-transform hover:scale-105 ${t.button}`} style={{ backgroundColor: primaryColor }}>
                            <InlineTextEdit value={content.cta} onChange={(v) => onContentChange?.('cta', v)} isEditing={isEditing} tagName="span" />
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
            <SectionBackground backgroundImage={backgroundImage} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} overlayTexture={overlayTexture} textureOpacity={textureOpacity} theme={theme} />
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
