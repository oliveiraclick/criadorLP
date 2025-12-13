"use client";

import React, { useState, useEffect } from 'react';
import SmartHero, { TextureType, getHeroContent } from "@/components/smart/Hero";
import SmartFeatures, { getDefaultFeatures, FeatureItem } from "@/components/smart/Features";
import SmartPricing, { getDefaultPricing, PricingPlan } from "@/components/smart/Pricing";
import SmartFooter, { getDefaultFooter, FooterContent } from "@/components/smart/Footer";
import ToolbarClient from "./ToolbarClient";
import IconPicker from '@/components/ui/IconPicker';
import BackgroundControls from "@/components/ui/BackgroundControls";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import { Loader2, Download, Save, LogOut, Check, Pencil } from 'lucide-react';

type EditorProps = {
    initialParams: any;
};

type SectionConfig = {
    layout: string;
    bgImage?: string;
    overlayTexture: TextureType;
    textureOpacity: number;
    overlayOpacity: number;
    overlayColor: string;
};

// --- SECTION WRAPPER COMPONENT (Moved outside to prevent re-mounts/scroll resets) ---
const SectionWrapper = ({
    sectionKey,
    title,
    children,
    isEditing,
    config,
    activeBgControl,
    onLayoutChange,
    onToggleBgControl,
    onBgChange,
    onImageUpload,
    toolbarOptions
}: any) => {
    return (
        <div className="relative group">
            {isEditing && (
                <>
                    <SectionToolbar
                        currentLayout={config.layout}
                        onLayoutChange={(l) => onLayoutChange(sectionKey, l)}
                        name={title}
                        options={toolbarOptions}
                    />
                    <button
                        onClick={() => onToggleBgControl(sectionKey)}
                        className={`absolute top-20 right-4 z-40 bg-white text-slate-700 p-2 px-3 rounded-lg shadow-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-all ${activeBgControl === sectionKey ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                        🎨 Fundo
                    </button>
                    {activeBgControl === sectionKey && (
                        <div className="absolute top-32 right-4 z-50">
                            <BackgroundControls
                                currentTexture={config.overlayTexture}
                                textureOpacity={config.textureOpacity}
                                hasBgImage={!!config.bgImage}
                                onTextureChange={(t) => onBgChange(sectionKey, { overlayTexture: t })}
                                onOpacityChange={(val) => onBgChange(sectionKey, { textureOpacity: val })}
                                onImageUpload={(f) => onImageUpload(f, sectionKey)}
                                onClearImage={() => onBgChange(sectionKey, { bgImage: undefined })}
                            />
                        </div>
                    )}
                </>
            )}
            {children}
        </div>
    );
};

// --- MAIN PAGE EDITOR ---

export default function PageEditor({ initialParams }: EditorProps) {
    // 1. GLOBAL CONFIG
    const [globalConfig, setGlobalConfig] = useState({
        theme: initialParams.theme || 'trust',
        businessName: initialParams.name || 'Sua Empresa',
        primaryColor: initialParams.color || '#2563eb',
        tone: initialParams.tone || 'Profissional & Sério',
        logo: initialParams.logo,
        industry: initialParams.industry || 'Serviços Gerais',
        bgOp: initialParams.bgOp ? parseInt(initialParams.bgOp) : 80,
        bgColor: initialParams.bgColor || '#000000',
        bgGrad: initialParams.bgGrad || 'none',
    });

    // 2. PER-SECTION CONFIG STATE
    const initialSectionConfig: SectionConfig = {
        layout: initialParams.layout || 'split_right',
        bgImage: initialParams.bgImage,
        overlayTexture: 'none',
        textureOpacity: 30,
        overlayOpacity: globalConfig.bgOp,
        overlayColor: globalConfig.bgColor,
    };

    const [sectionConfigs, setSectionConfigs] = useState<{ [key: string]: SectionConfig }>({
        hero: { ...initialSectionConfig },
        features: { ...initialSectionConfig, layout: 'centered', bgImage: undefined },
        pricing: { ...initialSectionConfig, layout: 'centered', bgImage: undefined },
        footer: { ...initialSectionConfig, layout: 'multi_column', bgImage: undefined },
    });

    // 3. CONTENT STATE
    // Hero Content
    const [heroContent, setHeroContent] = useState(() => getHeroContent(globalConfig.tone, globalConfig.businessName));

    // Features Content
    const [featureContent, setFeatureContent] = useState<FeatureItem[]>([]);
    useEffect(() => {
        setFeatureContent(getDefaultFeatures(globalConfig.industry));
    }, [globalConfig.industry]);

    // Pricing Content
    const [pricingContent, setPricingContent] = useState<PricingPlan[]>([]);
    useEffect(() => {
        setPricingContent(getDefaultPricing(globalConfig.industry));
    }, [globalConfig.industry]);

    // Footer Content
    const [footerContent, setFooterContent] = useState<FooterContent>(() => getDefaultFooter(globalConfig.businessName));
    useEffect(() => {
        setFooterContent(prev => ({ ...prev, copyright: `© ${new Date().getFullYear()} ${globalConfig.businessName}. Todos os direitos reservados.` }));
    }, [globalConfig.businessName]);


    // 4. UI STATE
    const [isEditing, setIsEditing] = useState(false);
    const [activeIconEdit, setActiveIconEdit] = useState<{ id: string, section: 'features' } | null>(null);
    const [activeBgControl, setActiveBgControl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const router = useRouter();

    // HANDLERS
    const handleSaveProject = async () => {
        setIsSaving(true);

        // Simulate processing
        await new Promise(r => setTimeout(r, 1000));

        // 1. Create Project Object
        const newProject = {
            id: Date.now(), // Simple unique ID
            name: globalConfig.businessName || 'Novo Projeto',
            style: globalConfig.tone || 'Moderno',
            status: 'Rascunho',
            date: 'Agora mesmo',
            icon: '🚀', // Could be dynamic based on industry
            color: 'bg-blue-600' // Could be dynamic
        };

        // 2. Save to LocalStorage
        try {
            const stored = localStorage.getItem('my_projects');
            const projects = stored ? JSON.parse(stored) : [];
            localStorage.setItem('my_projects', JSON.stringify([newProject, ...projects]));
        } catch (e) {
            console.error("Erro ao salvar localmente", e);
        }

        setIsSaving(false);
        alert('Projeto salvo com sucesso! Redirecionando...');
        router.push('/dashboard');
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            // Temporarily hide UI elements that shouldn't be in the export
            const uiElements = document.querySelectorAll('.exclude-from-export');
            uiElements.forEach(el => el.classList.add('hidden'));

            const mainContent = document.querySelector('main')?.innerHTML;

            // Restore UI
            uiElements.forEach(el => el.classList.remove('hidden'));

            if (!mainContent) throw new Error("No content");

            const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${globalConfig.businessName} - Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { font-family: system-ui, sans-serif; }</style>
</head>
<body class="bg-white">
    ${mainContent}
</body>
</html>`;

            const zip = new JSZip();
            zip.file("index.html", fullHtml);
            zip.file("README.txt", "Gerado por Landing Factory.\nAbra index.html para visualizar.");

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `lp-${globalConfig.businessName.toLowerCase().replace(/\s+/g, '-')}.zip`);

        } catch (e) {
            console.error(e);
            alert("Erro ao exportar.");
        } finally {
            setIsExporting(false);
        }
    };

    const updateSectionConfig = (section: string, updates: Partial<SectionConfig>) => {
        setSectionConfigs(prev => ({
            ...prev,
            [section]: { ...prev[section], ...updates }
        }));
    };

    const handleBgChange = (section: string, updates: Partial<SectionConfig>) => {
        updateSectionConfig(section, updates);
    };

    const handleImageUpload = (file: File, section: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateSectionConfig(section, { bgImage: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleHeroContentChange = (field: string, value: string) => {
        setHeroContent(prev => ({ ...prev, [field]: value }));
    };

    const handleFeatureEdit = (id: string, field: 'title' | 'desc' | 'icon', newValue?: string) => {
        if (!isEditing) return;
        if (field === 'icon') { setActiveIconEdit({ id, section: 'features' }); return; }

        if (newValue !== undefined) {
            setFeatureContent(prev => prev.map(item => item.id === id ? { ...item, [field]: newValue } : item));
        }
    };

    const handlePricingEdit = (id: string, field: 'name' | 'price' | 'features', value: any, featureIndex?: number) => {
        if (!isEditing) return;

        setPricingContent(prev => prev.map(item => {
            if (item.id !== id) return item;
            if (field === 'features' && featureIndex !== undefined) {
                const newFeatures = [...item.features];
                newFeatures[featureIndex] = value;
                return { ...item, features: newFeatures };
            }
            return { ...item, [field]: value };
        }));
    };

    const handleFooterEdit = (field: string, value: any, sectionId?: string, itemIndex?: number) => {
        if (!isEditing) return;

        if (field === 'sectionTitle' && sectionId) {
            setFooterContent(prev => ({
                ...prev,
                sections: prev.sections.map(s => s.id === sectionId ? { ...s, title: value } : s)
            }));
            return;
        }

        if (field === 'sectionItem' && sectionId && itemIndex !== undefined) {
            setFooterContent(prev => ({
                ...prev,
                sections: prev.sections.map(s => {
                    if (s.id !== sectionId) return s;
                    const newItems = [...s.items];
                    newItems[itemIndex] = value;
                    return { ...s, items: newItems };
                })
            }));
            return;
        }

        setFooterContent(prev => ({ ...prev, [field]: value }));
    };

    const handleIconSelect = (iconName: string) => {
        if (activeIconEdit && activeIconEdit.section === 'features') {
            setFeatureContent(prev => prev.map(item => item.id === activeIconEdit.id ? { ...item, iconName } : item));
        }
        setActiveIconEdit(null);
    };


    return (
        <div className="min-h-screen bg-white relative">
            {activeIconEdit && <IconPicker currentIcon="" onSelect={handleIconSelect} onClose={() => setActiveIconEdit(null)} />}

            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur rounded-full shadow-2xl border border-slate-700/50 exclude-from-export transition-all hover:scale-105">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isEditing ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                    {isEditing ? <Check size={16} /> : <Pencil size={16} />}
                    {isEditing ? 'Concluir Edição' : 'Editar Página'}
                </button>

                <div className="w-[1px] h-6 bg-slate-700 mx-1"></div>

                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="px-4 py-2 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                    {isExporting ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                    <span className="hidden md:inline">Baixar ZIP</span>
                </button>

                <button
                    onClick={handleSaveProject}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-full font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all border border-slate-700"
                    title="Salvar e Voltar"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    <span className="hidden md:inline">Salvar</span>
                </button>
            </div>

            <main className={isEditing ? 'ring-4 ring-offset-4 ring-blue-500/20' : ''}>

                <SectionWrapper
                    sectionKey="hero"
                    title="Hero Section"
                    isEditing={isEditing}
                    config={sectionConfigs.hero}
                    activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })}
                    onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)}
                    onBgChange={handleBgChange}
                    onImageUpload={handleImageUpload}
                    toolbarOptions={[
                        { id: 'split_right', label: 'Clássico 1' },
                        { id: 'classic_card', label: 'Clássico 2' },
                        { id: 'classic_centered', label: 'Clássico 3' },
                        { id: 'impact_full', label: 'Moderno 1' },
                        { id: 'impact_big_type', label: 'Moderno 2' },
                        { id: 'minimal_centered', label: 'Minimalista' }
                    ]}
                >
                    <SmartHero
                        layout={sectionConfigs.hero.layout as any}
                        theme={globalConfig.theme as any}
                        businessName={globalConfig.businessName}
                        primaryColor={globalConfig.primaryColor}
                        tone={globalConfig.tone}
                        logo={globalConfig.logo}
                        // Content State
                        content={heroContent}
                        isEditing={isEditing}
                        onContentChange={handleHeroContentChange}
                        // BG Props
                        backgroundImage={sectionConfigs.hero.bgImage}
                        overlayTexture={sectionConfigs.hero.overlayTexture}
                        textureOpacity={sectionConfigs.hero.textureOpacity}
                        overlayOpacity={sectionConfigs.hero.overlayOpacity}
                        overlayColor={sectionConfigs.hero.overlayColor}
                        overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

                <SectionWrapper
                    sectionKey="features" title="Features"
                    isEditing={isEditing} config={sectionConfigs.features} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })}
                    onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)}
                    onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    toolbarOptions={[
                        { id: 'centered', label: 'Grid Central' },
                        { id: 'split_right', label: 'Lista Direita' },
                        { id: 'full_left', label: 'Lista Esquerda' }
                    ]}
                >
                    <SmartFeatures
                        layout={sectionConfigs.features.layout as any}
                        theme={globalConfig.theme as any}
                        content={featureContent}
                        primaryColor={globalConfig.primaryColor}
                        isEditing={isEditing}
                        onItemEdit={handleFeatureEdit}
                        // BG Props
                        backgroundImage={sectionConfigs.features.bgImage}
                        overlayTexture={sectionConfigs.features.overlayTexture}
                        textureOpacity={sectionConfigs.features.textureOpacity}
                        overlayOpacity={sectionConfigs.features.overlayOpacity}
                        overlayColor={sectionConfigs.features.overlayColor}
                        overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

                <SectionWrapper
                    sectionKey="pricing" title="Pricing"
                    isEditing={isEditing} config={sectionConfigs.pricing} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })}
                    onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)}
                    onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    toolbarOptions={[
                        { id: 'centered', label: 'Cards (Padrão)' },
                        { id: 'list', label: 'Lista Horizontal' },
                        { id: 'minimal_cards', label: 'Cards Minimal' }
                    ]}
                >
                    <SmartPricing
                        layout={sectionConfigs.pricing.layout as any}
                        theme={globalConfig.theme as any}
                        businessName={globalConfig.businessName}
                        industry={globalConfig.industry}
                        primaryColor={globalConfig.primaryColor}
                        // Content State (NEW)
                        content={pricingContent}
                        isEditing={isEditing}
                        onPlanEdit={handlePricingEdit}
                        // BG Props
                        backgroundImage={sectionConfigs.pricing.bgImage}
                        overlayTexture={sectionConfigs.pricing.overlayTexture}
                        textureOpacity={sectionConfigs.pricing.textureOpacity}
                        overlayOpacity={sectionConfigs.pricing.overlayOpacity}
                        overlayColor={sectionConfigs.pricing.overlayColor}
                        overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

                <SectionWrapper
                    sectionKey="footer" title="Footer"
                    isEditing={isEditing} config={sectionConfigs.footer} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })}
                    onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)}
                    onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    toolbarOptions={[
                        { id: 'multi_column', label: 'Multi Colunas' },
                        { id: 'simple_centered', label: 'Simples Centro' },
                        { id: 'newsletter_impact', label: 'Newsletter' },
                        { id: 'minimal', label: 'Minimalista' }
                    ]}
                >
                    <SmartFooter
                        layout={sectionConfigs.footer.layout as any}
                        theme={globalConfig.theme as any}
                        businessName={globalConfig.businessName}
                        primaryColor={globalConfig.primaryColor}
                        logo={globalConfig.logo}
                        // Content State (NEW)
                        content={footerContent}
                        isEditing={isEditing}
                        onContentChange={handleFooterEdit}
                        // BG Props
                        backgroundImage={sectionConfigs.footer.bgImage}
                        overlayTexture={sectionConfigs.footer.overlayTexture}
                        textureOpacity={sectionConfigs.footer.textureOpacity}
                        overlayOpacity={sectionConfigs.footer.overlayOpacity}
                        overlayColor={sectionConfigs.footer.overlayColor}
                        overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

            </main>

            {!isEditing && <ToolbarClient currentLayout={globalConfig.theme} currentTheme={globalConfig.theme} />}
        </div>
    );
}

// INLINE TOOLBAR
type LayoutOption = { id: string, label: string };
function SectionToolbar({ currentLayout, onLayoutChange, name, options }: { currentLayout: string, onLayoutChange: (l: string) => void, name: string, options?: LayoutOption[] }) {
    const defaultOptions = [
        { id: 'centered', label: 'Centralizado' },
        { id: 'full_left', label: 'Impacto' },
        { id: 'split_right', label: 'Clássico / Split' }
    ];
    const displayOptions = options || defaultOptions;
    return (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 text-white p-2 rounded-xl backdrop-blur-md flex items-center gap-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto max-w-[90vw]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{name}</span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {displayOptions.map(l => (
                    <button key={l.id} onClick={() => onLayoutChange(l.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${currentLayout === l.id ? 'bg-white text-black' : 'hover:bg-white/20 text-slate-300'}`}>
                        {l.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
