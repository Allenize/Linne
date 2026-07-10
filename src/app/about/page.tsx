import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <div className="pt-10 sm:pt-16" />
      <About />
      <Footer />
    </main>
  );
}
