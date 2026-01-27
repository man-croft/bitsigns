import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProfileView } from "@/components/profile-view";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
              Manage your BitSign identity and view your traits.
            </p>
          </div>
          
          <ProfileView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
