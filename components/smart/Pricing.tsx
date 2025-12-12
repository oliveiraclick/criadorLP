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
                                relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2
                                ${t.cardBg}
                                ${plan.best && theme === 'minimal' ? 'ring-2 ring-neutral-900' : ''}
                            `}
                            style={theme === 'trust' ? { borderColor: primaryColor } : {}}
                        >
                            {plan.best && (
                                <span
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Mais Popular
                                </span>
                            )}

                            <h3 className={`text-xl font-medium mb-4 ${t.textTitle}`}>{plan.name}</h3>
                            <div className={`text-4xl font-bold mb-6 ${t.textPrice}`}>{plan.price}</div>

                            <ul className="space-y-4 mb-8">
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
