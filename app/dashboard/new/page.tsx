"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Upload, Check, Sparkles, ArrowLeft } from 'lucide-react';
import PremiumBackground from '@/components/ui/PremiumBackground';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        pageType: 'sales',
        style: '',
        logoUrl: '',
        briefing: '',
        targetAudience: '',
        painPoints: '',
    });

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                localStorage.setItem('project_logo', base64);
                setFormData(prev => ({ ...prev, logoUrl: 'local' }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate "AI Thinking"
        await new Promise(resolve => setTimeout(resolve, 2000));

        const params = new URLSearchParams({
            name: formData.businessName,
            style: formData.style,
            logo: formData.logoUrl,
            industry: formData.industry,
            type: formData.pageType,
        });

        // Pass new fields too if the preview supports them (it might read them from URL or we should save to LS for "current draft")
        // For now, let's keep URL param strategy simple

        router.push(`/preview?${params.toString()}`);
    };

    return (
        <PremiumBackground>
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">

                {/* Main Card Container */}
                <div className="w-full max-w-4xl glass-panel rounded-[2.5rem] overflow-hidden flex flex-col md:min-h-[600px] relative animate-fade-in-up">

                    {/* Progress Bar (Top) */}
                    <div className="h-1.5 w-full bg-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>

                    {/* Header Controls */}
                    <div className="p-8 flex items-center justify-between border-b border-white/5">
                        <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} />
                            Cancelar
                        </Link>
                        <div className="text-sm font-bold text-blue-200">
                            PASSO {step} DE 4
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center max-w-2xl mx-auto w-full">

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* STEP 1: BASICS */}
                            {step === 1 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center mb-8">
                                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">Criar Novo Projeto</h2>
                                        <p className="text-slate-400">Dê um nome e categoria para o seu projeto.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.businessName}
                                                onChange={(e) => handleChange('businessName', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-center font-bold"
                                                placeholder="Nome do Projeto ou Empresa"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Page Type Selector */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { id: 'sales', label: 'Vendas' },
                                                { id: 'capture', label: 'Captura' },
                                                { id: 'bio', label: 'Bio / Link' }
                                            ].map(type => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => handleChange('pageType', type.id)}
                                                    className={`p-3 rounded-xl border transition-all text-sm font-bold ${formData.pageType === type.id ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-white/10 border-white/5 text-slate-300 hover:bg-white/20'}`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {[
                                                { id: 'tech', label: 'Tecnologia' },
                                                { id: 'health', label: 'Saúde & Bem-estar' },
                                                { id: 'music', label: 'Música & Artes' },
                                                { id: 'digital', label: 'Marketing Digital' },
                                                { id: 'finance', label: 'Finanças' },
                                                { id: 'services', label: 'Serviços' }
                                            ].map(cat => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => handleChange('industry', cat.id)}
                                                    className={`p-4 rounded-xl border transition-all text-sm font-bold ${formData.industry === cat.id ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: BRIEFING */}
                            {step === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="text-center mb-6">
                                        <h2 className="text-3xl font-bold text-white mb-2">Detalhes Importantes</h2>
                                        <p className="text-slate-400">Para a IA criar textos persuasivos.</p>
                                    </div>

                                    <textarea
                                        value={formData.briefing}
                                        onChange={(e) => handleChange('briefing', e.target.value)}
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                        placeholder="Descreva brevemente a história da empresa ou do produto..."
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => handleChange('targetAudience', e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
                                            placeholder="Público Alvo (ex: Jovens)"
                                        />
                                        <input
                                            type="text"
                                            value={formData.painPoints}
                                            onChange={(e) => handleChange('painPoints', e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
                                            placeholder="Principal Dor (ex: Falta de tempo)"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: VISUAL */}
                            {step === 3 && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="text-center mb-6">
                                        <h2 className="text-3xl font-bold text-white mb-2">Identidade Visual</h2>
                                        <p className="text-slate-400">Como deve ser a aparência?</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {['Moderno', 'Minimalista', 'Elegante', 'Ousado'].map((style) => (
                                            <button
                                                key={style}
                                                type="button"
                                                onClick={() => handleChange('style', style)}
                                                className={`p-6 rounded-2xl border transition-all font-bold text-lg ${formData.style === style ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400 text-white shadow-glow' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex justify-center">
                                        <label className="flex items-center gap-3 px-6 py-4 rounded-full border border-dashed border-white/20 hover:border-blue-400 hover:bg-white/5 cursor-pointer transition-all group">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-white">
                                                {formData.logoUrl === 'local' ? <Check size={20} className="text-green-400" /> : <Upload size={20} />}
                                            </div>
                                            <span className="text-sm font-medium text-slate-400 group-hover:text-white">
                                                {formData.logoUrl === 'local' ? 'Logo Carregada' : 'Fazer Upload da Logo (Opcional)'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: REVIEW */}
                            {step === 4 && (
                                <div className="space-y-8 animate-fade-in text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] mb-6 animate-pulse-slow">
                                        <Sparkles size={40} className="text-white" />
                                    </div>

                                    <div>
                                        <h2 className="text-4xl font-bold text-white mb-2">Tudo Pronto!</h2>
                                        <p className="text-slate-400 max-w-md mx-auto">
                                            A Inteligência Artificial vai gerar sua Landing Page baseada em
                                            <span className="text-white font-bold"> {formData.industry} </span>
                                            com estilo
                                            <span className="text-white font-bold"> {formData.style}</span>.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 max-w-sm mx-auto border border-white/5 text-left text-sm text-slate-300">
                                        <p><strong>Projeto:</strong> {formData.businessName}</p>
                                        <p><strong>Público:</strong> {formData.targetAudience || 'Geral'}</p>
                                        <p><strong>Foco:</strong> {formData.painPoints || 'Conversão'}</p>
                                    </div>
                                </div>
                            )}

                            {/* Actions Wrapper */}
                            <div className="flex gap-4 pt-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(s => s - 1)}
                                        className="px-8 py-4 rounded-full font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Voltar
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={step === 4 ? handleSubmit : () => setStep(s => s + 1)}
                                    disabled={loading}
                                    className="flex-1 btn-primary-glow py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Criando Mágica...</span>
                                    ) : (
                                        <>
                                            {step === 4 ? 'Gerar Landing Page' : 'Continuar'}
                                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </PremiumBackground>
    );
}
