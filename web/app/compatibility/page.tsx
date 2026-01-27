import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CompatibilityChecker } from "@/components/compatibility-checker";

export default function CompatibilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Cosmic Compatibility</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              See how your BitSigns align. Enter another wallet address to calculate your elemental synergy score.
            </p>
          </div>
          
          <CompatibilityChecker />
        </div>
      </main>

      <Footer />
    </div>
  );
}
