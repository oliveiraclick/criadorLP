"use client";

import { TextureType } from "@/components/smart/Hero";
import { Upload, Image as ImageIcon, Grid, Hash, MoreHorizontal, Slash } from 'lucide-react';

type BackgroundControlsProps = {
    currentTexture: TextureType;
    textureOpacity: number;
    hasBgImage: boolean;
    onTextureChange: (t: TextureType) => void;
    onOpacityChange: (val: number) => void;
    onImageUpload: (file: File) => void;
    onClearImage: () => void;
    // New Video Props
    backgroundVideo?: string;
    onVideoUpload: (file: File) => void;
    onVideoLink: (url: string) => void;
    onClearVideo: () => void;
};

export default function BackgroundControls({
    currentTexture,
    textureOpacity,
    hasBgImage,
    onTextureChange,
    onOpacityChange,
    onImageUpload,
    onClearImage,
    backgroundVideo,
    onVideoUpload,
    onVideoLink,
    onClearVideo
}: BackgroundControlsProps) {

    const textures: { id: TextureType, label: string, icon: any }[] = [
        { id: 'none', label: 'Limpo', icon: Slash },
        { id: 'dots', label: 'Pontos', icon: MoreHorizontal },
        { id: 'grid', label: 'Grid', icon: Grid },
        { id: 'lines', label: 'Linhas', icon: Hash }, // Icons act as approximations
        { id: 'noise', label: 'Ruído', icon: ImageIcon },
    ];

    const hasVideo = !!backgroundVideo;

    return (
        <div className="bg-white rounded-xl shadow-2xl p-4 w-80 animate-fade-in border border-slate-100 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Fundo & Textura</h3>

            {/* 1. IMAGE UPLOAD */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Imagem de Fundo</label>
                {!hasBgImage && !hasVideo ? (
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                        <Upload size={20} className="text-slate-400 group-hover:text-blue-500 mb-1" />
                        <span className="text-xs text-slate-500 group-hover:text-blue-500">Enviar Imagem</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                            if (e.target.files?.[0]) onImageUpload(e.target.files[0]);
                        }} />
                    </label>
                ) : hasBgImage ? (
                    <div className="relative h-24 rounded-lg overflow-hidden group">
                        <img src="" alt="Background Preview" className="absolute inset-0 w-full h-full object-cover bg-slate-100 opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
                            <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-1 rounded">Imagem Ativa</span>
                        </div>
                        <button
                            onClick={onClearImage}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                            <Slash size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="text-xs text-slate-400 italic text-center py-2 border border-slate-100 rounded">Video ativo. Remova o vídeo para usar imagem.</div>
                )}
            </div>

            {/* 2. VIDEO UPLOAD / LINK (NEW) */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vídeo de Fundo (Loop)</label>
                {!hasVideo && !hasBgImage ? (
                    <div className="space-y-2">
                        <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all group">
                            <Upload size={20} className="text-slate-400 group-hover:text-purple-500 mb-1" />
                            <span className="text-xs text-slate-500 group-hover:text-purple-500">Enviar MP4</span>
                            <input type="file" className="hidden" accept="video/mp4,video/webm" onChange={(e) => {
                                if (e.target.files?.[0]) onVideoUpload(e.target.files[0]);
                            }} />
                        </label>
                        <input
                            type="text"
                            placeholder="Ou cole link direto (mp4)"
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-purple-500"
                            onBlur={(e) => { if (e.target.value) onVideoLink(e.target.value) }}
                        />
                    </div>
                ) : hasVideo ? (
                    <div className="relative h-24 rounded-lg overflow-hidden group bg-black">
                        <video src={backgroundVideo} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">Vídeo Ativo</span>
                        </div>
                        <button
                            onClick={onClearVideo}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                            <Slash size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="text-xs text-slate-400 italic text-center py-2 border border-slate-100 rounded">Imagem ativa. Remova a imagem para usar vídeo.</div>
                )}
            </div>

            {/* 3. TEXTURE SELECTOR */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Textura (Overlay)</label>
                <div className="grid grid-cols-5 gap-2">
                    {textures.map(t => (
                        <button
                            key={t.id}
                            onClick={() => onTextureChange(t.id)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${currentTexture === t.id ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500 ring-offset-1' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                            title={t.label}
                        >
                            <t.icon size={16} />
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. OPACITY SLIDER */}
            {currentTexture !== 'none' && (
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Intensidade</span>
                        <span className="font-mono text-slate-700">{textureOpacity}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={textureOpacity}
                        onChange={(e) => onOpacityChange(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                    />
                </div>
            )}
        </div>
    );
}
