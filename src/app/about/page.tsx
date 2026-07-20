import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <div className="pt-8 sm:pt-10" />
      <About />
      <Footer />
    </main>
  );
}
