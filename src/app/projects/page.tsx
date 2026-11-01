import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="cinematic-page relative min-h-screen overflow-hidden">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  );
}
