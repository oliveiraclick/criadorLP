import React from 'react';
// import { Check } from 'lucide-react'; // Removing dependency for stability

type PricingProps = {
    layout: 'centered' | 'full_left' | 'split_right'; // Using same props for consistency, though split might be weird for pricing
    theme: 'minimal' | 'bold' | 'trust';
    businessName: string;
    industry: string;
    primaryColor: string;
};

const getPricingContent = (industry: string) => {
    if (industry.includes('Saúde') || industry.includes('Clínica')) {
        return [
            { name: 'Consulta', price: 'R$ 250', features: ['Avaliação Inicial', 'Retorno em 30 dias', 'Plano de Tratamento'] },
            { name: 'Tratamento Completo', price: 'R$ 1.200', features: ['10 Sessões', 'Acompanhamento Semanal', 'Produtos Inclusos', 'Suporte WhatsApp'], best: true },
            { name: 'Manutenção', price: 'R$ 150/mês', features: ['1 Sessão Mensal', 'Desconto em Produtos', 'Clube de Vantagens'] }
        ];
    }
    if (industry.includes('Academia')) {
        return [
            { name: 'Diária', price: 'R$ 30', features: ['Acesso Musculação', 'Aulas Coletivas', 'Armário Rotativo'] },
            { name: 'Plano Mensal', price: 'R$ 120', features: ['Sem Fidelidade', 'Acesso Total', 'Avaliação Física', 'App de Treino'] },
            { name: 'Plano Anual', price: 'R$ 89/mês', features: ['Fidelidade 12 meses', 'Acesso Total + Aulas', 'Camiseta Grátis', 'Nutricionista 1x'], best: true }
        ];
    }
    if (industry.includes('Advocacia')) {
        return [
            { name: 'Consulta Inicial', price: 'R$ 350', features: ['Análise de Documentos', 'Parecer Verbal', 'Duração 1h'] },
            { name: 'Acompanhamento', price: 'Consulte', features: ['Defesa Processual', 'Relatórios Mensais', 'Reuniões Ilimitadas'], best: true },
            { name: 'Assessoria Mensal', price: 'Sob Medida', features: ['Preventivo', 'Revisão Contratual', 'Disponibilidade 24h'] }
        ];
    }
    // Default
    return [
        { name: 'Básico', price: 'R$ 97', features: ['Recursos Essenciais', 'Suporte por Email', 'Garantia 7 dias'] },
        { name: 'Profissional', price: 'R$ 197', features: ['Tudo do Básico', 'Suporte Prioritário', 'Acesso Vitalício', 'Certificado'], best: true },
        { name: 'Premium', price: 'R$ 497', features: ['Mentoria Individual', 'Análise de Perfil', 'Grupo Exclusivo', 'Materiais Bônus'] }
    ];
};

