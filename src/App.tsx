import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
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
      className="pointer-events-none fixed top-0 left-0 w-[80px] h-[80px] rounded-full bg-indigo-400/15 blur-2xl z-0"
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
          className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300/50"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            opacity: [0.3, 0.8, 0.3],
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

/* ---------------- APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -120]);

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen antialiased overflow-hidden">
      <Fireflies />
      <CursorGlow />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(165,180,252,0.12),transparent_65%)] z-0"
      />

      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Resume />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- SHARED ---------------- */

function Divider() {
  return <div className="h-px bg-zinc-800 my-24 max-w-6xl mx-auto" />;
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold tracking-wide text-indigo-300">
            Alexis Chaffin
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-sm text-zinc-400">
          {["about", "projects", "skills", "resume", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover:text-indigo-300 transition"
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
    <section className="pt-40 pb-32 text-center relative z-10">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          👋 Hi, I’m Lexie.
          <br />
          <span className="text-indigo-300">
            Optimize · Empower · Elevate
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          I am a builder, an orchestrator, and a problem-solver who believes that technology 
          should serve people; not the other way around. My career is defined by a simple mission: 
          Automate the routine to protect the critical.

        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-12">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-300">
          About Me
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Originally from the Midwest, I relocated to the Denver area in 2024.
          I’m a cloud-focused engineer who values clarity, stability, and
          human-centered design. Outside of tech, I enjoy hiking, reading,
          volunteering, and painting.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

const projectData = [
  {
    title: "Scalable AWS Architecture via Terraform",
    description:
      "Moving away from manual 'Point-and-Click' configuration to define a secure, repeatable AWS environment.",
    stack: "AWS EC2 · Terraform · GitHub · VSCode",
  },
  {
    title: "Zero-Trust Linux Hardening",
    description: "Applying automated security baselines to Red Hat Enterprise Linux. Using Ansible playbooks to enforce SSH hardening, firewall configurations, and identity registration, transforming a 'vanilla' OS into an enterprise-ready, secured node in minutes.",
    stack: "Ansible · RHEL 9 · YAML · OpenSSH · Firewalld",
  },
  {
    title: "Self-Healing Systems",
    description: "Engineering a custom deployment and remediation pipeline that turned a 4-hour manual process into a 90-minute automated success.",
    stack: "Datto RMM · Windows Configuration Designer · PowerShell · Bash",
  },
];

function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl font-semibold mb-12 text-indigo-300"
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
              y: -10,
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 22,
              mass: 0.6,
            }}
            className="relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800
                       will-change-transform
                       hover:border-indigo-400/40
                       hover:shadow-[0_0_0_1px_rgba(165,180,252,0.2),0_25px_50px_-12px_rgba(165,180,252,0.35)]"
          >
            <h3 className="text-xl mb-2">{p.title}</h3>
            <p className="text-zinc-400 mb-4">{p.description}</p>
            <span className="text-sm text-indigo-300">{p.stack}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


/* ---------------- SKILLS ---------------- */

function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-12 text-indigo-300">
        Skills
      </h2>

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
      whileHover={{
        y: -10,
        scale: 1.05,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 22,
        mass: 0.6,
      }}
      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800
                 will-change-transform
                 hover:border-indigo-400/40
                 hover:shadow-[0_0_0_1px_rgba(165,180,252,0.2),0_25px_50px_-12px_rgba(165,180,252,0.35)]"
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>

      <ul className="flex flex-wrap gap-3 text-zinc-400">
        {items.map((i) => (
          <li
            key={i}
            className="px-4 py-2 rounded-full text-sm
                       bg-zinc-900 border border-zinc-800
                       text-zinc-200"
          >
            {i}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}


/* ---------------- RESUME ---------------- */

function Resume() {
  return (
    <section
      id="resume"
      className="max-w-5xl mx-auto px-6 py-28 relative z-10"
    >
      {/* Section Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-12 text-violet-300"
      >
        Resume
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-14"
      >
        {/* Profile Header */}
        <motion.div variants={fadeUp}>
          <h3 className="text-2xl font-medium text-zinc-100">
            Cloud Systems Engineer
          </h3>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-3xl">
            Cloud-focused systems engineer with 2+ years of experience
            supporting hybrid Windows and Microsoft 365 environments.
            Specialized in identity, automation, observability, and
            Tier III troubleshooting. Passionate about building calm,
            reliable systems that quietly do their job well.
          </p>
        </motion.div>

        {/* Experience Highlights */}
        <motion.div variants={fadeUp}>
          <h4 className="text-lg font-semibold text-violet-300 mb-4">
            Experience Highlights
          </h4>
          <ul className="space-y-3 text-zinc-400 leading-relaxed">
            <li>
              • Designed and supported identity and access workflows using
              Entra ID and Azure AD
            </li>
            <li>
              • Built automation to reduce manual toil and operational risk
            </li>
            <li>
              • Led incident response and root-cause analysis for
              production issues
            </li>
            <li>
              • Improved monitoring, alert confidence, and on-call reliability
            </li>
          </ul>
        </motion.div>

        {/* Core Skills */}
        <motion.div variants={fadeUp}>
          <h4 className="text-lg font-semibold text-violet-300 mb-5">
            Core Skills
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              "AWS",
              "Entra ID",
              "Terraform",
              "CI/CD",
              "Monitoring",
              "Automation",
              "Incident Response",
              "Windows",
              "Microsoft 365",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm
                           bg-zinc-900 border border-zinc-800
                           text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 pt-6"
        >
          {/* Download PDF (reliable) */}
          <a
            href="/Alexis-Chaffin-Resume.pdf"
            download="Alexis-Chaffin-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                       bg-violet-400/90 hover:bg-violet-300
                       text-zinc-900 font-medium transition"
          >
            Download Full Resume (PDF)
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abchaffin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                       border border-zinc-700 hover:border-violet-300
                       text-zinc-100 transition"
          >
            View LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}



/* ---------------- CONTACT ---------------- */

function Contact() {
  const iconStyle = { color: "#D1D1F7" }; 

  return (
    // Added 'relative' and 'z-10' to ensure this section sits on top
    <section id="contact" className="relative z-10 py-20 text-center">
      {/* Added 'pointer-events-auto' to ensure the container allows clicks */}
      <div className="flex justify-center gap-10 text-4xl pointer-events-auto">
        
        <motion.a 
          whileHover={{ scale: 1.2 }} 
          href="mailto:lexie@pxedust.cc"
          className="cursor-pointer" // Forces the 'hand' icon to appear
        >
          <FaEnvelope style={iconStyle} />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.2 }}
          href="https://www.linkedin.com/in/abchaffin"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <FaLinkedin style={iconStyle} />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.2 }}
          href="https://github.com/alexis-brianna"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <FaGithub style={iconStyle} />
        </motion.a>

      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-8 text-zinc-500 text-sm">
      © {new Date().getFullYear()} Lexie · Built with 💜 & 🧋
    </footer>
  );
}
