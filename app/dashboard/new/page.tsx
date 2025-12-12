"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        pageType: '',
        style: '',
        primaryColor: '#2563eb',
        secondaryColor: '#1e293b',
        referenceUrl: '',
        prompt: '',
        targetAudience: '',
        tone: '',
        whatsapp: '',
        logoUrl: '', // This will hold 'local' or a URL
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

        // Simulation of generation delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Construct Query Params
        const params = new URLSearchParams({
            name: formData.businessName,
            style: formData.style,
            color: formData.primaryColor,
            tone: formData.tone,
            // Add other params as needed for the generator
            logo: formData.logoUrl,
            industry: formData.industry,
        });

        router.push(`/preview?${params.toString()}`);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 mb-2 inline-block">← Voltar</Link>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Novo Projeto</h2>
                <p className="text-neutral-500 mt-1">Nossa IA vai construir uma Landing Page baseada nessas informações.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">1. Sobre o Negócio</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Negócio</label>
                            <input
                                type="text"
                                required
                                value={formData.businessName}
                                onChange={(e) => handleChange('businessName', e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Ex: TechSolutions ou Dr. Silva"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Upload da Logo</label>
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">
                                {formData.logoUrl === 'local' ? '✅ Logo carregada com sucesso!' : 'Envie sua logo (PNG/JPG)'}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Ramo de Atuação</label>
                            <select
                                value={formData.industry}
                                onChange={(e) => handleChange('industry', e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="">Selecione...</option>
                                <option>Saúde / Clínica</option>
                                <option>Advocacia / Jurídico</option>
                                <option>Academia / Esporte</option>
                                <option>Restaurante / Delivery</option>
                                <option>E-book / Infoproduto</option>
                                <option>Serviços Gerais</option>
                                <option>Outro</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Tipo de Página</label>
                        <select
                            value={formData.pageType}
                            onChange={(e) => handleChange('pageType', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="">Selecione...</option>
                            <option>Página de Vendas (Sales Page)</option>
                            <option>Captura de Leads (Squeeze Page)</option>
                            <option>Site Institucional / Apresentação</option>
                            <option>Página de Lançamento / Evento</option>
                            <option>Link na Bio / Agregador</option>
                        </select>
                    </div>
                </div>

                {/* Style Selection */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">2. Estilo Visual (Vibe)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Style Option 1 */}
                        <label className="cursor-pointer group">
                            <input
                                type="radio"
                                name="style"
                                value="Limpo & Minimalista"
                                checked={formData.style === "Limpo & Minimalista"}
                                onChange={(e) => handleChange('style', e.target.value)}
                                className="peer sr-only"
                            />
                            <div className="border-2 border-neutral-200 rounded-xl p-4 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-neutral-50 transition-all h-full">
                                <div className="h-20 bg-neutral-100 rounded mb-2 border border-neutral-200 flex items-center justify-center font-serif text-2xl text-neutral-400">Aa</div>
                                <span className="font-medium text-center block">Limpo & Minimalista</span>
                            </div>
                        </label>

                        {/* Style Option 2 */}
                        <label className="cursor-pointer group">
                            <input
                                type="radio"
                                name="style"
                                value="Ousado & Escuro"
                                checked={formData.style === "Ousado & Escuro"}
                                onChange={(e) => handleChange('style', e.target.value)}
                                className="peer sr-only"
                            />
                            <div className="border-2 border-neutral-200 rounded-xl p-4 peer-checked:border-purple-600 peer-checked:bg-purple-50 hover:bg-neutral-50 transition-all h-full">
                                <div className="h-20 bg-neutral-900 rounded mb-2 border border-neutral-800 flex items-center justify-center font-sans font-black text-2xl text-yellow-400">GO</div>
                                <span className="font-medium text-center block">Ousado & Escuro</span>
                            </div>
                        </label>

                        {/* Style Option 3 */}
                        <label className="cursor-pointer group">
                            <input
                                type="radio"
                                name="style"
                                value="Corporativo / Confiança"
                                checked={formData.style === "Corporativo / Confiança"}
                                onChange={(e) => handleChange('style', e.target.value)}
                                className="peer sr-only"
                            />
                            <div className="border-2 border-neutral-200 rounded-xl p-4 peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-neutral-50 transition-all h-full">
                                <div className="h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded mb-2 flex items-center justify-center text-white text-2xl">$$</div>
                                <span className="font-medium text-center block">Corporativo / Confiança</span>
                            </div>
                        </label>

                        {/* Style Option 4 */}
                        <label className="cursor-pointer group">
                            <input
                                type="radio"
                                name="style"
                                value="Criativo / 3D"
                                checked={formData.style === "Criativo / 3D"}
                                onChange={(e) => handleChange('style', e.target.value)}
                                className="peer sr-only"
                            />
                            <div className="border-2 border-neutral-200 rounded-xl p-4 peer-checked:border-orange-600 peer-checked:bg-orange-50 hover:bg-neutral-50 transition-all h-full">
                                <div className="h-20 bg-white border border-neutral-200 rounded mb-2 flex items-center justify-center shadow-lg transform rotate-[-2deg]">🎨</div>
                                <span className="font-medium text-center block">Criativo / 3D</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Colors */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">3. Cores da Marca</h3>
                    <div className="flex gap-8">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Cor Primária</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formData.primaryColor}
                                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                                    className="h-10 w-20 cursor-pointer rounded border p-1"
                                />
                                <span className="text-sm text-neutral-500">Principal</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Cor Secundária</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formData.secondaryColor}
                                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                    className="h-10 w-20 cursor-pointer rounded border p-1"
                                />
                                <span className="text-sm text-neutral-500">Detalhes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual References */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">4. Referências Visuais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Link de Inspiração</label>
                            <input
                                type="url"
                                value={formData.referenceUrl}
                                onChange={(e) => handleChange('referenceUrl', e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="https://site-exemplo.com"
                            />
                            <p className="text-xs text-neutral-400 mt-1">Um site que você gosta do estilo.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Upload de Prints/Imagens</label>
                            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:bg-neutral-50 transition-colors cursor-pointer">
                                <span className="text-2xl block mb-1">🖼️</span>
                                <span className="text-sm text-neutral-500">Clique para enviar prints</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Prompt */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">5. Conteúdo & Detalhes</h3>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Descreva o negócio e o objetivo</label>
                        <textarea
                            rows={5}
                            value={formData.prompt}
                            onChange={(e) => handleChange('prompt', e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Ex: É uma clínica de estética focada em emagrecimento para mulheres +40. Quero algo muito elegante, tons de dourado e nude. Precisa transmitir confiança e resultado. Inclua depoimentos."
                        ></textarea>
                        <p className="text-xs text-neutral-400 mt-1">Quanto mais detalhes, melhor.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Público Alvo</label>
                            <input
                                type="text"
                                value={formData.targetAudience}
                                onChange={(e) => handleChange('targetAudience', e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Ex: Mulheres 30-45 anos, classe A/B"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Tom de Voz</label>
                            <select
                                value={formData.tone}
                                onChange={(e) => handleChange('tone', e.target.value)}
                                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="">Selecione...</option>
                                <option>Profissional & Sério</option>
                                <option>Amigável & Acolhedor</option>
                                <option>Urgente & Promocional</option>
                                <option>Luxuoso & Exclusivo</option>
                                <option>Técnico & Educativo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Seções Desejadas (Checklist)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> FAQ (Perguntas)
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Depoimentos
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Preços / Planos
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Galeria Fotos
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Quem Somos
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Garantia
                            </label>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp para Contato</label>
                        <input
                            type="text"
                            value={formData.whatsapp}
                            onChange={(e) => handleChange('whatsapp', e.target.value)}
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="(XX) 99999-9999"
                        />
                        <p className="text-xs text-neutral-400 mt-1">Será usado para o botão flutuante de contato.</p>
                    </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors font-semibold shadow-lg hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? '🧠 Gerando Site...' : '✨ Gerar Landing Page'}
                    </button>
                </div>

            </form>
        </div>
    );
}
