import Contact from "@/features/home/components/Contact";
import MainLayout from "@/layouts/MainLayout";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="pt-20">
        <Contact />
      </div>
    </MainLayout>
  );
}