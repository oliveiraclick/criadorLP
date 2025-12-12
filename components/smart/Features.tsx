import React from 'react';

type FeaturesProps = {
    layout: 'centered' | 'full_left' | 'split_right'; // Replaces 'style' for structure
    theme: 'minimal' | 'bold' | 'trust'; // Replaces 'style' for colors/fonts
    industry: string;
    primaryColor: string;
};

// Mock Content Generator
const getFeaturesContent = (industry: string) => {
    if (industry.includes('Saúde') || industry.includes('Clínica')) {
        return [
            { title: 'Especialistas Certificados', desc: 'Nossa equipe possui as melhores qualificações do mercado.', icon: '👨‍⚕️' },
            { title: 'Tecnologia de Ponta', desc: 'Equipamentos modernos para garantir o melhor resultado.', icon: '🔬' },
            { title: 'Atendimento Humanizado', desc: 'Cuidamos de você com a atenção que você merece.', icon: '❤️' },
        ];
    }
    if (industry.includes('Advocacia')) {
        return [
            { title: 'Experiência Comprovada', desc: 'Anos de atuação em casos complexos com sucesso.', icon: '⚖️' },
            { title: 'Sigilo Absoluto', desc: 'Sua privacidade e segurança são nossa prioridade máxima.', icon: '🔒' },
            { title: 'Estratégia Personalizada', desc: 'Cada caso é único e merece uma defesa sob medida.', icon: '♟️' },
        ];
    }
    if (industry.includes('Academia')) {
        return [
            { title: 'Treinos de Alta Intensidade', desc: 'Queime calorias e ganhe massa com nosso método.', icon: '💪' },
            { title: 'Nutricionista Incluso', desc: 'Acompanhamento completo para seus objetivos.', icon: '🥗' },
            { title: 'Aberto 24 Horas', desc: 'Treine no seu tempo, sem desculpas.', icon: '⏰' },
        ];
    }
    // Default / Generic
    return [
        { title: 'Qualidade Garantida', desc: 'Entregamos o melhor serviço do mercado para você.', icon: '⭐' },
        { title: 'Suporte Exclusivo', desc: 'Estamos sempre disponíveis para tirar suas dúvidas.', icon: '💬' },
        { title: 'Resultados Rápidos', desc: 'Foco total em resolver seu problema com agilidade.', icon: '🚀' },
    ];
};

export default function SmartFeatures({ layout, theme, industry, primaryColor }: FeaturesProps) {
    const features = getFeaturesContent(industry || '');

    // --- THEME DEFINITIONS ---
    const themes = {
        minimal: {
            sectionBg: 'bg-neutral-50 border-t border-neutral-200',
            cardBg: 'bg-white border border-neutral-100', // Subtle card
            textTitle: 'text-neutral-900 font-serif',
            textDesc: 'text-neutral-500 font-light',
            iconColor: 'grayscale text-neutral-400',
            hoverEffect: 'shadow-sm hover:shadow-md'
        },
        bold: {
            sectionBg: 'bg-black border-t border-neutral-800 text-white',
            cardBg: 'bg-neutral-900 border border-neutral-800',
            textTitle: 'text-white font-black uppercase tracking-wider',
            textDesc: 'text-neutral-400 font-mono text-sm',
            iconColor: 'text-white',
            hoverEffect: 'hover:bg-neutral-800'
        },
        trust: {
            sectionBg: 'bg-white',
            cardBg: 'bg-white shadow-lg border border-slate-100',
            textTitle: 'text-slate-900 font-bold',
            textDesc: 'text-slate-600',
            iconColor: 'text-slate-700',
            hoverEffect: 'hover:-translate-y-1'
        }
    };
    
    const t = themes[theme] || themes.trust;

    // --- LAYOUTS ---

    // 1. CENTERED (Grid Simple - Classic)
    if (layout === 'centered') {
        return (
            <section className={`py-24 px-6 ${t.sectionBg}`}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                         <h2 className={`text-3xl font-bold mb-4 ${t.textTitle.includes('white') ? 'text-white' : ''}`}>
                            Por que nos escolher?
                        </h2>
                        <div className={`h-1 w-20 mx-auto rounded ${theme === 'bold' ? 'bg-white' : ''}`} style={{backgroundColor: theme !== 'bold' ? primaryColor : undefined}} />
                    </div>
                   
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((f, i) => (
                            <div key={i} className="text-center group">
                                <div className={`text-5xl mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 ${t.iconColor.includes('grayscale') ? 'bg-neutral-100' : 'bg-transparent'}`}>
                                    {f.icon}
                                </div>
                                <h3 className={`font-medium text-lg mb-2 ${t.textTitle}`}>{f.title}</h3>
                                <p className={`leading-relaxed ${t.textDesc}`}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // 2. FULL LEFT (List View / Horizontal)
    if (layout === 'full_left') {
         return (
            <section className={`py-24 px-6 ${t.sectionBg}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-4xl md:text-5xl mb-12 leading-tight ${t.textTitle} ${theme === 'minimal' ? 'text-center' : ''}`}>
                         Diferenciais<br/>Exclusivos
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className={`flex items-start gap-6 p-6 rounded-xl transition-all ${t.cardBg} ${t.hoverEffect}`}>
                                <div className="text-4xl shrink-0 p-2 bg-white/5 rounded-lg">{f.icon}</div>
                                <div>
                                    <h3 className={`text-xl mb-2 ${t.textTitle}`}>{f.title}</h3>
                                    <p className={`${t.textDesc}`}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // 3. SPLIT RIGHT (Cards with Accent Border - Trust Style default)
    return (
        <section className={`py-24 px-6 ${t.sectionBg}`}>
            <div className="max-w-6xl mx-auto">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12">
                    <div className="lg:col-span-1">
                        <span className="text-sm font-bold tracking-widest uppercase opacity-60">Benefícios</span>
                        <h2 className={`text-4xl mt-2 ${t.textTitle}`}>Excelência e<br/>Resultados</h2>
                        <p className={`mt-4 ${t.textDesc}`}>Descubra como podemos transformar sua realidade com nossas soluções exclusivas.</p>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                         {features.map((f, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-2xl transition-transform duration-300 ${t.cardBg} ${t.hoverEffect}`}
                                style={theme === 'trust' ? { borderTop: `4px solid ${primaryColor}` } : {}}
                            >
                                <div className="text-3xl mb-4">{f.icon}</div>
                                <h3 className={`font-bold text-lg mb-2 ${t.textTitle}`}>{f.title}</h3>
                                <p className={`leading-relaxed ${t.textDesc}`}>{f.desc}</p>
                            </div>
                        ))}
                        {/* Add a 4th dummy card to balance grid if needed, or just 3 */}
                         <div className={`p-8 rounded-2xl flex items-center justify-center border-2 border-dashed ${theme === 'bold' ? 'border-neutral-800' : 'border-neutral-200'} opacity-50`}>
                            <span className="text-sm font-medium">E muito mais...</span>
                        </div>
                    </div>
                 </div>
            </div>
        </section>
    );
}
