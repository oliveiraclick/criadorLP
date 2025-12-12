import React from 'react';

type FeaturesProps = {
    style: string;
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

export default function SmartFeatures({ style, industry, primaryColor }: FeaturesProps) {
    const features = getFeaturesContent(industry || '');

    // --- VARIANT 1: CLEAN (Grid Simple) ---
    if (style === 'Limpo & Minimalista') {
        return (
            <section className="py-24 px-6 bg-neutral-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-serif text-center mb-16 text-neutral-800">Por que nos escolher?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((f, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{f.icon}</div>
                                <h3 className="font-medium text-lg mb-2 text-neutral-900">{f.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- VARIANT 2: BOLD (Cards with Borders) ---
    if (style === 'Ousado & Escuro') {
        return (
            <section className="py-24 px-6 bg-black text-white border-t border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-black uppercase mb-16 italic text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                        Diferenciais
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-800">
                        {features.map((f, i) => (
                            <div key={i} className="p-10 border-r border-b border-neutral-800 hover:bg-neutral-900 transition-colors">
                                <div className="text-5xl mb-6">{f.icon}</div>
                                <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-white">{f.title}</h3>
                                <p className="text-neutral-400 font-mono text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- VARIANT 3: TRUST (Shadow Cards) ---
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold tracking-wide uppercase text-slate-500">Nossos Benefícios</span>
                    <h2 className="text-3xl font-bold mt-2 text-slate-900">Excelência em cada detalhe</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
                            style={{ borderTop: `4px solid ${primaryColor}` }}
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-2xl mb-4">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
