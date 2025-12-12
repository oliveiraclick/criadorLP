"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Trash2, Plus, Layout, Zap, Search } from 'lucide-react';

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
            color: 'bg-blue-600',
        },
        {
            id: 2,
            name: 'Studio Zen Yoga',
            style: 'Minimalista',
            status: 'Rascunho',
            date: '5h atrás',
            icon: '🧘‍♀️',
            color: 'bg-purple-500',
        }
    ]);

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Excluir "${name}"?`)) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-saas-blue text-white p-6 md:p-12 font-sans selection:bg-blue-500 selection:text-white pb-32">

            {/* Top Bar */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Meus Projetos</h1>
                    <p className="text-blue-200/60 text-sm">Gerencie suas criações recentes</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full md:w-64 bg-blue-900/30 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:bg-blue-900/50 transition-colors"
                        />
                    </div>
                    <Link
                        href="/dashboard/new"
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Criar Nova LP
                    </Link>
                </div>
            </header>

            {/* Main Content - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Stats Card */}
                <div className="card-glass-blue p-8 flex flex-col justify-between h-full min-h-[300px] col-span-1 lg:col-span-1 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                    <div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 text-2xl">⚡</div>
                        <h3 className="text-2xl font-bold mb-2">Performance</h3>
                        <p className="text-blue-200/60 text-sm">Suas páginas estão convertendo 20% acima da média.</p>
                    </div>
                    <div className="mt-8">
                        <div className="flex justify-between text-sm mb-2 font-bold">
                            <span>Otimização</span>
                            <span>94%</span>
                        </div>
                        <div className="w-full bg-blue-900/50 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full w-[94%]"></div>
                        </div>
                    </div>
                </div>

                {/* Project Cards */}
                {projects.map((project) => (
                    <div key={project.id} className="card-white p-6 relative group hover:scale-[1.02] transition-transform duration-300 cursor-pointer border-transparent hover:border-blue-200">
                        <div className={`h-32 ${project.color} rounded-3xl mb-4 flex items-center justify-center text-5xl shadow-inner relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                            {project.icon}
                        </div>

                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{project.name}</h3>
                                <p className="text-slate-400 text-sm">{project.style}</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(project.id, project.name); }}
                                className="text-slate-300 hover:text-red-500 transition-colors p-2"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Publicado' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                {project.status}
                            </span>
                            <span className="text-xs text-slate-400 font-bold">{project.date}</span>
                        </div>
                    </div>
                ))}

                {/* Quick Action Card */}
                <Link href="/dashboard/new" className="bg-blue-600/10 border-2 border-dashed border-blue-500/30 rounded-[2rem] p-6 flex flex-col items-center justify-center text-blue-300 hover:bg-blue-600/20 hover:border-blue-400 hover:text-white transition-all min-h-[300px] gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-2">
                        <Plus />
                    </div>
                    <span className="font-bold">Novo Projeto</span>
                </Link>

            </div>

            <div className="text-center mt-20">
                <p className="text-blue-500/30 text-[10px] uppercase font-bold tracking-widest">BY desenvolve+</p>
            </div>
        </div>
    );
}
