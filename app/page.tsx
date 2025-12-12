import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 text-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Landing Factory
        </h1>
        <p className="text-xl text-neutral-400">
          O construtor de Landing Pages Infinitas potencializado por IA.
          Crie páginas únicas para seus clientes em segundos.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all transform hover:scale-105"
          >
            Acessar Painel
          </Link>
          <button className="px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>

      <div className="fixed bottom-8 text-neutral-600 text-sm">
        Powered by Antigravity
      </div>
    </div>
  );
}
