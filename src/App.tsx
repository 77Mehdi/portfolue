import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent, type WheelEvent } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bot,
  CalendarCheck,
  Code2,
  Database,
  Download,
  Eye,
  ExternalLink,
  FileText,
  GraduationCap,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  Rocket,
  ServerCog,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Project = {
  title: string;
  img: string;
  description: string;
  stack: string[];
  accent: string;
  category: "Frontend" | "Full Stack" | "Backend";
  status: string;
  metric: string;
  icon: typeof Code2;
  repoUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

type GithubProject = {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage?: string | null;
  language: string | null;
  updatedAt: string;
};

type ProjectOverride = Partial<Omit<Project, "title" | "repoUrl">> & {
  title?: string;
};

const githubProjects: GithubProject[] = [
  {
    name: "spring-boot-Premier-L",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/spring-boot-Premier-L",
    language: "TypeScript",
    updatedAt: "2026-07-31T19:53:42Z",
  },
  {
    name: "CV-Generator-web-application",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/CV-Generator-web-application",
    homepage: "https://cv-generator-web-application-murex.vercel.app",
    language: "JavaScript",
    updatedAt: "2026-05-01T17:19:30Z",
  },
  {
    name: "medical-App",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/medical-App",
    homepage: "https://medical-app-rho-indol.vercel.app",
    language: "JavaScript",
    updatedAt: "2026-01-06T20:20:22Z",
  },
  {
    name: "Code-Challenge",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/Code-Challenge",
    homepage: "https://code-challenge-lilac.vercel.app",
    language: "JavaScript",
    updatedAt: "2025-06-09T15:43:52Z",
  },
  {
    name: "NextJS-Apple-Books",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/NextJS-Apple-Books",
    language: "JavaScript",
    updatedAt: "2025-04-30T09:22:00Z",
  },
  {
    name: "MERN-chat-app",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/MERN-chat-app",
    language: "JavaScript",
    updatedAt: "2025-04-30T09:19:41Z",
  },
  {
    name: "amazon-stor-test-1",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/amazon-stor-test-1",
    language: "JavaScript",
    updatedAt: "2025-04-30T09:15:15Z",
  },
  {
    name: "Formation-Reservation-Platform",
    description:
      "A dynamic web application for managing professional formations (courses), built with PHP, MySQL, HTML, CSS (Bootstrap), and JavaScript. It allows users to explore available formations, register for them, and manage reservations through a friendly and responsive interface",
    htmlUrl: "https://github.com/77Mehdi/Formation-Reservation-Platform",
    language: "PHP",
    updatedAt: "2025-04-14T01:03:24Z",
  },
  {
    name: "Ecommerc-App-react-laravel",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/Ecommerc-App-react-laravel",
    language: "PHP",
    updatedAt: "2025-01-02T23:03:27Z",
  },
  {
    name: "Stage-project",
    description: null,
    htmlUrl: "https://github.com/77Mehdi/Stage-project",
    language: "PHP",
    updatedAt: "2024-06-10T10:14:10Z",
  },
];

const projectOverrides: Record<string, ProjectOverride> = {
  "spring-boot-Premier-L": {
    title: "Premier League App",
    img: "/images/Premier-League-App.png",
    description: "Football data platform combining a Spring Boot API with a fast React interface for league insights.",
    stack: ["Spring Boot", "React", "TypeScript"],
    category: "Full Stack",
    status: "API powered",
    metric: "League data",
    icon: Trophy,
    featured: true,
  },
  "CV-Generator-web-application": {
    title: "CV Generator Web App",
    img: "/images/cv-Generator.png",
    description: "Professional resume builder with form-driven editing, live preview, export-ready layouts, and clean UX.",
    stack: ["React", "Node.js", "PDF"],
    category: "Backend",
    status: "Live product",
    metric: "Vercel live",
    icon: FileText,
    featured: true,
  },
  "medical-App": {
    title: "Medical App",
    img: "/images/medical-App.png",
    description: "Healthcare booking interface for browsing doctors, managing appointment flows, and launching fast on Vercel.",
    stack: ["React", "Node.js", "MongoDB"],
    category: "Full Stack",
    status: "Booking flow",
    metric: "Live demo",
    icon: Stethoscope,
    featured: true,
  },
  "Code-Challenge": {
    img: "/images/Code-Challenge.png",
    description: "Interactive challenge interface focused on clean UI states, reusable components, and deployed front-end polish.",
    stack: ["React", "JavaScript", "Vercel"],
    category: "Frontend",
    status: "Live challenge",
    metric: "Frontend",
    icon: Code2,
  },
  "NextJS-Apple-Books": {
    title: "NextJS Apple Books",
    img: "/images/apple-books.png",
    description: "A refined book discovery interface inspired by Apple-level polish and built with modern Next.js patterns.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    category: "Frontend",
    status: "Next.js UI",
    metric: "Book app",
    icon: BookOpen,
    featured: true,
  },
  "MERN-chat-app": {
    title: "MERN Chat App",
    img: "/images/chat-app.png",
    description: "Realtime chat product with authentication, conversation views, message states, and MongoDB persistence.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    category: "Full Stack",
    status: "Realtime flow",
    metric: "MERN",
    icon: MessageCircle,
    featured: true,
  },
  "amazon-stor-test-1": {
    title: "Amazon Store Test",
    img: "/images/amazon-stor-test-1.png",
    description: "Ecommerce storefront experiment with product browsing, commerce-focused UI structure, and responsive cards.",
    stack: ["React", "JavaScript", "Ecommerce"],
    category: "Frontend",
    status: "Storefront",
    metric: "Shop UI",
    icon: ShoppingBag,
  },
  "Formation-Reservation-Platform": {
    img: "/images/Formation-Reservation-Platform.png",
    stack: ["PHP", "MySQL", "Bootstrap"],
    category: "Full Stack",
    status: "Reservation app",
    metric: "Courses",
    icon: GraduationCap,
  },
  "Stage-project": {
    img: "/images/Stage-project.png",
    description: "Internship-stage web platform built around pragmatic PHP application workflows and database-backed screens.",
    stack: ["PHP", "MySQL", "JavaScript"],
    category: "Backend",
    status: "Stage build",
    metric: "PHP",
    icon: Layers3,
  },
};

const accentPool = [
  "from-cyan-400 to-blue-500",
  "from-violet-400 to-fuchsia-500",
  "from-emerald-300 to-cyan-400",
  "from-blue-400 to-violet-500",
  "from-fuchsia-400 to-cyan-400",
  "from-sky-300 to-indigo-500",
];

const languageStacks: Record<string, string[]> = {
  JavaScript: ["JavaScript", "React", "Node.js"],
  TypeScript: ["TypeScript", "React", "API"],
  PHP: ["PHP", "Laravel", "MySQL"],
  Python: ["Python", "Django", "API"],
};

function titleFromRepoName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bApi\b/g, "API")
    .replace(/\bCrud\b/g, "CRUD")
    .replace(/\bMern\b/g, "MERN");
}

