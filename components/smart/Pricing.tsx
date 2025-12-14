import { Check, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import SectionBackground, { TextureType } from './SectionBackground';
import InlineTextEdit from '../ui/InlineTextEdit';

export type PricingPlan = {
    id: string;
    name: string;
    price: string;
    popular?: boolean;
    features: string[];
};

export const getDefaultPricing = (industry: string): PricingPlan[] => {
    return [
        { id: '1', name: 'Básico', price: 'R$ 97', features: ['Gestão Simples', '3 Usuários', 'Suporte Email'] },
        { id: '2', name: 'Pro', price: 'R$ 197', popular: true, features: ['Gestão Completa', '10 Usuários', 'Suporte Prioritário', 'Automação'] },
        { id: '3', name: 'Enterprise', price: 'Consulte', features: ['Ilimitado', 'Gerente de Conta', 'API Acesso', 'Treinamento'] },
    ];
};

type PricingProps = {
    layout: 'centered' | 'full_left' | 'split_right' | 'list' | 'minimal_cards';
    theme: 'minimal' | 'bold' | 'trust';
    businessName: string;
    industry: string;
    primaryColor: string;
    // Content State
    content: PricingPlan[];
    isEditing?: boolean;
    onPlanEdit?: (id: string, field: 'name' | 'price' | 'features', value: any, featureIndex?: number) => void;
    // BG Props
    backgroundImage?: string;
    backgroundVideo?: string; // New
    overlayTexture?: TextureType;
    textureOpacity?: number;
    overlayOpacity?: number;
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
};

export default function SmartPricing({
    layout,
    theme,
    businessName,
    industry,
    primaryColor,
    content,
    isEditing = false,
    onPlanEdit,
    backgroundImage,
    backgroundVideo, // New
    overlayTexture,
    textureOpacity,
    overlayOpacity,
    overlayColor,
    overlayGradient
}: PricingProps) {

    const themes = {
        minimal: { sectionBg: 'bg-slate-50', cardBg: 'bg-white', title: 'text-slate-900', text: 'text-slate-600' },
        bold: { sectionBg: 'bg-black', cardBg: 'bg-neutral-900 border border-neutral-800', title: 'text-white', text: 'text-neutral-400' },
        trust: { sectionBg: 'bg-white', cardBg: 'bg-white shadow-xl border border-slate-100', title: 'text-slate-800', text: 'text-slate-600' }
    };
    const t = themes[theme] || themes.trust;

    const hasCustomBg = !!backgroundImage;
    const containerClass = `py-24 px-6 relative overflow-hidden ${!hasCustomBg ? t.sectionBg : ''}`;

    const handleFeatureChange = (planId: string, featureIndex: number, newValue: string) => {
        onPlanEdit?.(planId, 'features', newValue, featureIndex);
    };

    const Headline = () => (
        <div className={`text-center mb-16 ${hasCustomBg ? 'text-white' : ''}`}>
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${!hasCustomBg ? t.title : ''}`}>Planos para todos os tamanhos</h2>
            <p className={`text-xl ${!hasCustomBg ? t.text : 'text-neutral-200'}`}>Escolha o melhor para sua empresa.</p>
        </div>
    );

                                        </div >
                                    ))
}
                                </div >
    <div className="flex items-center gap-6">
        <InlineTextEdit value={plan.price} onChange={(val) => onPlanEdit?.(plan.id, 'price', val)} isEditing={isEditing} tagName="span" className={`text-2xl font-bold ${t.title}`} />
        <button className="px-6 py-2 rounded-lg font-bold text-white text-sm hover:brightness-110 transition-all" style={{ backgroundColor: primaryColor }}>Escolher</button>
    </div>
                            </div >
                        ))}
                    </div >
                </div >
            </section >
        );
    }

// --- LAYOUT: MINIMAL CARDS (No Shadow, Border Only) ---
if (layout === 'minimal_cards') {
    return (
        <section className={containerClass}>
            <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
            <div className="max-w-7xl mx-auto relative z-10">
                <Headline />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.map((plan) => (
                        <div key={plan.id} className={`p-8 rounded-xl border-2 transition-all hover:border-blue-500/50 ${hasCustomBg ? 'border-white/20 text-white' : 'border-slate-200'} `} >
                            <InlineTextEdit value={plan.name} onChange={(val) => onPlanEdit?.(plan.id, 'name', val)} isEditing={isEditing} tagName="h3" className="text-2xl font-bold mb-2" />
                            <InlineTextEdit value={plan.price} onChange={(val) => onPlanEdit?.(plan.id, 'price', val)} isEditing={isEditing} tagName="div" className="text-4xl font-light mb-8" />
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80">
                                        <Check size={16} />
                                        <InlineTextEdit value={feat} onChange={(val) => handleFeatureChange(plan.id, j, val)} isEditing={isEditing} className="flex-1" />
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 border-2 border-current rounded-lg font-bold hover:bg-white hover:text-black transition-colors">
                                Começar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- DEFAULT: CENTERED CARDS ---
return (
    <section className={containerClass}>
        <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
        <div className="max-w-7xl mx-auto relative z-10">
            <Headline />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {content.map((plan) => (
                    <div key={plan.id} className={`relative p-8 rounded-2xl ${t.cardBg} ${plan.popular ? 'ring-2 ring-offset-2 scale-105 shadow-2xl z-20' : 'shadow-lg'} ${hasCustomBg && theme !== 'bold' ? 'bg-white/95 backdrop-blur' : ''}`} style={{ borderColor: plan.popular ? primaryColor : undefined }}>
                        {plan.popular && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full" style={{ backgroundColor: primaryColor }}>
                                Mais Popular
                            </span>
                        )}
                        <InlineTextEdit value={plan.name} onChange={(val) => onPlanEdit?.(plan.id, 'name', val)} isEditing={isEditing} tagName="h3" className={`text-xl font-bold mb-2 ${t.title}`} />
                        <InlineTextEdit value={plan.price} onChange={(val) => onPlanEdit?.(plan.id, 'price', val)} isEditing={isEditing} tagName="div" className={`text-4xl font-extrabold mb-6 ${t.title}`} />

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feat, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80">
                                    <Check size={16} className="text-green-500 shrink-0" />
                                    <InlineTextEdit value={feat} onChange={(val) => handleFeatureChange(plan.id, j, val)} isEditing={isEditing} className={`flex-1 ${t.title}`} />
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'text-white shadow-lg hover:shadow-xl hover:-translate-y-1' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                            style={{ backgroundColor: plan.popular ? primaryColor : undefined }}
                        >
                            Escolher {plan.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
}