export default function SmartPricing({ layout, theme, businessName, industry, primaryColor }: PricingProps) {
    const plans = getPricingContent(industry);

    // Theme Config (Simplified version of Hero's theme logic)
    const themes = {
        minimal: {
            sectionBg: 'bg-white',
            cardBg: 'bg-neutral-50 border border-neutral-100',
            textTitle: 'text-neutral-900',
            textPrice: 'text-neutral-900',
            btn: 'bg-neutral-900 text-white hover:bg-neutral-800'
        },
        bold: {
            sectionBg: 'bg-neutral-900',
            cardBg: 'bg-neutral-800 border-none',
            textTitle: 'text-white uppercase tracking-wider',
            textPrice: 'text-white',
            btn: 'bg-white text-black font-bold uppercase hover:bg-neutral-200'
        },
        trust: {
            sectionBg: 'bg-slate-50',
            cardBg: 'bg-white shadow-lg border-t-4', // Dynamic border color
            textTitle: 'text-slate-800 font-bold',
            textPrice: 'text-slate-900',
            btn: 'text-white shadow-md hover:shadow-lg' // Dynamic bg
        }
    };

    const t = themes[theme] || themes.trust;


    // --- LAYOUTS ---

    // 1. CENTERED (Standard 3-col grid)
    if (layout === 'centered') {
        return (
            <section className={`py-24 px-6 ${t.sectionBg}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl font-bold mb-4 ${theme === 'bold' ? 'text-white font-black uppercase' : 'text-neutral-900'}`}>
                            Investimento
                        </h2>
                        <p className={`text-lg ${theme === 'bold' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Escolha a melhor opção para você
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`
                                    relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col
                                    ${t.cardBg}
                                    ${plan.best && theme === 'minimal' ? 'ring-2 ring-neutral-900' : ''}
                                `}
                                style={theme === 'trust' ? { borderColor: primaryColor } : {}}
                            >
                                {plan.best && (
                                    <span
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Mais Popular
                                    </span>
                                )}

                                <h3 className={`text-xl font-medium mb-4 ${t.textTitle}`}>{plan.name}</h3>
                                <div className={`text-4xl font-bold mb-6 ${t.textPrice}`}>{plan.price}</div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feat, k) => (
                                        <li key={k} className="flex items-center gap-3 text-sm">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${theme === 'bold' ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                                                ✓
                                            </div>
                                            <span className={theme === 'bold' ? 'text-neutral-300' : 'text-neutral-600'}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-xl font-medium transition-colors ${t.btn}`}
                                    style={theme === 'trust' ? { backgroundColor: primaryColor } : {}}
                                >
                                    Selecionar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // 2. FULL LEFT (Horizontal Cards)
    if (layout === 'full_left') {
        return (
            <section className={`py-24 px-6 ${t.sectionBg}`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-4xl mb-12 ${t.textTitle}`}>Planos & Preços</h2>
                    <div className="space-y-6">
                        {plans.map((plan, i) => (
                            <div key={i} className={`p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 ${t.cardBg} ${plan.best ? 'border-2 border-current' : ''}`} style={plan.best ? { borderColor: primaryColor } : {}}>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className={`text-2xl font-bold ${t.textTitle}`}>{plan.name}</h3>
                                    {plan.best && <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded inline-block mt-2">Recomendado</span>}
                                </div>
                                <div className={`text-3xl font-bold ${t.textPrice}`}>{plan.price}</div>
                                <div className="flex-1">
                                    <ul className="text-sm space-y-2">
                                        {plan.features.slice(0, 2).map((feat, k) => (
                                            <li key={k} className={theme === 'bold' ? 'text-neutral-400' : 'text-neutral-600'}>• {feat}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className={`px-8 py-3 rounded-lg font-bold whitespace-nowrap ${t.btn}`}
                                    style={theme === 'trust' ? { backgroundColor: primaryColor } : {}}
                                >
                                    Escolher Plano
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    // 3. SPLIT RIGHT (Highlighted Best Option)
    return (
        <section className={`py-24 px-6 ${t.sectionBg}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Descriptions */}
                <div className="lg:col-span-4">
                    <h2 className={`text-5xl font-bold mb-6 ${t.textTitle}`}>Escolha seu<br />futuro agora.</h2>
                    <p className={`text-lg mb-8 ${theme === 'bold' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Investimento transparente e sem surpresas. Selecione o pacote ideal para sua fase atual.
                    </p>
                    <div className="flex flex-col gap-4">
                        {plans.filter(p => !p.best).map((plan, i) => (
                            <div key={i} className={`p-4 rounded-lg border flex justify-between items-center ${theme === 'bold' ? 'border-neutral-800 bg-transparent' : 'border-neutral-200 bg-white'}`}>
                                <span className={`font-semibold ${t.textTitle}`}>{plan.name}</span>
                                <span className={t.textPrice}>{plan.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlighted Card */}
                <div className="lg:col-span-1 border-r border-neutral-200 h-full hidden lg:block opacity-20"></div>

                <div className="lg:col-span-7">
                    {plans.filter(p => p.best).map((plan, i) => (
                        <div key={i} className={`p-10 rounded-3xl transform hover:scale-[1.02] transition-all shadow-2xl relative overflow-hidden ${t.cardBg}`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-current opacity-10 rounded-bl-full" style={{ color: primaryColor }}></div>
                            <div className="mb-8">
                                <span className="text-sm font-bold uppercase tracking-widest mb-2 block" style={{ color: primaryColor }}>Melhor Escolha</span>
                                <h3 className={`text-4xl font-bold mb-4 ${t.textTitle}`}>{plan.name}</h3>
                                <div className={`text-6xl font-black ${t.textPrice}`}>{plan.price}</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {plan.features.map((feat, k) => (
                                    <div key={k} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">✓</div>
                                        <span className={`font-medium ${theme === 'bold' ? 'text-neutral-300' : 'text-neutral-700'}`}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 text-lg rounded-xl font-bold shadow-lg hover:shadow-xl transition-all ${t.btn}`} style={theme === 'trust' ? { backgroundColor: primaryColor } : {}}>
                                Começar Agora
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
