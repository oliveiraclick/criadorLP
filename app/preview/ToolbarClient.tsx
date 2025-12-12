"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export default function ToolbarClient({ currentLayout, currentTheme }: { currentLayout: string, currentTheme: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // VARIATION LOGIC
    const layouts = [
        { id: 'centered', label: 'Centralizado' },
        { id: 'full_left', label: 'Impacto Visual' },
        { id: 'split_right', label: 'Clássico / Split' }
    ];

    const shuffleLayout = () => {
        const available = layouts.map(l => l.id).filter(id => id !== currentLayout);
        const random = available[Math.floor(Math.random() * available.length)];
        updateParam('layout', random);
    };

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    const themes = [
        { id: 'minimal', label: 'Clean' },
        { id: 'bold', label: 'Dark / Bold' },
        { id: 'trust', label: 'Profissional' }
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl flex flex-col gap-2 z-50 border border-white/10">
            {/* Row 1: Layouts */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold px-2 w-16 text-right">Layout</span>
                <div className="flex gap-1 bg-white/10 p-1 rounded-lg">
                    {layouts.map(l => (
                        <button
                            key={l.id}
                            onClick={() => updateParam('layout', l.id)}
                            className={`px-3 py-1.5 rounded-md text-xs transition-colors ${currentLayout === l.id ? 'bg-white text-black font-semibold' : 'hover:bg-white/10 text-neutral-300'}`}
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        onClick={shuffleLayout}
                        className="px-3 py-1.5 rounded-md text-xs transition-colors bg-purple-600 hover:bg-purple-500 text-white font-bold ml-1 flex items-center gap-1"
                    >
                        🎲 Variar
                    </button>
                </div>
            </div>

            {/* Row 2: Themes */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold px-2 w-16 text-right">Cores</span>
                <div className="flex gap-1 bg-white/10 p-1 rounded-lg">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => updateParam('theme', t.id)}
                            className={`px-3 py-1.5 rounded-md text-xs transition-colors ${currentTheme === t.id ? 'bg-white text-black font-semibold' : 'hover:bg-white/10 text-neutral-300'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 3: Background Controls */}
            <div className="flex items-center gap-2 border-t border-white/10 pt-2 mt-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold px-2 w-16 text-right">Fundo</span>

                <div className="flex gap-2 items-center">
                    {/* Image URL Input */}
                    <input
                        type="text"
                        placeholder="URL da Imagem..."
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white w-32 focus:outline-none focus:border-blue-500"
                        defaultValue={searchParams.get('bgImage') || ''}
                        onBlur={(e) => updateParam('bgImage', e.target.value)}
                    />

                    {/* Opacity Slider */}
                    <div className="flex flex-col w-20">
                        <label className="text-[8px] text-neutral-400 uppercase">Opacidade</label>
                        <input
                            type="range"
                            min="0" max="100"
                            defaultValue={searchParams.get('bgOp') || '80'}
                            onChange={(e) => updateParam('bgOp', e.target.value)}
                            className="h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Color Picker */}
                    <div className="flex flex-col">
                        <label className="text-[8px] text-neutral-400 uppercase">Cor Overlay</label>
                        <input
                            type="color"
                            defaultValue={searchParams.get('bgColor') || '#000000'}
                            onChange={(e) => updateParam('bgColor', e.target.value)}
                            className="w-8 h-6 bg-transparent cursor-pointer"
                        />
                    </div>

                    {/* Gradient Selector */}
                    <select
                        defaultValue={searchParams.get('bgGrad') || 'none'}
                        onChange={(e) => updateParam('bgGrad', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none"
                    >
                        <option value="none">Sólido</option>
                        <option value="to_bottom">⬇️ Bottom</option>
                        <option value="to_right">➡️ Right</option>
                    </select>

                </div>
            </div>

        </div>
    );
}
