import Hero from "@/features/home/components/Hero";
import Benefits from "@/features/home/components/Benefits";
import Education from "@/features/home/components/Education";
import Testimonials from "@/features/home/components/Testimonials";
import MainLayout from "@/layouts/MainLayout";
import VisionMision from "@/features/home/components/VisionMision";

export default function HomePage() {
  return (
    <MainLayout>
      <main className="min-h-screen">
        <Hero />
        <Benefits />
        <Education />
        <VisionMision />
        <Testimonials />
      </main>
    </MainLayout>
  );
}
