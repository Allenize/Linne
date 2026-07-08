import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WaveDivider from "@/components/WaveDivider";

const WHITE = "#ffffff";
const STONE_50 = "#fafaf9";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <ScrollProgress />
      <Hero />
      <About />
      <WaveDivider from={WHITE} to={STONE_50} />
      <Skills />
      <WaveDivider from={STONE_50} to={WHITE} />
      <Projects />
      <WaveDivider from={WHITE} to={STONE_50} />
      <Education />
      <WaveDivider from={STONE_50} to={WHITE} />
      <Certifications />
      <WaveDivider from={WHITE} to={STONE_50} />
      <Contact />
      <WaveDivider from={STONE_50} to={WHITE} />
      <Footer />
    </main>
  );
}