function categoryFromStack(stack: string[]): Project["category"] {
  const backendSignals = ["Laravel", "PHP", "Django", "Python", "Spring Boot", "MySQL", "API"];
  const frontendSignals = ["React", "Next.js", "Tailwind CSS", "Vercel"];
  const hasBackend = stack.some((tech) => backendSignals.includes(tech));
  const hasFrontend = stack.some((tech) => frontendSignals.includes(tech));

  if (hasBackend && hasFrontend) return "Full Stack";
  if (hasBackend) return "Backend";
  return "Frontend";
}

function createProject(repo: GithubProject, index: number): Project {
  const override = projectOverrides[repo.name] ?? {};
  const stack = override.stack ?? languageStacks[repo.language ?? ""] ?? [repo.language ?? "Web App"];
  const img = override.img ?? `/images/${repo.name}.png`;
  const title = override.title ?? titleFromRepoName(repo.name);

  return {
    title,
    img,
    description:
      override.description ??
      repo.description ??
      `${title} is a public ${repo.language ?? "web"} project from my GitHub portfolio, shaped for practical product workflows and clean implementation.`,
    stack,
    accent: override.accent ?? accentPool[index % accentPool.length],
    category: override.category ?? categoryFromStack(stack),
    status: override.status ?? "GitHub project",
    metric: override.metric ?? repo.language ?? "Code",
    icon: override.icon ?? Code2,
    repoUrl: repo.htmlUrl,
    liveUrl: override.liveUrl ?? repo.homepage ?? undefined,
    featured: override.featured ?? Boolean(repo.homepage),
  };
}

