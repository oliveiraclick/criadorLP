import { useState } from 'react';
import { SectionBackground } from './SectionBackground';
import { InlineTextEdit } from '@/components/ui/InlineTextEdit';
import { Upload, X } from 'lucide-react';

interface SEOProps {
    businessName: string;
    industry?: string;
    onClose: () => void;
}

export const SEOSettings = ({ businessName, industry, onClose }: SEOProps) => {
    const [title, setTitle] = useState(`${businessName} - Soluções em ${industry || 'Serviços'}`);
    const [desc, setDesc] = useState(`Conheça a ${businessName}. As melhores soluções para você com qualidade e confiança.`);
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Configurações de SEO & Social</h3>
                        <p className="text-sm text-slate-500">Como seu link vai aparecer no Google e WhatsApp.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">

                    {/* Preview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Google Preview */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview Google</span>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {businessName[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-700 font-medium">{businessName}</span>
                                        <span className="text-[10px] text-slate-400">https://{businessName.toLowerCase().replace(/\s/g, '')}.com.br</span>
                                    </div>
                                </div>
                                <h4 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer truncate">
                                    {title}
                                </h4>
                                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp Preview */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview WhatsApp</span>
                            <div className="bg-[#e5ddd5] p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>
                                <div className="relative bg-white rounded-lg overflow-hidden max-w-[280px] shadow-sm ml-auto md:mx-auto">
                                    <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
                                        {image ? (
                                            <img src={image} alt="OG" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-slate-400 flex flex-col items-center gap-2">
                                                <Upload size={24} />
                                                <span className="text-xs">Sem imagem</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h4 className="font-bold text-slate-900 leading-tight mb-1">{title}</h4>
                                        <p className="text-xs text-slate-500 line-clamp-2">{desc}</p>
                                        <div className="text-[10px] text-slate-400 mt-2 lowercase">{businessName.replace(/\s/g, '')}.com.br</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Título da Página (Meta Title)</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                                maxLength={60}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-slate-400">Recomendado: até 60 caracteres</span>
                                <span className={`text-xs font-bold ${title.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>{title.length}/60</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Descrição (Meta Description)</label>
                            <textarea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium min-h-[80px]"
                                maxLength={160}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-slate-400">Recomendado: até 160 caracteres</span>
                                <span className={`text-xs font-bold ${desc.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>{desc.length}/160</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Imagem de Compartilhamento (OG Image)</label>
                            <label className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <Upload size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-700">Clique para enviar imagem</div>
                                    <div className="text-xs text-slate-500">Recomendado: 1200x630px (JPG/PNG)</div>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button onClick={onClose} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105">
                        Salvar Configurações
                    </button>
                </div>

            </div>
        </div>
    );
};
