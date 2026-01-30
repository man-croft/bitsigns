import { GalleryGrid } from "@/components/gallery-grid";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdf6e3]">
      <Nav />
      
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">
              Community Gallery
            </h1>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Witness the latest BitSigns minted by the community. Each one a unique reflection of Bitcoin history.
            </p>
          </div>

          <GalleryGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
