import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Seus Projetos</h2>
                    <p className="text-neutral-500 mt-1">Gerencie suas Landing Pages geradas.</p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors font-medium text-sm"
                >
                    Criar Nova LP
                </Link>
            </div>

            {/* Empty State / List Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder Card 1 */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-4xl">💪</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">Academia Iron Force</h3>
                    <p className="text-sm text-neutral-500">Estilo: Agressivo / Escuro</p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Publicado</span>
                        <span className="text-xs text-neutral-400 py-1">Há 2 dias</span>
                    </div>
                </div>

                {/* Placeholder Card 2 */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="h-40 bg-gradient-to-br from-rose-100 to-pink-50 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-4xl">🧘‍♀️</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-pink-600 transition-colors">Studio Zen Yoga</h3>
                    <p className="text-sm text-neutral-500">Estilo: Limpo / Minimalista</p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">Rascunho</span>
                        <span className="text-xs text-neutral-400 py-1">Há 5 horas</span>
                    </div>
                </div>

                {/* New Project Card */}
                <Link href="/dashboard/new" className="border-2 border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center p-6 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all h-full min-h-[300px]">
                    <span className="text-4xl mb-2">+</span>
                    <span className="font-medium">Criar novo projeto</span>
                </Link>
            </div>
        </div>
    );
}
