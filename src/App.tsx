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

/* ---------------- CURSOR GLOW ---------------- */

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[80px] h-[80px]
                 rounded-full bg-violet-400/20 blur-2xl z-0"
    />
  );
}

/* ---------------- FIREFLIES ---------------- */

function Fireflies() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full
                     bg-violet-300/80 blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-12, 12, -12],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- DATA ---------------- */

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

/* ---------------- APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -120]);

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen font-sans overflow-hidden">
      <Fireflies />
      <CursorGlow />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0
                   bg-[radial-gradient(circle_at_50%_20%,rgba(167,139,250,0.18),transparent_65%)] z-0"
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
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/favicon.jpg" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-wide text-violet-300">
            Alexis Chaffin
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-sm text-zinc-400">
          {["about", "projects", "skills", "resume", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover:text-violet-300 transition"
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
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I’m Lexie!
          <br />
          <span className="text-violet-300">
            Optimize ⚙️ Empower 🌟 Elevate 🌿
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Cloud engineering, automation, and operational excellence —
          designed with care for both systems and people.
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
        <h2 className="text-3xl font-semibold mb-6 text-violet-300">About Me</h2>
        <p className="text-zinc-400 leading-relaxed">
          Cloud-focused engineer with a passion for calm, reliable systems.
          When I’m not working on infrastructure or automation, you’ll
          usually find me hiking, reading, or painting.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

function Projects() {
  return (
    <section id="projects" className="py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl font-semibold mb-14 text-violet-300"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectData.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(167,139,250,0.2)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
            >
              <h3 className="text-xl mb-2">{p.title}</h3>
              <p className="text-zinc-400 mb-4">{p.description}</p>
              <span className="text-sm text-violet-300">{p.stack}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
      <h2 className="text-3xl font-semibold mb-14 text-violet-300">Skills</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <SkillBlock title="Cloud" items={["AWS", "IAM", "Monitoring", "Networking"]} />
        <SkillBlock title="Automation" items={["Terraform", "CI/CD", "Scripting"]} />
        <SkillBlock title="Reliability" items={["Observability", "Incident Response", "Optimization"]} />
      </div>
    </section>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <ul className="flex flex-wrap gap-3">
        {items.map((i) => (
          <motion.li
            key={i}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-4 py-2 rounded-full text-sm
                       bg-zinc-800 border border-zinc-700 text-zinc-200"
          >
            {i}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---------------- RESUME ---------------- */

function Resume() {
  return (
    <section id="resume" className="max-w-5xl mx-auto px-6 py-28 relative z-10">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl font-semibold mb-12 text-violet-300"
      >
        Resume
      </motion.h2>

      <motion.p variants={fadeUp} className="text-zinc-400 max-w-3xl mb-10">
        Cloud-focused systems engineer with experience supporting hybrid
        Windows and Microsoft 365 environments, identity systems,
        automation, and Tier III troubleshooting.
      </motion.p>

      <motion.a
        variants={fadeUp}
        href="/Alexis-Chaffin-Resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        className="inline-flex px-8 py-4 rounded-xl
                   bg-violet-400/90 hover:bg-violet-300
                   text-zinc-900 font-medium transition"
      >
        Download Full Resume (PDF)
      </motion.a>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section id="contact" className="py-28 text-center relative z-10">
      <div className="flex justify-center gap-10 text-3xl text-violet-300">
        <motion.a whileHover={{ scale: 1.2 }} href="mailto:lexie@pxedust.cc">
          ✉
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          href="https://www.linkedin.com/in/abchaffin"
          target="_blank"
        >
          in
        </motion.a>
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