const projects: Project[] = githubProjects.map(createProject);

const skillGroups = [
  { label: "Frontend", value: 94, icon: Code2, items: "React, Next.js, Tailwind, TypeScript" },
  { label: "Backend", value: 88, icon: ServerCog, items: "Node.js, Express, Laravel, Spring Boot" },
  { label: "Databases", value: 84, icon: Database, items: "MongoDB, PostgreSQL, MySQL" },
  { label: "Architecture", value: 80, icon: Layers3, items: "APIs, auth, dashboards, deployment" },
];

const navItems = ["About", "Projects", "Contact"];
const filters = ["All", "Frontend", "Full Stack", "Backend"] as const;
const featureSignals = [
  { label: "Fast delivery", value: "3+ years", icon: Rocket },
  { label: "Production mindset", value: "Clean code", icon: Sparkles },
  { label: "Full stack range", value: "API to UI", icon: Layers3 },
  { label: "Reliable planning", value: "Launch ready", icon: CalendarCheck },
];

function useTyping(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const delay = deleting ? 44 : 82;
    const timer = window.setTimeout(() => {
      if (!deleting && charIndex === current.length) {
        window.setTimeout(() => setDeleting(true), 850);
        return;
      }

      if (deleting && charIndex === 0) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setCharIndex((index) => index + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words]);

  return words[wordIndex].slice(0, charIndex);
}

function App() {
  const [loading, setLoading] = useState(true);
  const typedText = useTyping(useMemo(() => ["building immersive interfaces", "shipping full stack products", "turning ideas into live systems"], []));
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 22, stiffness: 220 });
  const smoothY = useSpring(cursorY, { damping: 22, stiffness: 220 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);

    const move = (event: globalThis.MouseEvent) => {
      cursorX.set(event.clientX - 160);
      cursorY.set(event.clientY - 160);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY]);

  return (
    <main className="min-h-screen overflow-hidden bg-void font-inter text-slate-100">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-void"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative h-28 w-28 rounded-full border border-cyan-300/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute inset-3 rounded-full border border-violet-400/40" />
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-glow" />
            </motion.div>
            <p className="absolute mt-44 font-orbitron text-xs uppercase tracking-[0.45em] text-cyan-200">Initializing 2050 UI</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed z-40 hidden h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl lg:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <AnimatedBackground />
      <Navigation />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-20 pt-28 sm:px-8 lg:px-10" id="home">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100 shadow-glow backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Morocco based digital builder
            </div>
            <h1 className="font-orbitron text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient">El Mehdi</span>
            </h1>
            <p className="mt-5 text-2xl font-semibold text-cyan-100 sm:text-3xl">Full Stack Web Developer</p>
            <p className="mt-4 min-h-8 max-w-2xl text-lg text-slate-300">
              I specialize in <span className="text-cyan-200">{typedText}</span>
              <span className="ml-1 inline-block h-6 w-0.5 translate-y-1 bg-cyan-300" />
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a className="neon-button group" href="#projects">
                View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a className="ghost-button" href="/resume.pdf" target="_blank" rel="noreferrer">
                View Resume <Eye className="h-4 w-4" />
              </a>
              <a className="ghost-button" href="/resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
              <a className="ghost-button" href="#contact">
                Contact <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {["3+ Years", "8 Projects", "Full Stack"].map((item) => (
                <div key={item} className="glass-panel px-4 py-4 text-center">
                  <p className="font-orbitron text-lg text-white">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[520px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9 }}
          >
            <HeroThreeScene />
            <motion.div className="absolute right-0 top-0 hidden rounded-full border border-cyan-200/20 px-4 py-2 font-orbitron text-xs uppercase tracking-[0.24em] text-cyan-100 backdrop-blur md:flex">
              3D interface online
            </motion.div>
            <motion.div
              className="holo-card absolute bottom-0 left-0 w-full max-w-md p-6"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-orbitron text-sm uppercase tracking-[0.25em] text-cyan-200">Developer OS</span>
                <Bot className="h-6 w-6 text-violet-200" />
              </div>
              <div className="space-y-4">
                {skillGroups.map((skill) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-100">
                        <skill.icon className="h-4 w-4 text-cyan-200" /> {skill.label}
                      </span>
                      <span className="font-orbitron text-cyan-200">{skill.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FeatureSignals />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

function FeatureSignals() {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-3 px-5 pb-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
      {featureSignals.map((signal, index) => (
        <motion.div
          key={signal.label}
          className="signal-tile"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 }}
          whileHover={{ y: -6 }}
        >
          <signal.icon className="h-5 w-5 text-cyan-200" />
          <div>
            <p className="font-orbitron text-sm text-white">{signal.value}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{signal.label}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

function HeroThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup = () => { };
    let disposed = false;
    let frame = 0;

    import("three").then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const coreGeometry = new THREE.IcosahedronGeometry(1.35, 3);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.55,
        metalness: 0.45,
        roughness: 0.18,
        wireframe: true,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      scene.add(core);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.65 });
      const rings = [1.95, 2.35, 2.78].map((radius, index) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 16, 140), ringMaterial.clone());
        ring.rotation.x = Math.PI / (2.5 + index * 0.35);
        ring.rotation.y = index * 0.7;
        scene.add(ring);
        return ring;
      });

      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 180;
      const positions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        positions[index * 3] = (Math.random() - 0.5) * 7;
        positions[index * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[index * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        particlesGeometry,
        new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.025, transparent: true, opacity: 0.85 }),
      );
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const cyanLight = new THREE.PointLight(0x22d3ee, 2.4, 10);
      cyanLight.position.set(2.5, 2.2, 3);
      scene.add(cyanLight);
      const violetLight = new THREE.PointLight(0xa855f7, 2.1, 10);
      violetLight.position.set(-2.8, -1.5, 2);
      scene.add(violetLight);

      const resize = () => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const { width, height } = parent.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        core.rotation.x = time * 0.35;
        core.rotation.y = time * 0.48;
        rings.forEach((ring, index) => {
          ring.rotation.z = time * (0.2 + index * 0.12);
          ring.rotation.y += 0.002 + index * 0.001;
        });
        particles.rotation.y = time * 0.04;
        particles.rotation.x = Math.sin(time * 0.35) * 0.08;
        renderer.render(scene, camera);
      };

      resize();
      animate();
      window.addEventListener("resize", resize);

      cleanup = () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(frame);
        coreGeometry.dispose();
        coreMaterial.dispose();
        rings.forEach((ring) => {
          ring.geometry.dispose();
          ring.material.dispose();
        });
        particlesGeometry.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="absolute inset-0" data-three-hero>
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Animated 3D developer interface" />
      <div className="pointer-events-none absolute inset-x-10 bottom-20 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15" />
    </div>
  );
}

