"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Search, ExternalLink, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PremiumBackground from '@/components/ui/PremiumBackground';

type Project = {
    id: number;
    name: string;
    style: string;
    status: 'Publicado' | 'Rascunho';
    date: string;
    icon: string;
    color: string;
};

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            name: 'Academia Iron Force',
            style: 'Moderno',
            status: 'Publicado',
            date: '2d atrás',
            icon: '💪',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 2,
            name: 'Studio Zen Yoga',
            style: 'Minimalista',
            status: 'Rascunho',
            date: '5h atrás',
            icon: '🧘‍♀️',
            color: 'from-purple-500 to-pink-500',
        }
    ]);

    useEffect(() => {
        const stored = localStorage.getItem('landing_projects'); // Reading from unified storage now, or stick to 'my_projects' if that's what we used in page editor?
        // Wait, PageEditor saves to 'landing_projects'. Dashboard was reading 'my_projects'. I should align them.
        // Let's try 'landing_projects' first, and fallback/merge 'my_projects'.

        try {
            const rawLP = localStorage.getItem('landing_projects');
            const projectsLP = rawLP ? JSON.parse(rawLP) : [];

            // Transform 'landing_projects' format to Dashboard Project format if needed
            // PageEditor saves: { id, name, style, industry, lastModified, data: {...} }
            // Dashboard expects: { id, name, style, status, date, icon, color }

            const formattedLP = projectsLP.map((p: any) => ({
                id: p.id,
                name: p.name,
                style: p.style,
                status: 'Rascunho', // Default for now
                date: new Date(p.lastModified).toLocaleDateString('pt-BR'),
                icon: '🚀', // Default icon
                color: p.industry === 'health' ? 'from-cyan-500 to-teal-500' :
                    p.industry === 'music' ? 'from-rose-500 to-purple-600' :
                        'from-blue-500 to-indigo-500' // Default
            }));

            setProjects(formattedLP.reverse()); // Show newest first
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm("Tem certeza?")) {
            setProjects(prev => {
                const updated = prev.filter(p => p.id !== id);
                // Also update localStorage
                const rawLP = localStorage.getItem('landing_projects');
                if (rawLP) {
                    const list = JSON.parse(rawLP);
                    const newList = list.filter((p: any) => p.id !== id);
                    localStorage.setItem('landing_projects', JSON.stringify(newList));
                }
                return updated;
            });
        }
    }

    const router = useRouter();

    return (
        <PremiumBackground>
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div>
                        <h1 className="text-5xl font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white animate-fade-in">
                            Meus Projetos
                        </h1>
                        <p className="text-lg text-slate-400 font-light">
                            Gerencie suas páginas de alta conversão.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="relative group flex-1 md:flex-none">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all relative z-10"
                            />
                        </div>
                        <Link
                            href="/dashboard/new"
                            className="btn-primary-glow flex items-center gap-2 px-8 py-3 rounded-full whitespace-nowrap z-10"
                        >
                            <Plus size={20} />
                            <span>Nova Página</span>
                        </Link>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* 1. Create New Card (Hero) */}
                    <Link href="/dashboard/new" className="group relative col-span-1 min-h-[300px] rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-6 hover:bg-white/[0.05] hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500 z-10">
                            <Plus size={32} className="text-white" />
                        </div>

                        <div className="text-center z-10">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">Criar do Zero</h3>
                            <p className="text-sm text-slate-500 mt-1">Comece uma nova obra-prima.</p>
                        </div>
                    </Link>

                    {/* 2. Project List */}
                    {projects.map((project) => (
                        <div key={project.id} className="glass-card group relative p-1 rounded-[2rem] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="bg-[#0f172a]/80 backdrop-blur-xl h-full rounded-[1.8rem] p-6 flex flex-col justify-between relative z-10 border border-white/5 group-hover:border-white/10 transition-colors">

                                {/* Top: Icon & Actions */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-500`}>
                                        {project.icon}
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <Link
                                            href={`/preview?id=${project.id}`}
                                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30 transition-all"
                                            title="Editar"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Bottom: Info */}
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                                        {project.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-slate-400">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10`}>
                                            {project.style}
                                        </span>
                                        <span>• {project.date}</span>
                                    </div>
                                </div>

                                {/* Status Light */}
                                <div className="absolute top-6 right-6 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${project.status === 'Publicado' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PremiumBackground>
    );
}
