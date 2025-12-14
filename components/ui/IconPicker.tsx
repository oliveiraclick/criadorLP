"use client";

import { useState } from 'react';
import * as Icons from 'lucide-react';

// Common icons curation to avoid loading thousands
const COMMON_ICONS = [
    'Activity', 'Award', 'BarChart', 'Check', 'Clock', 'Cloud', 'Code', 'Coffee', 'Cpu', 'Database',
    'DollarSign', 'Download', 'Pencil', 'Eye', 'File', 'Filter', 'Flag', 'Folder', 'Gift', 'Globe',
    'Grid', 'Heart', 'Home', 'Image', 'Inbox', 'Layers', 'Layout', 'LifeBuoy', 'Link', 'List',
    'Lock', 'Mail', 'Map', 'MessageCircle', 'Mic', 'Monitor', 'Moon', 'Music', 'Navigation', 'Package',
    'Paperclip', 'Phone', 'PieChart', 'Play', 'Plus', 'Power', 'Printer', 'Radio', 'RefreshCcw', 'Save',
    'Search', 'Send', 'Server', 'Settings', 'Share', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Smile',
    'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Terminal', 'Thermometer', 'ThumbsUp', 'Tool',
    'Trash2', 'TrendingUp', 'Truck', 'Tv', 'Umbrella', 'Unlock', 'Upload', 'User', 'Users', 'Video',
    'Voicemail', 'Volume2', 'Watch', 'Wifi', 'Zap', 'ZoomIn'
];

type IconPickerProps = {
    currentIcon: string;
    onSelect: (iconName: string) => void;
    onClose: () => void;
};

export default function IconPicker({ currentIcon, onSelect, onClose }: IconPickerProps) {
    const [search, setSearch] = useState('');

    const filteredIcons = COMMON_ICONS.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Escolha um Ícone</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <Icons.X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="p-4 border-b border-slate-100">
                    <div className="relative">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar ícone (ex: chart, user...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-5 gap-3">
                    {filteredIcons.map(name => {
                        const Icon = (Icons as any)[name];
                        if (!Icon) return null;
                        return (
                            <button
                                key={name}
                                onClick={() => onSelect(name)}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${currentIcon === name ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                            >
                                <Icon size={24} />
                            </button>
                        );
                    })}
                    {filteredIcons.length === 0 && (
                        <div className="col-span-5 text-center py-10 text-slate-400">
                            Nenhum ícone encontrado.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
