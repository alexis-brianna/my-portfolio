import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------------- CURSOR GLOW ---------------- */

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 90}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[180px] h-[180px] rounded-full bg-emerald-400/15 blur-3xl transition-transform duration-75 z-0"
    />
  );
}

/* ---------------- FIREFLIES ---------------- */

function Fireflies() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/70 blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -120]);

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased overflow-hidden">
      <CursorGlow />
      <Fireflies />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.15),transparent_60%)] z-0"
      />

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/favicon.jpg" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-wide text-emerald-300">
            Lexie.dev
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-sm text-zinc-400">
          {["about", "projects", "skills", "resume", "contact"].map((id) => (
            <a key={id} href={`#${id}`} className="hover:text-emerald-300">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-36 pb-28 text-center relative z-10">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I’m Lexie!
          <br />
          <span className="text-emerald-300">
            Let's Optimize ⚙️ Empower 🌟 Elevate 🌿 Together!
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Cloud engineering, automation, and operational excellence — designed
          with care for both systems and people.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-28 relative z-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-300">
          About Me
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Located in the Denver Metro, I’m a cloud-focused engineer who values
          clarity, stability, and human-centered design.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

const projectData = [
  {
    title: "Disaster Recovery Dashboard",
    description: "Centralized observability improving alert confidence and uptime.",
    stack: "Backup Radar · Veeam · Datto BCDR",
  },
  {
    title: "My Next Venture",
    description: "What will I do next?",
    stack: "To be · Determined",
  },
  {
    title: "Future Adventure",
    description: "Where will my mind take me?",
    stack: "Stay · Tuned",
  },
];

function Projects() {
  return (
    <section id="projects" className="bg-zinc-900 py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {projectData.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800"
          >
            <h3 className="text-xl mb-2">{p.title}</h3>
            <p className="text-zinc-400 mb-4">{p.description}</p>
            <span className="text-sm text-emerald-300">{p.stack}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" className="text-3xl font-semibold mb-14 text-emerald-300">
        Skills
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 text-zinc-400">
        <SkillBlock title="Cloud" items={["AWS", "IAM", "Monitoring", "Networking"]} />
        <SkillBlock title="Automation" items={["Terraform", "CI/CD", "Scripting"]} />
        <SkillBlock title="Reliability" items={["Observability", "Incident Response", "Optimization"]} />
      </div>
    </section>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
      <h3 className="text-lg font-medium mb-4 text-zinc-100">{title}</h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---------------- RESUME ---------------- */

function Resume() {
  return (
    <section id="resume" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
      <h2 className="text-3xl font-semibold mb-6 text-emerald-300">Resume</h2>
      <a
        href="/Alexis-Chaffin-Resume.pdf"
        target="_blank"
        className="inline-flex px-8 py-4 rounded-xl bg-emerald-400/90 text-zinc-900"
      >
        Download Resume
      </a>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 py-28 text-center relative z-10">
      <div className="flex justify-center gap-8 text-3xl">
        <motion.a whileHover={{ scale: 1.2 }} href="mailto:lexie@pxedust.cc">✉️</motion.a>
        <motion.a whileHover={{ scale: 1.2 }} href="https://www.linkedin.com/in/abchaffin" target="_blank">🔗</motion.a>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-8 text-zinc-500 text-sm relative z-10">
      © {new Date().getFullYear()} Lexie · Built with care
    </footer>
  );
}
