import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <div className="pt-8 sm:pt-10" />
      <Projects />
      <Footer />
    </main>
  );
}
