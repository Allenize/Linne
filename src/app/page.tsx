import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GithubContributions from "@/components/GithubContributions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <GithubContributions />
      <Footer />
    </main>
  );
}