import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-saas-blue text-white overflow-hidden relative selection:bg-blue-500 selection:text-white font-sans">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="relative z-50 px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2L2 22h20L12 2zm0 3.5l6.5 13.5h-13L12 5.5z" /></svg>
          </div>
          LandingFactory
        </div>
        <div className="flex bg-white/5 backdrop-blur-md rounded-full px-1 p-1 border border-white/10 hidden md:flex">
          <a href="#" className="px-5 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Funcionalidades</a>
          <a href="#" className="px-5 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Soluções</a>
          <a href="#" className="px-5 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Preços</a>
        </div>
        <Link href="/dashboard" className="px-6 py-2.5 bg-white text-blue-900 rounded-full font-bold text-sm hover:bg-neutral-100 transition-colors shadow-lg shadow-blue-900/20">
          Entrar
        </Link>
      </header>

      {/* Hero */}
      <div className="relative z-10 container mx-auto px-6 mt-16 md:mt-24 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/40 rounded-full border border-blue-500/30 text-blue-200 text-xs font-bold mb-8 animate-fade-in backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Nova Engine AI 2.0 Disponível
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
          Economize Tempo e Dinheiro <br />
          <span className="text-gradient-biotech">Em Cada Landing Page</span> 🚀
        </h1>

        <p className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Descubra a forma mais inteligente de criar páginas de alta conversão.
          Nossa IA gera layouts completos, copy persuasiva e código otimizado em segundos.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-24">
          <Link href="/dashboard/new" className="btn-primary flex items-center gap-2">
            Começar Agora
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/dashboard" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-semibold">
            Ver Demonstração
          </Link>
        </div>

        {/* Floating Cards Graphic - Replicating the vibe of the reference */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] perspective-1000">

          {/* Main Card (Center) */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[90%] md:w-[60%] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-10 shadow-glow animate-float-slow z-20">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="h-2 w-20 bg-white/20 rounded-full mb-2"></div>
                <div className="h-4 w-32 bg-white/40 rounded-full"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">✨</div>
            </div>
            <div className="space-y-4">
              <div className="h-12 bg-blue-900/30 rounded-2xl w-full"></div>
              <div className="h-12 bg-blue-900/20 rounded-2xl w-full"></div>
              <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl w-full flex items-center justify-center text-2xl font-bold p-8 text-center leading-tight">
                IA Encontrou o Melhor Layout Para Você
              </div>
            </div>
          </div>

          {/* Left Card */}
          <div className="hidden md:block absolute left-0 top-32 w-[30%] bg-white text-slate-900 rounded-[2.5rem] p-6 shadow-2xl transform -rotate-6 z-30 opacity-90 hover:scale-105 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">💎</div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase">Pontos Salvos</div>
                <div className="text-2xl font-bold text-blue-600">13,200</div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Right Card */}
          <div className="hidden md:block absolute right-0 top-48 w-[35%] bg-blue-600 text-white rounded-[2.5rem] p-8 shadow-2xl transform rotate-3 z-10 opacity-90">
            <h3 className="text-xl font-bold mb-2">Viaje Grátis</h3>
            <p className="text-blue-100 text-sm mb-6">Use seus pontos acumulados para descontos.</p>
            <div className="flex gap-2">
              <div className="flex-1 h-16 bg-blue-500 rounded-2xl"></div>
              <div className="flex-1 h-16 bg-blue-700 rounded-2xl"></div>
            </div>
          </div>

        </div>

      </div>

      <footer className="w-full border-t border-white/5 bg-blue-950/20 backdrop-blur-md pt-16 pb-8 text-center mt-20">
        <p className="text-blue-200/40 text-sm mb-4">
          &copy; {new Date().getFullYear()} Landing Factory.
        </p>
        <p className="text-blue-500/50 text-xs font-bold uppercase tracking-widest">
          BY desenvolve+
        </p>
      </footer>
    </main>
  );
}
