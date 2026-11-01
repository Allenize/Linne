import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <main className="projects-page relative min-h-screen overflow-hidden">
      <div className="projects-ambient" aria-hidden="true">
        <span className="projects-orb projects-orb-a" />
        <span className="projects-orb projects-orb-b" />
        <span className="projects-orb projects-orb-c" />
      </div>
      <Navbar />
      <div className="pt-8 sm:pt-10" />
      <Projects />
      <Footer />
    </main>
  );
}
