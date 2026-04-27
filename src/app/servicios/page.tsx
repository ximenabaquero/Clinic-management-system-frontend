import Services from "@/features/home/components/Services";
import MainLayout from "@/layouts/MainLayout";

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="pt-20">
        <Services />
      </div>
    </MainLayout>
  );
}