import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import InlineTextEdit from '@/components/ui/InlineTextEdit';
import SectionBackground from './SectionBackground';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    isOpen?: boolean;
}

interface FAQProps {
    industry?: string;
    isEditing: boolean;
    primaryColor: string;
}

export const SmartFAQ = ({ industry, isEditing, primaryColor }: FAQProps) => {
    const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

    useEffect(() => {
        const getDefaults = () => {
            if (industry === 'music') return [
                { id: '1', question: "Como contrato o show?", answer: "Entre em contato pelo botão de WhatsApp ou preencha o formulário." },
                { id: '2', question: "Qual o repertório?", answer: "Temos um setlist variado com clássicos e músicas autorais." },
                { id: '3', question: "Vocês viajam para outros estados?", answer: "Sim, levamos nossa estrutura para todo o Brasil." },
            ];
            if (industry === 'health') return [
                { id: '1', question: "Aceitam convênio?", answer: "Trabalhamos com os principais convênios e reembolso." },
                { id: '2', question: "Como agendar uma consulta?", answer: "Pelo botão de Agendar ou nos chame no WhatsApp." },
                { id: '3', question: "Onde fica a clínica?", answer: "Estamos localizados no centro, com estacionamento próprio." },
            ];
            if (industry === 'digital') return [
                { id: '1', question: "O acesso é vitalício?", answer: "Sim, você paga uma vez e acessa para sempre." },
                { id: '2', question: "Tem garantia?", answer: "Garantia incondicional de 7 dias ou seu dinheiro de volta." },
                { id: '3', question: "Serve para iniciantes?", answer: "Absolutamente! O método começa do zero." },
            ];
            return [
                { id: '1', question: "Como funciona o serviço?", answer: "Nós analisamos sua necessidade e entregamos a solução em 24h." },
                { id: '2', question: "Quais as formas de pagamento?", answer: "Cartão de crédito, PIX e Boleto." },
                { id: '3', question: "Tem suporte?", answer: "Sim, suporte 24/7 para todos os clientes." },
            ];
        };
        setFaqItems(getDefaults());
    }, [industry]);

    const handleUpdate = (id: string, field: keyof FAQItem, value: string) => {
        setFaqItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const toggleOpen = (id: string) => {
        if (isEditing) return; // Disable toggle while editing to prevent jumpiness, or keep it? Let's keep it.
        setFaqItems(prev => prev.map(item => item.id === id ? { ...item, isOpen: !item.isOpen } : item));
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            <SectionBackground theme="minimal" />

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">
                        Dúvidas <span style={{ color: primaryColor }}>Frequentes</span>
                    </h2>
                    <p className="text-slate-500">
                        Tire suas dúvidas e sinta-se seguro para dar o próximo passo.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                            <button
                                onClick={() => toggleOpen(item.id)}
                                className="w-full text-left p-6 flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-800 text-lg flex-1">
                                    <InlineTextEdit
                                        value={item.question}
                                        onChange={(v: string) => handleUpdate(item.id, 'question', v)}
                                        isEditing={isEditing}
                                    />
                                </span>
                                <div className={`p-2 rounded-full transition-all ${item.isOpen ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            {(item.isOpen || isEditing) && (
                                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-50">
                                    <InlineTextEdit
                                        value={item.answer}
                                        onChange={(v: string) => handleUpdate(item.id, 'answer', v)}
                                        isEditing={isEditing}
                                        multiline
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
