"use client";

import React, { useState, useEffect } from 'react';
import SmartHero, { getHeroContent } from "@/components/smart/Hero";
import { TextureType } from "@/components/smart/SectionBackground";
import SmartFeatures, { getDefaultFeatures, FeatureItem } from "@/components/smart/Features";
import SmartPricing, { getDefaultPricing, PricingPlan } from "@/components/smart/Pricing";
import SmartFooter, { getDefaultFooter, FooterContent } from "@/components/smart/Footer";

import IconPicker from '@/components/ui/IconPicker';
import { SmartTestimonials } from '@/components/smart/Testimonials';
import { SmartFAQ } from '@/components/smart/FAQ';
import { SEOSettings } from '@/components/smart/SEOSettings';

import BackgroundControls from "@/components/ui/BackgroundControls";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import { Loader2, Download, Save, LogOut, Check, Pencil, Palette, Smartphone, Monitor, Settings } from 'lucide-react';

const INDUSTRY_PALETTES: Record<string, { color: string, name: string }[]> = {
    'health': [
        { color: '#0891b2', name: 'Ocean' },
        { color: '#059669', name: 'Nature' },
        { color: '#4f46e5', name: 'Trust' }
    ],
    'music': [
        { color: '#e11d48', name: 'Passion' },
        { color: '#9333ea', name: 'Vibe' },
        { color: '#000000', name: 'Dark' }
    ],
    'digital': [
        { color: '#7c3aed', name: 'Innovation' },
        { color: '#2563eb', name: 'Success' },
        { color: '#f59e0b', name: 'Energy' }
    ],
    'default': [
        { color: '#2563eb', name: 'Blue' },
        { color: '#10b981', name: 'Green' },
        { color: '#f43f5e', name: 'Rose' },
        { color: '#8b5cf6', name: 'Violet' },
        { color: '#f59e0b', name: 'Amber' }
    ]
};

type EditorProps = {
    initialParams: any;
};

type SectionConfig = {
    layout: string;
    bgImage?: string;
    bgVideo?: string; // New
    overlayTexture: TextureType;
    textureOpacity: number;
    overlayOpacity: number;
    overlayColor: string;
};

import { ScrollReveal } from '@/components/ui/ScrollReveal';

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
    onVideoUpload, // New
    onVideoLink,   // New
    toolbarOptions
}: any) => {
    return (
        <div className="relative group">
            {isEditing && (
                <>
                    <SectionToolbar
                        currentLayout={config.layout}
                        onLayoutChange={(l: string) => onLayoutChange(sectionKey, l)} // Fixed implicit any
                        name={title}
                        options={toolbarOptions}
                    />
                    <button
                        type="button"
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
                                onTextureChange={(t: any) => onBgChange(sectionKey, { overlayTexture: t })}
                                onOpacityChange={(val: any) => onBgChange(sectionKey, { textureOpacity: val })}
                                onImageUpload={(f: any) => onImageUpload(f, sectionKey)}
                                onClearImage={() => onBgChange(sectionKey, { bgImage: undefined })}
                                // VIDEO PROPS
                                backgroundVideo={config.bgVideo}
                                onVideoUpload={(f: any) => onVideoUpload(f, sectionKey)}
                                onVideoLink={(url: string) => onVideoLink(url, sectionKey)}
                                onClearVideo={() => onBgChange(sectionKey, { bgVideo: undefined })}
                            />
                        </div>
                    )}
                </>
            )}

            {/* Animation Wrapper */}
            <ScrollReveal>
                {children}
            </ScrollReveal>
        </div>
    );
};

// --- MAIN PAGE EDITOR ---

// --- MAIN PAGE EDITOR ---

