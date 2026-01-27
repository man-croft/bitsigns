import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Droplets, Sun, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Solar Decoration */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl -z-10" />

        {/* Hero */}
        <section className="py-24 md:py-32 text-center">
          <div className="container px-4 mx-auto">
            <h1 className="mb-6 text-6xl md:text-8xl font-heading font-bold text-[#2aa198] leading-[1.1] md:leading-[1.1]">
              Regen<br />
              <span className="text-accent inline-block mt-2">Your Roots</span>
            </h1>
            <p className="mx-auto max-w-xl text-2xl text-muted-foreground font-body">
              Technology that breathes. Mint your unique BitSign avatar based on the Bitcoin block of your birth.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/mint">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Plant Your Seed <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <Link href="/mint" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-[#2aa198]/10 flex items-center justify-center text-[#2aa198]">
                      <Sprout className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-[#2aa198]">Grow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Mint your seedling based on block height. A 1-of-1 generative avatar.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 2 */}
              <Link href="/fortune" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Droplets className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-accent">Nurture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Receive daily water (oracle readings) for your soul based on chain activity.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 3 */}
              <Link href="/compatibility" className="group">
                <Card className="h-full bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#93a1a1]">
                  <CardHeader>
                    <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Sun className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-primary">Bloom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                      Connect your roots with others. Check compatibility between wallets.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
