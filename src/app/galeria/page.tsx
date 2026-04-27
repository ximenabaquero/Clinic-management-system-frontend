import Gallery from "@/features/home/components/Gallery";
import MainLayout from "@/layouts/MainLayout";

export default function GalleryPage() {
  return (
    <MainLayout>
      <div className="pt-20">
        <Gallery />
      </div>
    </MainLayout>
  );
}