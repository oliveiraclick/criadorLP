import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import SectionBackground, { TextureType } from './SectionBackground';
import InlineTextEdit from '../ui/InlineTextEdit';

export type FooterContent = {
    aboutText: string;
    contactStart: string;
    contactEnd: string;
    copyright: string;
    sections: { id: string, title: string, items: string[] }[];
};

export const getDefaultFooter = (businessName: string): FooterContent => {
    return {
        aboutText: 'Transformando empresas com soluções inovadoras e design de alta performance.',
        contactStart: 'Entre em contato:',
        contactEnd: 'contato@empresa.com',
        copyright: `© ${new Date().getFullYear()} ${businessName}. Todos os direitos reservados.`,
        sections: [
            { id: '1', title: 'Soluções', items: ['Consultoria', 'Desenvolvimento', 'Design', 'Marketing'] },
            { id: '2', title: 'Empresa', items: ['Sobre Nós', 'Carreiras', 'Blog', 'Imprensa'] },
            { id: '3', title: 'Legal', items: ['Termos de Uso', 'Política de Privacidade', 'Cookies', 'Compliance'] },
        ]
    };
};

type FooterProps = {
    layout: 'simple_centered' | 'newsletter_impact' | 'multi_column' | 'minimal';
    theme: 'minimal' | 'bold' | 'trust';
    businessName: string;
    primaryColor: string;
    logo?: string;
    // Content State
    content: FooterContent;
    isEditing?: boolean;
    onContentChange?: (field: string, value: any, sectionId?: string, itemIndex?: number) => void;
    // BG Props
    backgroundImage?: string;
    backgroundVideo?: string; // New
    overlayTexture?: TextureType;
    textureOpacity?: number;
    overlayOpacity?: number;
    overlayColor?: string;
    overlayGradient?: 'none' | 'to_bottom' | 'to_right' | 'radial';
};

export default function SmartFooter({
    layout = 'multi_column',
    theme,
    businessName,
    primaryColor,
    logo,
    content,
    isEditing = false,
    onContentChange,
    backgroundImage,
    backgroundVideo, // New
    overlayTexture,
    textureOpacity,
    overlayOpacity,
    overlayColor,
    overlayGradient
}: FooterProps) {

    const themes = {
        minimal: { bg: 'bg-white', text: 'text-slate-600', title: 'text-slate-900', border: 'border-slate-100' },
        bold: { bg: 'bg-black', text: 'text-neutral-400', title: 'text-white', border: 'border-neutral-800' },
        trust: { bg: 'bg-slate-900', text: 'text-slate-300', title: 'text-white', border: 'border-slate-800' }
    };
    const t = themes[theme] || themes.trust;

    const hasCustomBg = !!backgroundImage;
    const containerClass = `relative pt-20 pb-10 px-6 overflow-hidden ${!hasCustomBg ? t.bg : ''}`;

    // Layout 1: Simple Centered
    if (layout === 'simple_centered') {
        return (
            <footer className={containerClass}>
                <SectionBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {logo && <img src={logo} alt="Logo" className="h-8 mx-auto mb-6 opacity-90" />}
                    <div className={`flex justify-center gap-6 mb-8 ${t.title}`}>
                        {['Sobre', 'Serviços', 'Contato', 'Privacidade'].map((item, i) => (
                            <a key={i} href="#" className="hover:text-blue-500 transition-colors">{item}</a>
                        ))}
                    </div>
                    <div className={`flex justify-center gap-4 mb-8 ${hasCustomBg ? 'text-white' : ''}`}>
                        <div className="p-2 rounded-full bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors"><Instagram size={20} /></div>
                        <div className="p-2 rounded-full bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors"><Linkedin size={20} /></div>
                        <div className="p-2 rounded-full bg-slate-800/20 hover:bg-slate-800/40 cursor-pointer transition-colors"><Facebook size={20} /></div>
                    </div>
                    <InlineTextEdit value={content.copyright} onChange={(v) => onContentChange?.('copyright', v)} isEditing={isEditing} className={`text-sm ${hasCustomBg ? 'text-neutral-300' : t.text}`} />
                </div>
            </footer>
        );
    }

    // Layout 3: Newsletter Impact (NEW)
    if (layout === 'newsletter_impact') {
        return (
            <footer className={containerClass}>
                <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h3 className={`text-3xl font-bold mb-4 ${hasCustomBg ? 'text-white' : t.title}`}>Fique por dentro das novidades</h3>
                        <p className={`${hasCustomBg ? 'text-neutral-300' : t.text}`}>Receba nossas últimas atualizações e ofertas exclusivas diretamente no seu email.</p>
                    </div>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Seu melhor email" className="flex-1 p-4 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="px-8 py-4 rounded-lg font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: primaryColor }}>Inscrever</button>
                    </div>
                </div>
                <div className={`relative z-10 max-w-7xl mx-auto pt-8 border-t ${hasCustomBg ? 'border-white/10' : t.border} text-center text-sm ${hasCustomBg ? 'text-neutral-400' : t.text}`}>
                    <InlineTextEdit value={content.copyright} onChange={(v) => onContentChange?.('copyright', v)} isEditing={isEditing} />
                </div>
            </footer>
        )
    }

    // Default: Multi-Column
    return (
        <footer className={containerClass}>
            <SectionBackground backgroundImage={backgroundImage} overlayTexture={overlayTexture} textureOpacity={textureOpacity} overlayOpacity={overlayOpacity} overlayColor={overlayColor} overlayGradient={overlayGradient} theme={theme} />
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    {logo && <img src={logo} alt="Logo" className="h-8 mb-6" />}
                    <InlineTextEdit value={content.aboutText} onChange={(v) => onContentChange?.('aboutText', v)} isEditing={isEditing} tagName="p" multiline className={`text-sm leading-relaxed mb-6 ${hasCustomBg ? 'text-neutral-300' : t.text}`} />
                    <div className={`flex gap-3 ${hasCustomBg ? 'text-white' : t.title}`}>
                        <Instagram size={20} className="hover:text-blue-500 cursor-pointer" />
                        <Linkedin size={20} className="hover:text-blue-500 cursor-pointer" />
                        <Twitter size={20} className="hover:text-blue-500 cursor-pointer" />
                    </div>
                </div>

                {content.sections.map((section, idx) => (
                    <div key={section.id}>
                        <InlineTextEdit value={section.title} onChange={(v) => onContentChange?.('sectionTitle', v, section.id)} isEditing={isEditing} tagName="h4" className={`font-bold mb-6 ${hasCustomBg ? 'text-white' : t.title}`} />
                        <ul className={`space-y-4 text-sm ${hasCustomBg ? 'text-neutral-300' : t.text}`}>
                            {section.items.map((item, k) => (
                                <li key={k}>
                                    <InlineTextEdit value={item} onChange={(v) => onContentChange?.('sectionItem', v, section.id, k)} isEditing={isEditing} className="hover:text-blue-500" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className={`relative z-10 max-w-7xl mx-auto pt-8 border-t ${hasCustomBg ? 'border-white/10' : t.border} flex flex-col md:flex-row justify-between items-center text-sm ${hasCustomBg ? 'text-neutral-400' : t.text}`}>
                <InlineTextEdit value={content.copyright} onChange={(v) => onContentChange?.('copyright', v)} isEditing={isEditing} />
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#">Termos de Uso</a>
                    <a href="#">Política de Privacidade</a>
                </div>
            </div>
        </footer>
    );
}
