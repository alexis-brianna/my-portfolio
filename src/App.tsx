import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ---------------- CURSOR GLOW ---------------- */

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      animate={{
        background: `radial-gradient(
          600px at ${pos.x}px ${pos.y}px,
          rgba(16,185,129,0.12),
          transparent 80%
        )`,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
    />
  );
}

/* ---------------- FLOATING PARTICLES ---------------- */

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald-400/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 14 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- APP ---------------- */

export default function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased overflow-hidden">
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-400 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Cursor reactive glow */}
      <CursorGlow />

      {/* Ambient parallax glow */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.15),transparent_60%)] z-0"
      />

      <FloatingParticles />

      <Navbar onResume={() => setResumeOpen(true)} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Resume />
      <Contact />
      <Footer />

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar({ onResume }: { onResume: () => void }) {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive(section.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <img src="/favicon.jpg" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-wide text-emerald-300">
            Lexie.dev
          </span>
        </motion.div>

        <div className="hidden md:flex space-x-6 text-sm">
          {["about", "projects", "skills", "resume", "contact"].map((item) =>
            item === "resume" ? (
              <button
                key={item}
                onClick={onResume}
                className="text-zinc-400 hover:text-emerald-300 transition"
              >
                Resume
              </button>
            ) : (
              <a
                key={item}
                href={`#${item}`}
                className={`transition ${
                  active === item
                    ? "text-emerald-300"
                    : "text-zinc-400 hover:text-emerald-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            )
          )}
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
          <span className="text-emerald-300">
            Let's Optimize ⚙️ Empower 🌟 Elevate 🌿 Together!
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Cloud engineering, automation, and operational excellence; designed
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
          clarity, stability, and human-centered design. When I'm not nerding
          out, I enjoy hiking, painting, learning new skills, and reading.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

const projectData = [
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
    <section id="projects" className="bg-zinc-900 py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl font-semibold mb-14 text-emerald-300"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectData.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(16,185,129,0.15)",
              }}
              className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 transition"
            >
              <h3 className="text-xl font-medium mb-2">
                {project.title}
              </h3>
              <p className="text-zinc-400 mb-4">
                {project.description}
              </p>
              <span className="text-sm text-emerald-300">
                {project.stack}
              </span>
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
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl font-semibold mb-14 text-emerald-300"
      >
        Skills
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        <SkillBlock
          title="Cloud"
          items={["AWS", "IAM", "Monitoring", "Networking"]}
        />
        <SkillBlock
          title="Automation"
          items={["Terraform", "CI/CD", "Scripting"]}
        />
        <SkillBlock
          title="Reliability"
          items={[
            "Observability",
            "Incident Response",
            "Optimization",
          ]}
        />
      </div>
    </section>
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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
    >
      <h3 className="text-lg font-medium mb-4 text-zinc-100">
        {title}
      </h3>
      <ul className="space-y-2 text-zinc-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---------------- RESUME ---------------- */

function Resume() {
  return (
    <section id="resume" className="max-w-6xl mx-auto px-6 py-28 relative z-10">
      <motion.h2 variants={fadeUp} className="text-3xl mb-6 text-emerald-300">
        Resume
      </motion.h2>

      <motion.p variants={fadeUp} className="text-zinc-400 max-w-3xl">
        Cloud-focused Systems Administrator with 2+ years of experience
        supporting hybrid Windows and Microsoft 365 environments.
        Specialized in Entra ID, automation, and Tier III troubleshooting.
      </motion.p>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 py-28 text-center relative z-10">
      <motion.h2 variants={fadeUp} className="text-3xl mb-6 text-emerald-300">
        Let’s Connect
      </motion.h2>

      <div className="flex justify-center gap-4">
        <a
          href="mailto:lexie@pxedust.cc"
          className="px-8 py-4 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-zinc-900 transition"
        >
          Email Me
        </a>
        <a
          href="https://www.linkedin.com/in/abchaffin"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-xl border border-zinc-700 hover:border-emerald-300 transition"
        >
          LinkedIn
        </a>
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

/* ---------------- RESUME MODAL ---------------- */

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="bg-zinc-900 p-8 rounded-2xl text-center">
        <h3 className="text-2xl text-emerald-300 mb-4">Resume</h3>
        <a
          href="/Alexis-Chaffin-Resume.pdf"
          target="_blank"
          className="px-6 py-3 rounded-xl bg-emerald-400 text-zinc-900"
        >
          Open PDF
        </a>
        <button
          onClick={onClose}
          className="block mt-4 text-zinc-400 hover:text-zinc-200"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
