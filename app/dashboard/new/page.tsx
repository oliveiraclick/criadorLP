"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Upload, Check } from 'lucide-react';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        style: '',
        logoUrl: '',
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        const params = new URLSearchParams({
            name: formData.businessName,
            style: formData.style,
            logo: formData.logoUrl,
            industry: formData.industry,
        });
        router.push(`/preview?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-saas-blue flex items-center justify-center p-2 md:p-4 selection:bg-blue-500 selection:text-white font-sans">
            <div className="w-full max-w-6xl bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row md:min-h-[600px]">

                {/* Left Panel - Steps */}
                <div className="bg-slate-50 w-full md:w-1/3 p-6 md:p-10 flex flex-col justify-between border-r border-slate-100">
                    <div>
                        <Link href="/dashboard" className="text-slate-400 hover:text-blue-600 text-sm font-bold flex items-center gap-2 mb-10 transition-colors">
                            ← Voltar
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Vamos Criar</h2>
                        <p className="text-slate-500 mb-10">Configure sua página em poucos passos simples.</p>

                        <div className="space-y-6">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className={`flex items-center gap-4 ${step === s ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-500'}`}>
                                        {s}
                                    </div>
                                    <div className="font-bold text-slate-700">
                                        {s === 1 && "Detalhes Básicos"}
                                        {s === 2 && "Identidade Visual"}
                                        {s === 3 && "Revisão Final"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-3xl mt-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">💡</div>
                            <span className="font-bold text-blue-900 text-sm">Dica Pro</span>
                        </div>
                        <p className="text-blue-800/70 text-xs leading-relaxed">
                            Forneça o máximo de detalhes sobre seu público-alvo para uma copy mais persuasiva.
                        </p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 p-6 md:p-16 flex flex-col bg-white">
                    <div className="max-w-md w-full mx-auto space-y-8">
                        {/* Step 1 Content: Detalhes Básicos */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nome do Projeto</label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => handleChange('businessName', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        placeholder="Ex: StartUp Hub"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Setor de Atuação</label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => handleChange('industry', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium"
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="tech">Tecnologia / SaaS</option>
                                        <option value="health">Saúde / Bem-estar</option>
                                        <option value="finance">Finanças</option>
                                        <option value="education">Educação</option>
                                        <option value="marketing">Marketing / Vendas</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2 Content: Identidade Visual */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Estilo Visual</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Minimalista', 'Moderno', 'Corporativo', 'Criativo'].map((style) => (
                                            <button
                                                key={style}
                                                type="button"
                                                onClick={() => handleChange('style', style)}
                                                className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${formData.style === style ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200'}`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Logo da Empresa</label>
                                    <label className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group">
                                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                                            {formData.logoUrl === 'local' ? <Check size={20} /> : <Upload size={20} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700 group-hover:text-blue-700">{formData.logoUrl === 'local' ? 'Logo Carregada!' : 'Clique para enviar'}</div>
                                            <div className="text-xs text-slate-400">PNG ou JPG até 5MB</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 3 Content: Revisão Final */}
                        {step === 3 && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                    <h3 className="font-bold text-slate-900">Resumo do Projeto</h3>

                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="text-slate-500 text-sm">Nome</span>
                                        <span className="font-bold text-slate-700">{formData.businessName}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="text-slate-500 text-sm">Setor</span>
                                        <span className="font-bold text-slate-700 capitalize">{formData.industry}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="text-slate-500 text-sm">Estilo</span>
                                        <span className="font-bold text-slate-700">{formData.style || 'Não selecionado'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-slate-500 text-sm">Logo</span>
                                        <span className="font-bold text-slate-700">{formData.logoUrl === 'local' ? 'Enviada' : 'Não enviada'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(s => s - 1)}
                                    className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
                                >
                                    Voltar
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={step === 3 ? handleSubmit : () => setStep(s => s + 1)}
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span>Gerando...</span>
                                ) : (
                                    <>
                                        {step === 3 ? 'Gerar Página' : 'Próximo Passo'}
                                        <ChevronRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
