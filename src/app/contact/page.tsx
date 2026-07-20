import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="bg-stone-50">
      <Navbar />
      <div className="pt-8 sm:pt-10" />
      <Contact />
      <Footer />
    </main>
  );
}
