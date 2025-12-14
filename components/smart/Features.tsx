import * as LucideIcons from 'lucide-react';
import { LucideIcon, Settings } from 'lucide-react';
import React from 'react';
import IconPicker from '../ui/IconPicker';
import SectionBackground, { TextureType } from './SectionBackground';
import InlineTextEdit from '../ui/InlineTextEdit';

export type FeatureItem = {
    id: string;
    title: string;
    desc: string;
    iconName: string;
}

export const getDefaultFeatures = (industry: string): FeatureItem[] => {
    const defaults = [
        { id: '1', title: 'Alta Performance', desc: 'Otimizado para resultados rápidos.', iconName: 'Zap' },
        { id: '2', title: 'Segurança Total', desc: 'Seus dados protegidos sempre.', iconName: 'Shield' },
        { id: '3', title: 'Suporte 24/7', desc: 'Estamos sempre aqui para ajudar.', iconName: 'Headphones' },
    ];
    if (industry?.includes('health')) return [
        { id: '1', title: 'Atendimento Humanizado', desc: 'Sua saúde e conforto em primeiro lugar.', iconName: 'Heart' },
        { id: '2', title: 'Especialistas', desc: 'Profissionais altamente qualificados.', iconName: 'Award' },
        { id: '3', title: 'Sorria Sem Medo', desc: 'Tecnologia avançada para o seu sorriso.', iconName: 'Smile' },
    ];
    if (industry?.includes('music')) return [
        { id: '1', title: 'Som de Alta Qualidade', desc: 'Produção impecável em cada faixa.', iconName: 'Music' },
        { id: '2', title: 'Shows e Eventos', desc: 'Confira a agenda e garanta seu lugar.', iconName: 'Mic' },
        { id: '3', title: 'Merch Exclusivo', desc: 'Produtos oficiais para fãs de verdade.', iconName: 'ShoppingBag' },
    ];
    if (industry?.includes('digital')) return [
        { id: '1', title: 'Liberdade Geográfica', desc: 'Trabalhe de onde quiser, quando quiser.', iconName: 'Globe' },
        { id: '2', title: 'Renda Escalável', desc: 'Multiplique seus ganhos com estratégias digitais.', iconName: 'TrendingUp' },
        { id: '3', title: 'Ferramentas Prontas', desc: 'Tudo o que você precisa para começar.', iconName: 'Laptop' }, // Using Laptop or Wifi
    ];
    return defaults;
}

type FeaturesProps = {
    layout: 'centered' | 'full_left' | 'split_right';
    theme: 'minimal' | 'bold' | 'trust';
    content: FeatureItem[];
    primaryColor: string;
    isEditing?: boolean;
    onItemEdit?: (id: string, field: 'title' | 'desc' | 'icon' | 'desc', newValue?: string) => void;
    // BG PROPS
    backgroundImage?: string;
    overlayTexture?: TextureType;
    textureOpacity?: number;
    overlayOpacity?: number;
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
};

const EditWrapper = ({ isEditing, onClick, children, className }: any) => {
    if (!isEditing) return <div className={className}>{children}</div>;
    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={`${className} cursor-pointer hover:bg-blue-500/10 hover:outline-dashed hover:outline-2 hover:outline-blue-500 rounded p-1 -m-1 transition-all relative group`}
        >
            {children}
            <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Icon
            </span>
        </div>
    )
}

