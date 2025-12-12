"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ToolbarClient({ currentLayout, currentTheme }: { currentLayout: string, currentTheme: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [copyFeedback, setCopyFeedback] = useState('');
    const [isExporting, setIsExporting] = useState(false);

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

    // --- SHARE LOGIC ---
    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopyFeedback('Link Copiado!');
            setTimeout(() => setCopyFeedback(''), 2000);
        });
    };

    // --- EXPORT LOGIC ---
    const handleExport = async () => {
        setIsExporting(true);
        try {
            // 1. Get the current HTML content
            // We want mainly the <main> tag.
            const mainContent = document.querySelector('main')?.innerHTML;
            if (!mainContent) {
                alert('Erro ao capturar conteúdo da página.');
                return;
            }

            // 2. Build the full HTML file
            const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page Exportada</title>
    <!-- Tailwind CSS (via CDN for simplicity in export) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Basic Reset & Font fallback */
        body { font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="bg-white">
    ${mainContent}
    
    <!-- Clean up UI artifacts if captured (like this toolbar if it was inside main, but it shouldn't be) -->
    <script>
        // Optional: Remove any elements that shouldn't be in the final page
        document.querySelectorAll('.exclude-from-export').forEach(el => el.remove());
    </script>
</body>
</html>
            `;

            // 3. Create ZIP
            const zip = new JSZip();
            zip.file("index.html", fullHtml);

            // Add a readme
            zip.file("README.txt", "Projeto Landing Factory\n\nEste código é uma exportação estática.\nBasta abrir o arquivo index.html em qualquer navegador.\nAs imagens base64 (logo) já estão embutidas.");

            // 4. Download
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "projeto-landing-page.zip");

        } catch (error) {
            console.error(error);
            alert('Erro ao exportar projeto.');
        } finally {
            setIsExporting(false);
        }
    };

    const themes = [
        { id: 'minimal', label: 'Clean' },
        { id: 'bold', label: 'Dark / Bold' },
        { id: 'trust', label: 'Profissional' }
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl flex flex-col gap-2 z-50 border border-white/10 exclude-from-export">
            {/* Row 1: Actions (Share/Export) */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold px-2">Ações</span>
                <div className="flex gap-2">
                    <button
                        onClick={handleShare}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs flex items-center gap-2 transition-colors"
                    >
                        🔗 {copyFeedback || 'Compartilhar'}
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs flex items-center gap-2 transition-colors font-bold"
                    >
                        {isExporting ? '⏳ Gerando...' : '💾 Baixar Código (ZIP)'}
                    </button>
                </div>
            </div>

            {/* Row 2: Layouts */}
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

            {/* Row 3: Themes */}
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

            {/* Row 4: Background Controls */}
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
