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


