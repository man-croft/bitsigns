import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MintForm } from "@/components/mint-form";

export default function MintPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Mint Your Avatar</h1>
            <p className="text-muted-foreground">
              Claim your place in the chain. Your avatar will be generated based on your unique astrological traits.
            </p>
          </div>
          
          <MintForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
