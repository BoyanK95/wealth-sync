import { Separator } from "@/components/ui/separator";
import CreatorInfo from "@/components/AboutPageComponents/CreatorInfo";
import MyStory from "@/components/AboutPageComponents/MyStory";
import ContactSection from "@/components/AboutPageComponents/ContactSection";
import ContactFooter from "@/components/AboutPageComponents/ContactFooter";

export const metadata = {
  title: "About Boyan | WealthSync",
  description: "Learn about the creator of WealthSync and get in touch.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 pb-12">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-8">
            <CreatorInfo />
            <Separator />
            <MyStory />
            <Separator />
            <ContactSection />
            <ContactFooter />
          </div>
        </div>
      </main>
    </div>
  );
}