export default function SmartFeatures({
    layout,
    theme,
    content,
    primaryColor,
    isEditing = false,
    onItemEdit,
    backgroundImage,
    overlayTexture,
    textureOpacity,
    overlayOpacity,
    overlayColor,
    overlayGradient
}: FeaturesProps) {

    const themes = {
        minimal: { sectionBg: 'bg-white', cardBg: 'bg-slate-50', title: 'text-slate-900', text: 'text-slate-600', iconBg: 'bg-slate-100' },
        bold: { sectionBg: 'bg-slate-900', cardBg: 'bg-slate-800', title: 'text-white', text: 'text-slate-400', iconBg: 'bg-slate-700' },
        trust: { sectionBg: 'bg-slate-50', cardBg: 'bg-white shadow-sm border border-slate-100', title: 'text-slate-800', text: 'text-slate-600', iconBg: 'bg-blue-50' }
    };
    const t = themes[theme] || themes.trust;
    const hasCustomBg = !!backgroundImage;
    const containerClass = `py-24 px-6 relative overflow-hidden ${!hasCustomBg ? t.sectionBg : ''}`;

    // Helper functions
    const renderIcon = (name: string, id: string) => {
        let Icon = Settings;
        try {
            if (LucideIcons && (LucideIcons as any)[name]) {
                Icon = (LucideIcons as any)[name];
            }
        } catch (e) {
            console.warn(`Icon ${name} not found`);
        }
        return (
            <EditWrapper isEditing={isEditing} onClick={() => onItemEdit?.(id, 'icon')} className={`w-12 h-12 rounded-lg ${t.iconBg} flex items-center justify-center mb-4 text-blue-600`}>
                <Icon size={24} style={{ color: primaryColor }} />
            </EditWrapper>
        )
    };

    const Headline = () => (
        <div className={`mb-12 ${layout === 'centered' ? 'text-center mx-auto max-w-3xl' : 'text-left'} ${hasCustomBg ? 'text-white' : ''}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${!hasCustomBg ? t.title : ''}`}>Por que nos escolher?</h2>
            <p className={`text-lg ${!hasCustomBg ? t.text : 'text-neutral-200'}`}>Descubra os benefícios que transformam o seu negócio.</p>
        </div>
    );

    // --- LAYOUT: SPLIT RIGHT (List on Right, Sticky Title on Left) ---
    if (layout === 'split_right') {
        return (
            <section className={containerClass}>
                <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <Headline />
                            <button className="hidden md:inline-block px-6 py-3 rounded-lg font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: primaryColor }}>
                                Saiba Mais
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        {content.map((item) => (
                            <div key={item.id} className={`flex gap-6 p-6 rounded-xl transition-all ${t.cardBg} ${hasCustomBg && theme !== 'bold' ? 'bg-white/90 backdrop-blur' : ''}`}>
                                <div>{renderIcon(item.iconName, item.id)}</div>
                                <div>
                                    <InlineTextEdit value={item.title} onChange={(val) => onItemEdit?.(item.id, 'title', val)} isEditing={isEditing} tagName="h3" className={`text-xl font-bold mb-2 ${t.title}`} />
                                    <InlineTextEdit value={item.desc} onChange={(val) => onItemEdit?.(item.id, 'desc', val)} isEditing={isEditing} tagName="p" multiline className={t.text} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- LAYOUT: FULL LEFT (Big List) ---
    if (layout === 'full_left') {
        return (
            <section className={containerClass}>
                <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Headline />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-12">
                        {content.map((item, i) => (
                            <div key={item.id} className="relative pl-16">
                                <span className="absolute left-0 top-0 text-6xl font-black opacity-10" style={{ color: primaryColor }}>0{i + 1}</span>
                                {renderIcon(item.iconName, item.id)}
                                <InlineTextEdit value={item.title} onChange={(val) => onItemEdit?.(item.id, 'title', val)} isEditing={isEditing} tagName="h3" className={`text-2xl font-bold mb-3 ${t.title}`} />
                                <InlineTextEdit value={item.desc} onChange={(val) => onItemEdit?.(item.id, 'desc', val)} isEditing={isEditing} tagName="p" multiline className={`text-lg leading-relaxed ${t.text}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- DEFAULT: CENTERED GRID ---
    return (
        <section className={containerClass}>
            <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
            <div className="max-w-7xl mx-auto relative z-10">
                <Headline />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.map((item) => (
                        <div key={item.id} className={`p-8 rounded-2xl transition-all hover:-translate-y-1 ${t.cardBg} ${hasCustomBg && theme !== 'bold' ? 'bg-white/90 backdrop-blur' : ''}`}>
                            {renderIcon(item.iconName, item.id)}
                            <InlineTextEdit value={item.title} onChange={(val) => onItemEdit?.(item.id, 'title', val)} isEditing={isEditing} tagName="h3" className={`text-xl font-bold mb-3 ${t.title}`} />
                            <InlineTextEdit value={item.desc} onChange={(val) => onItemEdit?.(item.id, 'desc', val)} isEditing={isEditing} tagName="p" multiline className={t.text} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
