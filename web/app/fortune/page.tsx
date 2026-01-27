import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FortuneView } from "@/components/fortune-view";

export default function FortunePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-serif">The Oracle</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Consult the blockchain for guidance. The Oracle reads the current block's hash and entropy to determine your path.
            </p>
          </div>
          
          <FortuneView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
