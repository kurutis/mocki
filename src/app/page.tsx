// app/page.tsx
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Works from "@/components/Works";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <div id="hero" className="scroll-mt-20">
        <Hero />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutMe />
      </div>
      <div id="works" className="scroll-mt-20">
        <Works />
      </div>
      <div id="contact" className="scroll-mt-20">
        <ContactForm />
      </div>
    </>
  );
}