function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-void/55 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a className="font-orbitron text-lg font-black text-white" href="#home">
          EL<span className="text-cyan-300">GHERYB</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item} className="nav-link" href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
          <Eye className="h-4 w-4" /> Resume
        </a>
      </nav>
    </header>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-radial-grid" />
      <div className="absolute inset-0 cyber-grid opacity-35" />
      {Array.from({ length: 24 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/70"
          style={{ left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%` }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * 0.12 }}
        />
      ))}
    </div>
  );
}

function AboutSection() {
  return (
    <section className="section-shell" id="about">
      <motion.div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
        <div>
          <p className="eyebrow">About</p>
          <h2 className="section-title">A developer tuned for fast, elegant products.</h2>
          <p className="mt-5 text-slate-300">
            I'm El Mehdi, a full stack web developer from Morocco with 3+ years of experience building clean interfaces,
            reliable APIs, and practical digital products. I enjoy turning ambitious ideas into systems that feel fast,
            polished, and ready for real users.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((skill) => (
            <motion.div key={skill.label} className="glass-panel p-5" whileHover={{ y: -8, scale: 1.02 }}>
              <skill.icon className="mb-5 h-8 w-8 text-cyan-200" />
              <h3 className="font-orbitron text-lg text-white">{skill.label}</h3>
              <p className="mt-3 text-sm text-slate-300">{skill.items}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [activeTech, setActiveTech] = useState("All Tech");
  const techFilters = useMemo(
    () => ["All Tech", ...Array.from(new Set(projects.flatMap((project) => project.stack))).slice(0, 8)],
    [],
  );
  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory = activeFilter === "All" || project.category === activeFilter;
        const matchesTech = activeTech === "All Tech" || project.stack.includes(activeTech);
        return matchesCategory && matchesTech;
      }),
    [activeFilter, activeTech],
  );

  return (
    <section className="section-shell" id="projects">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Selected builds from the command deck.</h2>
        </div>
        <p className="max-w-md text-slate-300">Real GitHub projects in a self-scrolling carousel, with local artwork matched by repository name and live demos surfaced when available.</p>
      </div>
      <div className="mb-7 space-y-3">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? "filter-chip-active" : ""}`}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {techFilters.map((tech) => (
            <button
              key={tech}
              className={`filter-chip filter-chip-compact ${activeTech === tech ? "filter-chip-active" : ""}`}
              type="button"
              onClick={() => setActiveTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      <ProjectCarousel projects={visibleProjects} />
    </section>
  );
}

function ProjectCarousel({ projects: carouselProjects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const dragOffsetStartRef = useRef(0);
  const [isJumping, setIsJumping] = useState(false);
  const count = carouselProjects.length;
  const loopItems = count > 1 ? [...carouselProjects, ...carouselProjects] : carouselProjects;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || !count) return;
      const items = track.querySelectorAll<HTMLElement>("[data-marquee-item]");
      if (items.length < count) return;
      const first = items[0];
      const afterSet = items[count];
      if (first && afterSet) {
        setWidthRef.current = afterSet.offsetLeft - first.offsetLeft;
      } else {
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
        let width = 0;
        for (let i = 0; i < count; i += 1) {
          width += items[i].offsetWidth;
        }
        width += gap * Math.max(count - 1, 0);
        setWidthRef.current = width;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count, carouselProjects]);

  const applyTransform = () => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = setWidthRef.current;

    if (setWidth > 0) {
      if (offsetRef.current <= -setWidth) offsetRef.current += setWidth;
      if (offsetRef.current > 0) offsetRef.current -= setWidth;
    }

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

    if (setWidth > 0 && count > 0) {
      const cardSpan = setWidth / count;
      const normalized = ((-offsetRef.current % setWidth) + setWidth) % setWidth;
      const nextIndex = Math.round(normalized / cardSpan) % count;
      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    }
  };

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();
    const speedPxPerSecond = 42;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (dragStart === null && count > 1) {
        offsetRef.current -= speedPxPerSecond * delta;
      }

      applyTransform();
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, dragStart]);

  useEffect(() => {
    offsetRef.current = 0;
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, [carouselProjects]);

  const jumpToIndex = (index: number) => {
    if (!count || setWidthRef.current <= 0) return;
    const cardSpan = setWidthRef.current / count;
    setIsJumping(true);
    offsetRef.current = -cardSpan * index;
    activeIndexRef.current = index;
    setActiveIndex(index);
    applyTransform();
    window.setTimeout(() => setIsJumping(false), 500);
  };

  const rotateByProject = (direction: "left" | "right") => {
    if (!count || setWidthRef.current <= 0) return;
    const cardSpan = setWidthRef.current / count;
    setIsJumping(true);
    offsetRef.current += direction === "left" ? cardSpan : -cardSpan;
    applyTransform();
    window.setTimeout(() => setIsJumping(false), 500);
  };

  const DRAG_THRESHOLD = 6;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    dragOffsetStartRef.current = offsetRef.current;
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const delta = event.clientX - dragStart;

    if (!hasDraggedRef.current) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      hasDraggedRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    offsetRef.current = dragOffsetStartRef.current + delta;
    applyTransform();
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    setDragStart(null);
    if (hasDraggedRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (hasDraggedRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!count) return;
    offsetRef.current -= event.deltaX + event.deltaY * 0.5;
    applyTransform();
  };

  return (
    <div className="project-carousel">

      <div
        className="project-marquee-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={handleClickCapture}
        onWheel={handleWheel}
      >
        <div className={`project-marquee-track ${isJumping ? "project-marquee-track-jumping" : ""}`} ref={trackRef}>
          {loopItems.map((project, index) => (
            <div className="project-marquee-item" data-marquee-item key={`${project.title}-${index}`}>
              <ProjectCard project={project} index={index % count} isActive={(index % count) === activeIndex} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots" aria-label="Project carousel position">
        {carouselProjects.map((project, index) => (
          <button
            key={project.title}
            className={`carousel-dot ${activeIndex === index ? "carousel-dot-active" : ""}`}
            type="button"
            aria-label={`Go to ${project.title}`}
            onClick={() => jumpToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isActive }: { project: Project; index: number; isActive: boolean }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [imageSrc, setImageSrc] = useState(project.img);

  useEffect(() => {
    setImageSrc(project.img);
  }, [project.img]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -8, rotateY: x * 10 });
  };

  return (
    <motion.article
      className={`project-card group ${isActive ? "project-card-active" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{
        opacity: { delay: index * 0.05 },
        rotateX: { duration: 0.18 },
        rotateY: { duration: 0.18 },
      }}
      whileHover={{ y: -13, scale: 1.035 }}
      style={{ transformPerspective: 1000 }}
    >
      <div className={`project-visual bg-gradient-to-br ${project.accent}`}>
        <img
          className="project-image"
          src={imageSrc}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setImageSrc("/images/project-placeholder.svg")}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.12),transparent_34%,rgba(0,0,0,.45))]" />
        <div className="project-image-chip">
          <project.icon className="h-4 w-4" />
          {project.featured ? "Featured" : project.category}
        </div>
        <span className="project-scanline" />
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="status-chip"><Activity className="h-3.5 w-3.5" /> {project.status}</span>
          <span className="metric-chip">{project.metric}</span>
        </div>
        <h3 className="font-orbitron text-lg text-white">{project.title}</h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-slate-300">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className={`mt-6 grid gap-3 ${project.liveUrl ? "grid-cols-2" : "grid-cols-1"}`}>
          {project.liveUrl && (
            <a className="card-action" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          <a className="card-action" href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
            <Github className="h-4 w-4" /> View Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ContactSection() {
  return (
    <section className="section-shell pb-24" id="contact">
      <motion.div className="contact-band" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Ready to build something sharp?</h2>
        <p className="mt-4 max-w-2xl text-slate-300">Reach me for full stack projects, portfolio collaborations, dashboards, landing pages, and production web apps.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a className="contact-link" href="mailto:elmehdielgheyb@gmail.com">
            <Mail className="h-5 w-5" /> elmehdielgheyb@gmail.com
          </a>
          <a className="contact-link" href="https://github.com/77Mehdi" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a className="contact-link" href="https://linkedin.com/in/elmehdi-elgheryb/" target="_blank" rel="noreferrer">
            <Linkedin className="h-5 w-5" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default App;
