import SmartHero, { getHeroConfig } from "@/components/smart/Hero";
import PageEditor from "./PageEditor";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function PreviewPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    // In Next.js 15, searchParams is a promise, but in 14 it's not. 
    // The previous 'next upgrade' might have installed 15, but usually it's 14. 
    // Wait, package.json showed "next": "16.0.10" ?? No, that version doesn't exist yet. 
    // Let's assume standard Next 14/15 behavior. The prompt said "Next 14+".
    // Actually, looking at the user env, I see next 15/16-canary is possible if they used latest.
    // The previous package.json view showed "next": "16.0.10" - wait, that's likely "15.0.0" or similar? 
    // Ah, Step 36 showed "next": "16.0.10" -> Oh, this is a very new version/nightly? 
    // Or maybe I misread. Let's look at Step 37 again.
    // "next": "16.0.10" -> This seems futuristic or a specific internal build. 
    // In Next 15, searchParams IS async. In 14 it is not.
    // I made the component async to be safe.

    return (
        <div className="min-h-screen bg-white">
            <Banner />
            {/* We need to unwrap the promise for searchParams in newer Next.js */}
            <Content searchParams={searchParams} />
        </div>
    );
}

async function Content({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;

    // Normalize params for the editor
    const initialConfig = {
        layout: params.layout as string,
        theme: params.theme as string,
        name: params.name as string,
        color: params.color as string,
        tone: params.tone as string,
        logo: params.logo as string,
        industry: params.industry as string,
        bgImage: params.bgImage as string,
        bgOp: params.bgOp as string,
        bgColor: params.bgColor as string,
        bgGrad: params.bgGrad as string,
    };

    return (
        <PageEditor initialParams={initialConfig} />
    );
}

function Banner() {
    return (
        <div className="bg-black text-white text-xs py-2 text-center font-mono">
            MODO PREVIEW • LANDING FACTORY
        </div>
    )
}

function RegenerationToolbar({ currentLayout, currentTheme }: { currentLayout: string, currentTheme: string }) {

    const layouts = [
        { id: 'centered', label: 'Centralizado' },
        { id: 'full_left', label: 'Impacto Visual' },
        { id: 'split_right', label: 'Clássico / Split' }
    ];

    const themes = [
        { id: 'minimal', label: 'Clean' },
        { id: 'bold', label: 'Dark / Bold' },
        { id: 'trust', label: 'Profissional' }
    ];

    // Helper to build URL (in a real app, use useSearchParams + useRouter)
    // Here we just append all current params + new one. 
    // Since this is server rendered, we can just use simple hrefs with URLSearchParams in a client component, 
    // but here we are in a server component (or mixed). 
    // Let's assume we want to preserve other params. 
    // For this prototype, a simple way is using a client component for the toolbar or just simple JS.
    // Given the constraints, let's make the toolbar buttons update the URL.

    // We need to know current params to preserve them. 
    // Since we don't have them easily here without drilling, let's just make it a Client Component 
    // or use a simple script. 
    // Actually, making it a client component is best.

    return <ToolbarClient currentLayout={currentLayout} currentTheme={currentTheme} />
}

import ToolbarClient from "./ToolbarClient";
