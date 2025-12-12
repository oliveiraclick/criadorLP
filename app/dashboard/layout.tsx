import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LandingFactory
          </h1>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            Meus Projetos
          </Link>
          <Link href="/dashboard/new" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            + Novo Projeto
          </Link>
          <div className="h-px bg-neutral-100 my-2" />
          <Link href="/settings" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            Configurações
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 md:hidden">
           <h1 className="text-lg font-bold">LandingFactory</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
