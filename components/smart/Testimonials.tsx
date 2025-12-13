import { useState, useEffect } from 'react';
import { Star, User, Quote } from 'lucide-react';
import InlineTextEdit from '@/components/ui/InlineTextEdit';
import SectionBackground from './SectionBackground';

interface Testimonial {
    id: string;
    text: string;
    author: string;
    role: string;
}

interface TestimonialsProps {
    industry?: string;
    isEditing: boolean;
    primaryColor: string;
}

export const SmartTestimonials = ({ industry, isEditing, primaryColor }: TestimonialsProps) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        // Industry Specific Defaults
        const getDefaults = () => {
            if (industry === 'music') return [
                { id: '1', text: "A melhor vibe que já senti! As músicas tocam na alma.", author: "Julia M.", role: "Fã Verificada" },
                { id: '2', text: "Show inesquecível, produção impecável. Mal posso esperar pelo próximo.", author: "Lucas Dias", role: "Fã de Carteirinha" },
                { id: '3', text: "Talento puro. É raro ver artistas com essa autenticidade hoje em dia.", author: "Spotify Curator", role: "Crítico Musical" },
            ];
            if (industry === 'health') return [
                { id: '1', text: "Me senti acolhida desde o primeiro momento. Profissionais excelentes.", author: "Ana Paula", role: "Paciente" },
                { id: '2', text: "O tratamento mudou minha qualidade de vida. Recomendo de olhos fechados.", author: "Roberto S.", role: "Paciente Recuperado" },
                { id: '3', text: "Ambiente limpo, organizado e atendimento muito humano.", author: "Carla G.", role: "Paciente" },
            ];
            if (industry === 'digital') return [
                { id: '1', text: "O método é simples e funciona. Já recuperei o investimento na primeira semana.", author: "Marcos V.", role: "Empreendedor Digital" },
                { id: '2', text: "Liberdade define. Posso trabalhar de qualquer lugar graças a vocês.", author: "Sara L.", role: "Nômade Digital" },
                { id: '3', text: "Suporte incrível e conteúdo direto ao ponto. Nota 10.", author: "Felipe K.", role: "Aluno" },
            ];
            // Default
            return [
                { id: '1', text: "Serviço fantástico! Superou todas as minhas expectativas.", author: "Cliente Satisfeito", role: "CEO, TechStart" },
                { id: '2', text: "A equipe é muito atenciosa e o resultado final ficou perfeito.", author: "Maria Oliveira", role: "Diretora de Mkt" },
                { id: '3', text: "Recomendo fortemente para quem busca qualidade e agilidade.", author: "João Silva", role: "Empresário" },
            ];
        };
        setTestimonials(getDefaults());
    }, [industry]);

    const handleUpdate = (id: string, field: keyof Testimonial, value: string) => {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            <SectionBackground theme="light" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">
                        Quem confia, <span style={{ color: primaryColor }}>recomenda</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Veja o que dizem aqueles que já experimentaram nossa transformação.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <div className="relative">
                                <Quote size={40} className="absolute -top-4 -left-2 text-slate-100" />
                                <div className="relative text-slate-600 leading-relaxed font-medium italic">
                                    "<InlineTextEdit
                                        value={t.text}
                                        onChange={(v) => handleUpdate(t.id, 'text', v)}
                                        isEditing={isEditing}
                                        className="inline"
                                    />"
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">
                                        <InlineTextEdit
                                            value={t.author}
                                            onChange={(v) => handleUpdate(t.id, 'author', v)}
                                            isEditing={isEditing}
                                        />
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                                        <InlineTextEdit
                                            value={t.role}
                                            onChange={(v) => handleUpdate(t.id, 'role', v)}
                                            isEditing={isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