export default function PageEditor({ initialParams }: EditorProps) {
    // 1. GLOBAL CONFIG
    const [globalConfig, setGlobalConfig] = useState({
        theme: initialParams.theme || 'trust',
        businessName: initialParams.name || 'Sua Empresa',
        primaryColor: initialParams.color || (
            initialParams.industry === 'health' ? '#0891b2' : // Cyan-600 for Health
                initialParams.industry === 'music' ? '#e11d48' : // Rose-600 for Music
                    initialParams.industry === 'digital' ? '#7c3aed' : // Violet-600 for Digital
                        '#2563eb' // Blue-600 Default
        ),
        tone: initialParams.tone || 'Profissional & Sério',
        logo: initialParams.logo,
        industry: initialParams.industry || 'Serviços Gerais',
        bgOp: initialParams.bgOp ? parseInt(initialParams.bgOp) : 80,
        bgColor: initialParams.bgColor || '#000000',
        bgGrad: initialParams.bgGrad || 'none',
        pageType: initialParams.type || 'sales', // New param
    });

    // 2. PER-SECTION CONFIG STATE
    const initialSectionConfig: SectionConfig = {
        layout: initialParams.layout || 'split_right',
        bgImage: initialParams.bgImage,
        bgVideo: undefined, // New
        overlayTexture: 'none',
        textureOpacity: 30,
        overlayOpacity: globalConfig.bgOp,
        overlayColor: globalConfig.bgColor,
    };

    const [sectionConfigs, setSectionConfigs] = useState<{ [key: string]: SectionConfig }>({
        hero: { ...initialSectionConfig },
        features: { ...initialSectionConfig, layout: 'centered', bgImage: undefined },
        pricing: { ...initialSectionConfig, layout: 'centered', bgImage: undefined },
        testimonials: { ...initialSectionConfig, layout: 'grid', bgImage: undefined }, // NEW
        faq: { ...initialSectionConfig, layout: 'accordion', bgImage: undefined }, // NEW
        footer: { ...initialSectionConfig, layout: 'multi_column', bgImage: undefined },
    });

    // 3. CONTENT STATE
    // Hero Content
    const [heroContent, setHeroContent] = useState(() => getHeroContent(globalConfig.tone, globalConfig.businessName, globalConfig.industry));

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
    const [showPalettePicker, setShowPalettePicker] = useState(false);
    const [showSEO, setShowSEO] = useState(false); // NEW: SEO Modal
    const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop'); // NEW: Mobile Toggle
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const router = useRouter();

    // HANDLERS
    const handleSaveProject = async () => {
        setIsSaving(true);
        const searchParams = new URLSearchParams(window.location.search);
        const currentId = searchParams.get('id');

        // Simulate processing
        await new Promise(r => setTimeout(r, 800));

        // 1. Create Project Object
        const timestamp = Date.now();
        const projectData = {
            id: currentId ? Number(currentId) : timestamp,
            name: globalConfig.businessName || 'Novo Projeto',
            style: globalConfig.tone || 'Moderno',
            industry: globalConfig.industry,
            lastModified: new Date().toISOString(),
            data: {
                global: globalConfig,
                hero: heroContent,
                features: featureContent,
                pricing: pricingContent,
                footer: footerContent
            }
        };

        // 2. Save to LocalStorage
        try {
            const existingProjectsStr = localStorage.getItem('landing_projects');
            let projects = existingProjectsStr ? JSON.parse(existingProjectsStr) : [];

            if (currentId) {
                // UPDATE
                projects = projects.map((p: any) => p.id === Number(currentId) ? projectData : p);
            } else {
                // CREATE
                projects.push(projectData);
                // Also update URL to prevent duplicates
                const newParams = new URLSearchParams(window.location.search);
                newParams.set('id', String(projectData.id));
                router.replace(`/preview?${newParams.toString()}`);
            }

            localStorage.setItem('landing_projects', JSON.stringify(projects));
            // Backup to 'my_projects' as well to correspond with previous logic if needed, or unify.
            // Let's stick to 'landing_projects' as the primary source if the dashboard uses it.
            // Just in case, update 'my_projects' too? No, let's keep it clean.

        } catch (e) {
            console.error("Erro ao salvar", e);
        }

        setIsSaving(false);
        // Toast or specific UI feedback could go here
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const uiElements = document.querySelectorAll('.exclude-from-export');
            uiElements.forEach(el => el.classList.add('hidden'));
            const mainContent = document.querySelector('main')?.innerHTML;
            uiElements.forEach(el => el.classList.remove('hidden'));

            if (!mainContent) throw new Error("No content");

            const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${globalConfig.businessName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { font-family: system-ui, sans-serif; }</style>
</head>
<body class="bg-white">
    ${mainContent}
</body>
</html>`;

            const zip = new JSZip();
            zip.file("index.html", fullHtml);
            zip.file("README.txt", "Gerado por Landing Factory.");

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
        reader.onloadend = () => updateSectionConfig(section, { bgImage: reader.result as string });
        reader.readAsDataURL(file);
    };

    const handleVideoUpload = (file: File, section: string) => {
        const url = URL.createObjectURL(file);
        updateSectionConfig(section, { bgVideo: url });
    };

    const handleVideoLink = (url: string, section: string) => {
        updateSectionConfig(section, { bgVideo: url });
    };

    const handleHeroContentChange = (field: string, value: string) => setHeroContent(prev => ({ ...prev, [field]: value }));

    const handleFeatureEdit = (id: string, field: 'title' | 'desc' | 'icon', newValue?: string) => {
        if (!isEditing) return;
        if (field === 'icon') { setActiveIconEdit({ id, section: 'features' }); return; }
        if (newValue !== undefined) setFeatureContent(prev => prev.map(item => item.id === id ? { ...item, [field]: newValue } : item));
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
            setFooterContent(prev => ({ ...prev, sections: prev.sections.map(s => s.id === sectionId ? { ...s, title: value } : s) }));
            return;
        }
        if (field === 'sectionItem' && sectionId && itemIndex !== undefined) {
            setFooterContent(prev => ({
                ...prev, sections: prev.sections.map(s => {
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
        <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
            {activeIconEdit && <IconPicker currentIcon="" onSelect={handleIconSelect} onClose={() => setActiveIconEdit(null)} />}

            {/* FLOATING TOOLBAR */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur-md rounded-full shadow-2xl border border-slate-700/50 exclude-from-export transition-all hover:scale-105 ring-1 ring-white/10">

                {/* SEO Settings */}
                <button
                    onClick={() => setShowSEO(true)}
                    className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all mx-1"
                    title="Configurações SEO"
                >
                    <Settings size={20} />
                </button>

                <div className="w-[1px] h-6 bg-slate-700"></div>

                {/* Device Toggles */}
                <div className="flex bg-slate-800 rounded-full p-1 mx-2 border border-slate-700">
                    <button
                        onClick={() => setDeviceMode('desktop')}
                        className={`p-2 rounded-full transition-all ${deviceMode === 'desktop' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        title="Desktop"
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setDeviceMode('mobile')}
                        className={`p-2 rounded-full transition-all ${deviceMode === 'mobile' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        title="Mobile"
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="w-[1px] h-6 bg-slate-700"></div>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isEditing ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                    {isEditing ? <Check size={18} strokeWidth={3} /> : <Pencil size={18} />}
                    {isEditing ? 'Pronto' : 'Editar'}
                </button>

                {isEditing && (
                    <div className="relative animate-fade-in-right">
                        <button
                            onClick={() => setShowPalettePicker(!showPalettePicker)}
                            className="px-4 py-2 rounded-full font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 flex items-center gap-2 transition-all border-l border-slate-700 ml-2"
                        >
                            <Palette size={18} style={{ color: globalConfig.primaryColor }} />
                        </button>

                        {showPalettePicker && (
                            <div className="absolute top-14 left-0 bg-white p-2 rounded-2xl shadow-xl border border-slate-100 min-w-[220px] flex flex-col gap-1 animate-fade-in-up origin-top-left">
                                <span className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Cores Sugeridas</span>
                                {(INDUSTRY_PALETTES[globalConfig.industry as keyof typeof INDUSTRY_PALETTES] || INDUSTRY_PALETTES['default']).map((p) => (
                                    <button
                                        key={p.color}
                                        onClick={() => {
                                            setGlobalConfig(prev => ({ ...prev, primaryColor: p.color }));
                                            setShowPalettePicker(false);
                                        }}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform" style={{ backgroundColor: p.color }}></div>
                                        <div>
                                            <span className={`text-sm font-bold block ${globalConfig.primaryColor === p.color ? 'text-slate-900' : 'text-slate-600'}`}>{p.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="w-[1px] h-6 bg-slate-700 mx-2"></div>

                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                    title="Baixar Site (ZIP)"
                >
                    {isExporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                </button>

                <button
                    onClick={handleSaveProject}
                    disabled={isSaving}
                    className="p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 flex items-center gap-2 transition-all border border-slate-700 ml-2"
                    title="Salvar Projeto"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                </button>
            </div>

            {/* MAIN PREVIEW AREA */}
            <main className={`transition-all duration-700 ease-in-out origin-top ${isEditing ? 'scale-[0.98] mt-24 mb-24 rounded-[2rem] shadow-2xl ring-1 ring-slate-900/5' : ''
                } ${deviceMode === 'mobile'
                    ? 'max-w-[400px] mx-auto border-[14px] border-slate-900 rounded-[3rem] overflow-hidden my-24 shadow-2xl bg-white'
                    : 'w-full'
                }`}>

                {/* 1. HERO SECTION */}
                <SectionWrapper
                    sectionKey="hero" title="Hero / Capa" isEditing={isEditing} config={sectionConfigs.hero} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                    toolbarOptions={[
                        { id: 'split_right', label: 'Clássico' },
                        { id: 'impact_full', label: 'Impacto' },
                        { id: 'minimal_centered', label: 'Minimalista' },
                        { id: 'artistic_intense', label: 'Artista / Intenso' }
                    ]}
                >
                    <SmartHero
                        layout={sectionConfigs.hero.layout as any} theme={globalConfig.theme as any} businessName={globalConfig.businessName} industry={globalConfig.industry} primaryColor={globalConfig.primaryColor} tone={globalConfig.tone} logo={globalConfig.logo}
                        content={heroContent} isEditing={isEditing} onContentChange={handleHeroContentChange}
                        backgroundImage={sectionConfigs.hero.bgImage} backgroundVideo={sectionConfigs.hero.bgVideo} overlayTexture={sectionConfigs.hero.overlayTexture} textureOpacity={sectionConfigs.hero.textureOpacity} overlayOpacity={sectionConfigs.hero.overlayOpacity} overlayColor={sectionConfigs.hero.overlayColor} overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

                {/* 2. FEATURES SECTION */}
                <SectionWrapper
                    sectionKey="features" title="Benefícios" isEditing={isEditing} config={sectionConfigs.features} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                    toolbarOptions={[{ id: 'centered', label: 'Grid' }, { id: 'split_right', label: 'Lista' }, { id: 'full_left', label: 'Impacto' }]}
                >
                    <SmartFeatures
                        layout={sectionConfigs.features.layout as any} theme={globalConfig.theme as any} content={featureContent} primaryColor={globalConfig.primaryColor} isEditing={isEditing} onItemEdit={handleFeatureEdit}
                        backgroundImage={sectionConfigs.features.bgImage} backgroundVideo={sectionConfigs.features.bgVideo} overlayTexture={sectionConfigs.features.overlayTexture} textureOpacity={sectionConfigs.features.textureOpacity} overlayOpacity={sectionConfigs.features.overlayOpacity} overlayColor={sectionConfigs.features.overlayColor} overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

                {/* 3. TESTIMONIALS SECTION (NEW) */}
                <SectionWrapper
                    sectionKey="testimonials" title="Prova Social" isEditing={isEditing} config={sectionConfigs.testimonials} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                    toolbarOptions={[{ id: 'grid', label: 'Grid' }]}
                >
                    <SmartTestimonials
                        industry={globalConfig.industry}
                        primaryColor={globalConfig.primaryColor}
                        isEditing={isEditing}
                    />
                </SectionWrapper>

                {/* 4. PRICING SECTION */}
                {globalConfig.pageType === 'sales' && (
                    <SectionWrapper
                        sectionKey="pricing" title="Preços" isEditing={isEditing} config={sectionConfigs.pricing} activeBgControl={activeBgControl}
                        onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                        onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                        toolbarOptions={[{ id: 'centered', label: 'Cards' }, { id: 'list', label: 'Lista' }, { id: 'minimal_cards', label: 'Minimalista' }]}
                    >
                        <SmartPricing
                            layout={sectionConfigs.pricing.layout as any} theme={globalConfig.theme as any} businessName={globalConfig.businessName} industry={globalConfig.industry} primaryColor={globalConfig.primaryColor}
                            content={pricingContent} isEditing={isEditing} onPlanEdit={handlePricingEdit}
                            backgroundImage={sectionConfigs.pricing.bgImage} backgroundVideo={sectionConfigs.pricing.bgVideo} overlayTexture={sectionConfigs.pricing.overlayTexture} textureOpacity={sectionConfigs.pricing.textureOpacity} overlayOpacity={sectionConfigs.pricing.overlayOpacity} overlayColor={sectionConfigs.pricing.overlayColor} overlayGradient={globalConfig.bgGrad as any}
                        />
                    </SectionWrapper>
                )}

                {/* 5. FAQ SECTION (NEW) */}
                <SectionWrapper
                    sectionKey="faq" title="FAQ" isEditing={isEditing} config={sectionConfigs.faq} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                    toolbarOptions={[{ id: 'accordion', label: 'Acordeão' }]}
                >
                    <SmartFAQ
                        industry={globalConfig.industry}
                        primaryColor={globalConfig.primaryColor}
                        isEditing={isEditing}
                    />
                </SectionWrapper>

                {/* 6. FOOTER */}
                <SectionWrapper
                    sectionKey="footer" title="Rodapé" isEditing={isEditing} config={sectionConfigs.footer} activeBgControl={activeBgControl}
                    onLayoutChange={(k: any, l: any) => updateSectionConfig(k, { layout: l })} onToggleBgControl={(k: any) => setActiveBgControl(activeBgControl === k ? null : k)} onBgChange={handleBgChange} onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload} onVideoLink={handleVideoLink}
                    toolbarOptions={[{ id: 'multi_column', label: 'Completo' }, { id: 'simple_centered', label: 'Simples' }, { id: 'newsletter_impact', label: 'Newsletter' }]}
                >
                    <SmartFooter
                        layout={sectionConfigs.footer.layout as any} theme={globalConfig.theme as any} businessName={globalConfig.businessName} primaryColor={globalConfig.primaryColor} logo={globalConfig.logo}
                        content={footerContent} isEditing={isEditing} onContentChange={handleFooterEdit}
                        backgroundImage={sectionConfigs.footer.bgImage} backgroundVideo={sectionConfigs.footer.bgVideo} overlayTexture={sectionConfigs.footer.overlayTexture} textureOpacity={sectionConfigs.footer.textureOpacity} overlayOpacity={sectionConfigs.footer.overlayOpacity} overlayColor={sectionConfigs.footer.overlayColor} overlayGradient={globalConfig.bgGrad as any}
                    />
                </SectionWrapper>

            </main>

            {/* MODALS */}
            {showSEO && (
                <SEOSettings
                    businessName={globalConfig.businessName}
                    industry={globalConfig.industry}
                    onClose={() => setShowSEO(false)}
                />
            )}
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
                    <button type="button" key={l.id} onClick={() => onLayoutChange(l.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${currentLayout === l.id ? 'bg-white text-black' : 'hover:bg-white/20 text-slate-300'}`}>
                        {l.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
