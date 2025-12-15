import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
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

/* ---------------- SECTION WRAPPER ---------------- */

function Section({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative z-10"
    >
      {children}
    </motion.section>
  );
}

/* ---------------- CURSOR GLOW ---------------- */

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 40}px, ${
        e.clientY - 40
      }px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[80px] h-[80px] rounded-full bg-lavender-300/20 blur-3xl z-0"
    />
  );
}

/* ---------------- FIREFLIES ---------------- */

function Fireflies() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-lavender-300/70 blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.4,
          }}
          animate={{
            y: ["-20px", "20px", "-20px"],
            x: ["-15px", "15px", "-15px"],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 14 + Math.random() * 6,
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
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen overflow-hidden">
      <Fireflies />
      <CursorGlow />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(196,181,253,0.12),transparent_65%)] z-0"
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
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-wide text-lavender-300">
            Alexis Chaffin
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-sm text-zinc-400">
          {["about", "projects", "skills", "resume", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover:text-lavender-300 transition"
            >
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
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Hi, I’m Lexie!
          <br />
          <span className="text-lavender-300">
            Optimize ⚙️ Empower 🌟 Elevate 🌿
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Cloud engineering, automation, and operational excellence — built with
          care for both systems and people.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <Section id="about">
      <div className="max-w-5xl mx-auto px-6 py-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-lavender-300">
          About Me
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Cloud-focused engineer based in the Denver metro area. I value clarity,
          stability, and human-centered design. When I’m not building systems,
          I’m hiking, painting, volunteering, or learning something new.
        </p>
      </div>
    </Section>
  );
}

/* ---------------- PROJECTS ---------------- */

const projectData: {
  title: string;
  description: string;
  stack: string;
}[] = [
  {
    title: "Disaster Recovery Dashboard",
    description:
      "Centralized observability improving alert confidence and uptime.",
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
    <Section id="projects">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-semibold mb-12 text-lavender-300">
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectData.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <h3 className="text-xl mb-2">{p.title}</h3>
              <p className="text-zinc-400 mb-4">{p.description}</p>
              <span className="text-sm text-lavender-300">{p.stack}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <Section id="skills">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-semibold mb-12 text-lavender-300">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <SkillBlock title="Cloud" items={["AWS", "IAM", "Networking"]} />
          <SkillBlock title="Automation" items={["Terraform", "CI/CD"]} />
          <SkillBlock
            title="Reliability"
            items={["Observability", "Incident Response"]}
          />
        </div>
      </div>
    </Section>
  );
}

function SkillBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <h3 className="text-lg mb-4">{title}</h3>
      <ul className="space-y-2 text-zinc-400">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- RESUME ---------------- */

function Resume() {
  return (
    <Section id="resume">
      <div className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-semibold mb-10 text-lavender-300">
          Profile
        </h2>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 space-y-12">
          <p className="text-zinc-400 max-w-3xl">
            Cloud-focused Systems Engineer with 2+ years of experience supporting
            hybrid Windows and Microsoft 365 environments. Specialized in Entra
            ID, automation, and Tier III troubleshooting.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-lavender-300/20 to-transparent" />

          <a
            href="/Alexis-Chaffin-Resume.pdf"
            download
            className="inline-block px-8 py-4 rounded-xl bg-lavender-300 text-zinc-900 font-medium"
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <Section id="contact">
      <div className="flex justify-center gap-10 py-28">
        <motion.a
          whileHover={{ scale: 1.2 }}
          href="mailto:lexie@pxedust.cc"
          aria-label="Email"
          className="text-3xl text-lavender-300"
        >
          ✉
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          href="https://www.linkedin.com/in/abchaffin"
          target="_blank"
          aria-label="LinkedIn"
          className="text-3xl text-lavender-300"
        >
          in
        </motion.a>
      </div>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-8 text-zinc-500 text-sm">
      © {new Date().getFullYear()} Lexie · Built with care
    </footer>
  );
}
