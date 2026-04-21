import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import FeaturedProjects from "@/components/home/featured-projects";
import FeaturedCertifications from "@/components/home/featured-certifications";
import ExperienceTimeline from "@/components/experience/experience-timeline";
import Contact from "@/components/home/contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects />
      <FeaturedCertifications />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}