import { motion } from "framer-motion";
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

/* ---------------- APP ---------------- */

export default function App() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased selection:bg-emerald-400/20">
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
        <span className="font-semibold tracking-wide text-emerald-300">
          Lexie.dev
        </span>
        <div className="hidden md:flex space-x-6 text-sm text-zinc-400">
          {["About", "Projects", "Skills", "Resume", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-emerald-300 transition-colors"
            >
              {item}
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
    <section className="pt-36 pb-28 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/5 to-transparent pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Hi, I’m Lexie.
          <br />
          <span className="text-emerald-300">
            Optimize ⚙️ Empower 🌟 Elevate 🌿
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Cloud engineering, automation, and operational excellence — designed
          with care for both systems and people.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-zinc-900 font-medium transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-emerald-300 transition"
          >
            Let’s Connect
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-semibold mb-6 text-emerald-300">
          About Me
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          I’m a cloud-focused engineer who values clarity, stability, and
          human-centered design. I love building systems that feel quiet when
          they’re working — because that’s when everything is right.
        </p>
      </motion.div>

      <div className="mt-24 border-t border-zinc-800" />
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

const projectData = [
  {
    title: "Cloud Monitoring Dashboard",
    description:
      "Centralized observability improving alert confidence and uptime.",
    stack: "AWS · Terraform · Grafana",
  },
  {
    title: "Automated Infrastructure Platform",
    description:
      "Repeatable infrastructure workflows reducing toil and error rates.",
    stack: "Terraform · CI/CD",
  },
  {
    title: "Secure Event-Driven Pipeline",
    description:
      "Scalable, auditable pipeline built for reliability and trust.",
    stack: "Python · AWS Lambda · S3",
  },
];

function Projects() {
  return (
    <section id="projects" className="bg-zinc-900 py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-semibold mb-14 text-emerald-300"
        >
          Projects
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {projectData.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-400/40 transition"
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
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-3xl font-semibold mb-14 text-emerald-300"
      >
        Skills
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 text-zinc-400"
      >
        <SkillBlock title="Cloud" items={["AWS", "IAM", "Monitoring", "Networking"]} />
        <SkillBlock title="Automation" items={["Terraform", "CI/CD", "Scripting"]} />
        <SkillBlock title="Reliability" items={["Observability", "Incident Response", "Optimization"]} />
      </motion.div>
    </section>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
    >
      <h3 className="text-lg font-medium mb-4 text-zinc-100">
        {title}
      </h3>
      <ul className="space-y-2">
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
    <section id="resume" className="max-w-6xl mx-auto px-6 py-28">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-3xl font-semibold mb-10 text-emerald-300"
      >
        Resume
      </motion.h2>

      <motion.p variants={fadeUp} className="text-zinc-400 max-w-3xl mb-10">
        Cloud-focused Systems Administrator with 2+ years of experience
        supporting hybrid Windows and Microsoft 365 environments. Specialized
        in Entra ID, automation, and Tier III troubleshooting.
      </motion.p>

      <motion.a
        variants={fadeUp}
        href="/Alexis-Chaffin-Resume.pdf"
        target="_blank"
        className="inline-flex px-8 py-4 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-zinc-900 font-medium transition"
      >
        Download Full Resume (PDF)
      </motion.a>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 py-28 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-semibold mb-6 text-emerald-300">
          Let’s Connect
        </h2>
        <p className="text-zinc-400 mb-8">
          Interested in collaborating or just saying hi?
        </p>
        <a
          href="mailto:youremail@example.com"
          className="px-8 py-4 rounded-xl bg-emerald-400/90 hover:bg-emerald-300 text-zinc-900 font-medium transition"
        >
          Email Me
        </a>
      </motion.div>
    </section>
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
