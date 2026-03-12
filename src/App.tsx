/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  ArrowUpRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink,
  Layers,
  Palette,
  MousePointer2,
  Sparkles,
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  Sun,
  Moon,
  Zap,
  Search,
  Target,
  Code,
  Rocket
} from 'lucide-react';

// --- Theme Context ---
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-zinc-950 text-white'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// --- Types ---
interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  role: string;
  tools: string[];
  gallery?: string[];
  link?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "subtrack",
    title: "SubTrack",
    category: "SaaS Dashboard",
    image: "/image/subtrack-hero.png",
    description: "A high-performance subscription management platform for modern SaaS businesses.",
    year: "2024",
    fullDescription: "SubTrack is a comprehensive dashboard designed to give SaaS founders and operators real-time insights into their business health. From MRR tracking to churn analysis, it provides a bird's-eye view of all critical subscription metrics.",
    challenge: "The main challenge was presenting complex financial data in a way that is both visually appealing and immediately actionable. We needed to balance high-level trends with granular customer details.",
    solution: "We developed a modular grid system that prioritizes key KPIs while allowing users to dive deep into specific data points. The use of vibrant, color-coded charts helps in quick pattern recognition.",
    role: "Lead Product Designer",
    tools: ["React", "Tailwind CSS", "Recharts", "Lucide"],
    link: "https://subtrack.example.com",
    gallery: [
      "/image/subtrack-dashboard.jpg",
      "/image/subtrack-customers.jpg",
      "/image/subtrack-settings.jpg"
    ]
  },
  {
    id: 2,
    slug: "aura-marketplace",
    title: "Aura Marketplace",
    category: "UX Research",
    image: "https://picsum.photos/seed/aura/1200/800",
    description: "Reimagining the digital art marketplace with a focus on accessibility and creator tools.",
    year: "2023",
    fullDescription: "Aura is a marketplace designed for the next generation of digital creators. It prioritizes ease of use for artists who may not be tech-savvy, providing them with powerful tools to manage their portfolios and sales.",
    challenge: "Existing marketplaces were often cluttered and intimidating for new users. We needed to simplify the onboarding process without sacrificing the depth of functionality required by professional artists.",
    solution: "Through extensive UX research, we identified key friction points and redesigned the dashboard to be modular. Users can now customize their workspace based on their specific needs.",
    role: "UX Researcher & Designer",
    tools: ["Figma", "Framer", "Blender"],
    link: "https://aura.example.com",
    gallery: [
      "/image/subtrack-dashboard.jpg",
      "/image/subtrack-customers.jpg",
      "/image/subtrack-settings.jpg"
    ]
  },
  {
    id: 3,
    slug: "nexus-os",
    title: "Nexus OS",
    category: "Interface Design",
    image: "https://picsum.photos/seed/nexus/1200/800",
    description: "A futuristic operating system concept for spatial computing and AR environments.",
    year: "2023",
    fullDescription: "Nexus OS explores the boundaries of spatial computing. It's a conceptual operating system designed specifically for augmented reality headsets, focusing on hand-tracking gestures and 3D window management.",
    challenge: "Designing for 3D space requires a complete rethink of traditional 2D UI patterns. We had to account for depth, lighting, and physical ergonomics in a purely digital environment.",
    solution: "We developed a 'Z-axis first' design language where information is layered based on priority and distance. Interactions are triggered by natural micro-gestures, reducing arm fatigue.",
    role: "Visual & Interaction Designer",
    tools: ["Blender", "Figma", "Framer"],
    link: "https://nexus.example.com"
  },
  {
    id: 4,
    slug: "verve-mobile",
    title: "Verve Mobile",
    category: "Mobile App",
    image: "https://picsum.photos/seed/verve/1200/800",
    description: "A hyper-local delivery app that optimizes routes for sustainable urban logistics.",
    year: "2022",
    fullDescription: "Verve is a logistics platform aimed at reducing the carbon footprint of last-mile deliveries in dense urban areas. It connects local businesses with a fleet of electric bike couriers.",
    challenge: "The main hurdle was creating a real-time routing engine that could handle the unpredictability of city traffic while maintaining high efficiency for couriers.",
    solution: "We built a courier-facing app that uses predictive AI to suggest the most efficient paths. The UI is designed for high-glanceability, allowing couriers to stay focused on the road.",
    role: "Mobile Product Designer",
    tools: ["Figma", "Framer", "Blender"],
    link: "https://verve.example.com"
  },
  {
    id: 5,
    slug: "eco-track",
    title: "EcoTrack",
    category: "Sustainability",
    image: "https://picsum.photos/seed/eco/1200/800",
    description: "A personal carbon footprint tracker with actionable insights.",
    year: "2022",
    fullDescription: "EcoTrack helps individuals understand their environmental impact by tracking daily activities and providing personalized recommendations for reduction.",
    challenge: "Making data entry effortless while maintaining accuracy was the biggest hurdle.",
    solution: "We integrated with banking APIs and utility providers to automate most of the tracking.",
    role: "Full Stack Designer",
    tools: ["Figma", "Framer", "Blender"],
    link: "https://ecotrack.example.com"
  },
  {
    id: 6,
    slug: "zen-space",
    title: "ZenSpace",
    category: "Interior Design App",
    image: "https://picsum.photos/seed/zen/1200/800",
    description: "An AR-powered app for visualizing minimalist interior designs.",
    year: "2021",
    fullDescription: "ZenSpace allows users to preview minimalist furniture and layouts in their actual rooms using advanced AR technology.",
    challenge: "Ensuring realistic lighting and shadows in the AR view.",
    solution: "We implemented a custom shader system that samples the real-world environment lighting.",
    role: "Lead Designer",
    tools: ["Blender", "Figma", "Framer"],
    link: "https://zenspace.example.com"
  }
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vaibhav-srivastava-811208225/' },
  { name: 'X', url: 'https://x.com/VaibhavSri15070' },
  { name: 'GitHub', url: 'https://github.com/vaibhav2067' },
  { name: 'Dribbble', url: 'https://dribbble.com/crazy_sword' },
  { name: 'Behance', url: 'https://www.behance.net/vaibhavsrivast48' }
];

const SERVICES = [
  {
    icon: <MousePointer2 className="w-6 h-6" />,
    title: "UX Strategy",
    description: "Defining the roadmap for digital products through deep user research and competitive analysis."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Visual Design",
    description: "Crafting beautiful, high-fidelity interfaces that align with brand identity and user needs."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Prototyping",
    description: "Building interactive prototypes to validate ideas and test usability before development."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Design Systems",
    description: "Creating scalable and consistent component libraries for long-term product growth."
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-black z-[60] origin-left"
      style={{ scaleX }}
    />
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Process', href: '/process' },
    { name: 'Contact', href: '/contact' },
  ];

  const themeIcons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled || !isHomePage 
        ? theme === 'light' ? 'bg-white/80 backdrop-blur-md py-4' : 'bg-black/40 backdrop-blur-md py-4'
        : 'bg-transparent py-6'
    }`}>
      <motion.div 
        layoutId="nav-border"
        className={`absolute bottom-0 left-0 right-0 h-[1px] ${theme === 'light' ? 'bg-black/5' : 'bg-white/5'}`}
      />
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <motion.div 
            layoutId="nav-logo"
            className="text-xl font-bold tracking-tighter"
          >
            VAIBHAV<span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}> STUDIO</span>
          </motion.div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`text-sm font-medium transition-colors ${theme === 'light' ? 'hover:text-zinc-500' : 'hover:text-zinc-300'}`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className={`flex items-center gap-1 p-1 rounded-full border ${theme === 'light' ? 'border-black/10 bg-zinc-50' : 'border-white/10 bg-white/5'}`}>
            {(['light', 'dark'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-1.5 rounded-full transition-all ${theme === t ? (theme === 'light' ? 'bg-black text-white' : 'bg-white text-black') : 'hover:opacity-50'}`}
                title={`${t.charAt(0).toUpperCase() + t.slice(1)} Theme`}
              >
                {themeIcons[t]}
              </button>
            ))}
          </div>

          {location.pathname !== '/contact' && (
            <button 
              onClick={() => navigate('/contact')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'}`}
            >
              Let's Talk
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-full border ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}
          >
            {themeIcons[theme]}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden ${
              theme === 'light' ? 'bg-white border-black/5' : 'bg-zinc-900 border-white/5'
            }`}
          >
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                navigate('/contact');
                setIsOpen(false);
              }}
              className={`mt-4 w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number; key?: React.Key }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
        <motion.img 
          style={{ y, scale }}
          src={project.image} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>{project.category} — {project.year}</p>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  return (
    <>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.03,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const aboutImageY = useTransform(aboutScroll, [0, 1], [100, -100]);

  return (
    <main className="relative">
      {/* Background Grid */}
      <div className={`fixed inset-0 z-0 pointer-events-none opacity-[0.03] ${theme === 'light' ? 'invert' : ''}`} 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 md:pt-40 pb-20 px-4 md:px-6 min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Animated Floating Orb */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 right-[5%] md:right-[10%] w-48 h-48 md:w-64 md:h-64 rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-20 ${theme === 'light' ? 'bg-zinc-400' : 'bg-indigo-500'}`}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className={`h-[1px] w-8 md:w-12 ${theme === 'light' ? 'bg-black' : 'bg-white'}`} />
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Based in India</span>
            </div>

            <h1 className="text-[14vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter mb-8 md:mb-12">
              <AnimatedText text="CRAFTING" delay={0.2} /> <br />
              <span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}>
                <AnimatedText text="FUTURE" delay={0.4} />
              </span> <br />
              <AnimatedText text="BRANDS" delay={0.6} />
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
              <p className={`text-lg md:text-2xl leading-relaxed max-w-xl ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Passionate UI/UX Designer & 3D Artist. I specialize in building immersive digital experiences that help new brands stand out and grow.
              </p>
              <div className="flex flex-col gap-6 items-start md:items-end">
                <div className="flex gap-4 text-left md:text-right">
                  <div className="text-sm">
                    <p className="font-bold">Available for new projects</p>
                    <p className={theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}>Let's build something together</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/work')}
                  className={`w-full md:w-fit px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-3 group ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'}`}
                >
                  Explore Work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        
      </section>

      {/* Work Section */}
      <section id="work" className={`py-16 md:py-20 px-4 md:px-6 transition-colors ${theme === 'light' ? 'bg-zinc-50' : 'bg-black/20'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
          >
            <div>
              <h2 className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-4 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Selected Work</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Case Studies</h3>
            </div>
            <button 
              onClick={() => navigate('/work')}
              className="flex items-center gap-2 font-medium hover:gap-4 transition-all group text-sm md:text-base"
            >
              View All Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
            {PROJECTS.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-4 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Expertise</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">
                Modern tools for modern problems.
              </h3>
              <p className={`text-lg md:text-xl leading-relaxed mb-8 md:mb-12 ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                I use Figma for precision, Framer for interaction, and Blender for depth. A complete toolkit to bring your vision to life.
              </p>
              <button 
                onClick={() => navigate('/process')}
                className={`w-full md:w-fit px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'}`}
              >
                View My Process <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 md:p-8 rounded-3xl border transition-colors ${theme === 'light' ? 'border-black/5 hover:border-black/10' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 md:mb-6 ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
                    {service.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{service.title}</h4>
                  <p className={`text-sm md:text-base leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className={`py-16 md:py-20 px-4 md:px-6 overflow-hidden transition-colors ${theme === 'light' ? 'bg-black text-white' : 'bg-white/5 text-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <motion.img 
                style={{ y: aboutImageY }}
                src="https://picsum.photos/seed/designer/1000/1000" 
                alt="Vaibhav" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-2 md:mb-4 ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>About Me</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8">
                Turning ideas into interactive reality.
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-300'}`}>
                I'm a designer who loves the intersection of aesthetics and functionality. My goal is to help businesses create digital products that aren't just beautiful, but also highly effective.
              </p>
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                <div>
                  <p className="text-2xl md:text-3xl font-bold mb-1">Figma + Framer + Blender</p>
                  <p className={`text-sm md:text-base ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>My Core Stack</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Get in touch</h2>
            <h3 
              onClick={() => navigate('/contact')}
              className={`text-[7vw] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-8 md:mb-12 transition-colors cursor-pointer break-all leading-[0.9] ${theme === 'light' ? 'hover:text-zinc-400' : 'hover:text-zinc-500'}`}
            >
              VAIBHAV06734<br className="hidden sm:block" />@GMAIL.COM
            </h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-12">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'light' ? 'hover:text-zinc-500' : 'hover:text-zinc-400'}`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const ContactPage = () => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error('Google Apps Script URL is not configured. Please add VITE_GOOGLE_APPS_SCRIPT_URL to your secrets.');
      }

      // Using URLSearchParams is often more reliable for Apps Script 'no-cors' requests
      const params = new URLSearchParams();
      params.append('name', formState.name);
      params.append('email', formState.email);
      params.append('subject', formState.subject);
      params.append('message', formState.message);

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Since we use 'no-cors', we can't check response.ok. 
      // We assume success if the fetch doesn't throw.
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-32 pb-16 md:pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column: Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                Let's build <br />
                <span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}>something great.</span>
              </h1>
              <p className={`text-xl md:text-2xl leading-relaxed mb-12 max-w-md ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Have a project in mind? Or just want to say hi? I'm always open to new opportunities and collaborations.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Email</h3>
                  <a href="mailto:vaibhav06734@gmail.com" className="text-xl md:text-2xl font-medium hover:opacity-50 transition-opacity">
                    vaibhav06734@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Location</h3>
                  <p className="text-xl md:text-2xl font-medium">Remote / Worldwide</p>
                </div>
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Socials</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
                    {SOCIAL_LINKS.map((social) => (
                      <a 
                        key={social.name}
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold uppercase tracking-widest transition-colors ${theme === 'light' ? 'hover:text-zinc-500' : 'hover:text-zinc-400'}`}
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 md:p-10 rounded-3xl border ${theme === 'light' ? 'border-black/5 bg-zinc-50' : 'border-white/5 bg-white/5'}`}
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <Sparkles className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className={`text-lg max-w-xs mx-auto ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Thanks for reaching out, Vaibhav! I'll get back to you at <span className="font-bold">vaibhav06734@gmail.com</span> shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-10 px-8 py-3 rounded-full border border-zinc-200 dark:border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
                    <input 
                      required
                      type="text"
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors ${theme === 'light' ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-white'}`}
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                    <input 
                      required
                      type="email"
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors ${theme === 'light' ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-white'}`}
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Subject</label>
                  <input 
                    required
                    type="text"
                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors ${theme === 'light' ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-white'}`}
                    placeholder="Project Inquiry"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors resize-none ${theme === 'light' ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-white'}`}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group ${
                    theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                  } disabled:opacity-50`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkArchive = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium text-zinc-400 hover:text-black transition-colors flex items-center gap-2 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">All Projects</h1>
          <p className="text-xl text-zinc-500 mt-4">A complete collection of my design work over the years.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const project = PROJECTS.find(p => p.slug === slug);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleVisit = () => {
    if (project?.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <button 
            onClick={() => navigate('/work')}
            className={`transition-colors flex items-center gap-2 mx-auto ${theme === 'light' ? 'text-zinc-500 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={() => navigate('/work')}
            className={`text-sm font-medium transition-colors flex items-center gap-2 mb-8 group ${theme === 'light' ? 'text-zinc-400 hover:text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
          </button>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-end">
            <div>
              <p className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-4 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>{project.category}</p>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">{project.title}</h1>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-8 pb-2">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Year</p>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Role</p>
                <p className="font-medium">{project.role}</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${theme === 'light' ? 'border-black/10 hover:bg-zinc-50' : 'border-white/10 hover:bg-white/5'}`}
                    title="Share project"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {isCopied && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
                          theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                      >
                        Link Copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={handleVisit}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${theme === 'light' ? 'border-black/10 hover:bg-zinc-50' : 'border-white/10 hover:bg-white/5'}`}
                  title="Visit live site"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className={`aspect-[16/9] rounded-3xl overflow-hidden mb-20 ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
          <img 
            src={project.image} 
            alt={project.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
            <section className="mb-12 md:mb-16">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Overview</h2>
              <p className={`text-lg md:text-xl leading-relaxed ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {project.fullDescription}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <section>
                <h3 className="text-xl font-bold mb-4">The Challenge</h3>
                <p className={theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}>
                  {project.challenge}
                </p>
              </section>
              <section>
                <h3 className="text-xl font-bold mb-4">The Solution</h3>
                <p className={theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}>
                  {project.solution}
                </p>
              </section>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-8">Process & Outcome</h2>
              <div className="grid gap-8">
                {project.gallery ? (
                  project.gallery.map((img, i) => (
                    <div key={i} className={`aspect-[16/9] rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-zinc-50' : 'bg-white/5'}`}>
                      <img 
                        src={img} 
                        alt={`Process ${i + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  [1, 2].map(i => (
                    <div key={i} className={`aspect-[16/9] rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-zinc-50' : 'bg-white/5'}`}>
                      <img 
                        src={`https://picsum.photos/seed/process-${project.slug}-${i}/1200/800`} 
                        alt="Process" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className={`px-4 py-2 rounded-full text-sm font-medium ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/10'}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            <section className={`p-8 rounded-3xl ${theme === 'light' ? 'bg-zinc-50' : 'bg-white/5'}`}>
              <h3 className="text-xl font-bold mb-4">Interested in this project?</h3>
              <p className={theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'}>I'd love to discuss the details and process behind this case study with you.</p>
              <button 
                onClick={() => navigate('/contact')}
                className={`w-full py-4 rounded-full font-medium transition-colors ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'}`}
              >
                Get in touch
              </button>
            </section>
          </div>
        </div>

        {/* Next Project */}
        <div className={`mt-32 pt-20 border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'}`}>
          <p className={`text-sm font-bold uppercase tracking-widest mb-8 text-center ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>Next Project</p>
          <div 
            onClick={() => {
              const currentIndex = PROJECTS.findIndex(p => p.slug === slug);
              const nextIndex = (currentIndex + 1) % PROJECTS.length;
              navigate(`/project/${PROJECTS[nextIndex].slug}`);
            }}
            className="group cursor-pointer text-center"
          >
            <h2 className={`text-4xl md:text-8xl font-bold tracking-tighter transition-colors mb-4 ${theme === 'light' ? 'group-hover:text-zinc-400' : 'group-hover:text-zinc-500'}`}>
              {PROJECTS[(PROJECTS.findIndex(p => p.slug === slug) + 1) % PROJECTS.length].title}
            </h2>
            <div className="flex items-center justify-center gap-2 font-medium">
              View Case Study <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessPage = () => {
  const { theme } = useTheme();
  
  const steps = [
    {
      number: "01",
      title: "Discovery & Research",
      description: "We start by diving deep into your brand's DNA, market position, and target audience. This phase is about gathering insights and defining the core problem we're solving.",
      icon: <Search className="w-6 h-6" />,
      details: ["Brand Audit", "Competitor Analysis", "User Personas", "Stakeholder Interviews"]
    },
    {
      number: "02",
      title: "Strategy & Planning",
      description: "Based on our research, we develop a comprehensive strategy. We define the user journey, information architecture, and the overall creative direction.",
      icon: <Target className="w-6 h-6" />,
      details: ["User Flows", "Sitemap", "Content Strategy", "Technical Requirements"]
    },
    {
      number: "03",
      title: "Design & Creative",
      description: "This is where the vision takes shape. We create high-fidelity UI designs, interactive prototypes, and custom 3D assets that align with the brand strategy.",
      icon: <Palette className="w-6 h-6" />,
      details: ["Visual Identity", "UI/UX Design", "3D Modeling", "Prototyping"]
    },
    {
      number: "04",
      title: "Development & Build",
      description: "We bring the designs to life using modern technologies. Our focus is on performance, accessibility, and creating seamless interactions.",
      icon: <Code className="w-6 h-6" />,
      details: ["Front-end Development", "CMS Integration", "Animation", "Performance Optimization"]
    },
    {
      number: "05",
      title: "Launch & Growth",
      description: "After rigorous testing, we launch your project to the world. We also provide ongoing support and optimization to ensure long-term success.",
      icon: <Rocket className="w-6 h-6" />,
      details: ["QA Testing", "Deployment", "Analytics Setup", "Maintenance"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
              MY <span className={theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}>PROCESS</span>
            </h1>
            <p className={`text-xl md:text-2xl leading-relaxed ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
              A systematic approach to creating digital experiences that are both beautiful and functional. I believe in a collaborative process that puts the user first.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid md:grid-cols-12 gap-8 md:gap-12 items-start py-12 md:py-20 border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'}`}
            >
              <div className="md:col-span-1">
                <span className={`text-xl md:text-2xl font-mono font-bold ${theme === 'light' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {step.number}
                </span>
              </div>
              
              <div className="md:col-span-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
                  {step.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{step.title}</h2>
                <p className={`text-lg md:text-xl leading-relaxed ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {step.description}
                </p>
              </div>

              <div className="md:col-span-5 md:col-start-8">
                <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  What's included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`} />
                      <span className="text-sm md:text-base font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`mt-32 p-12 md:p-24 rounded-[3rem] text-center transition-colors ${theme === 'light' ? 'bg-zinc-50' : 'bg-white/5'}`}
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-8">
            Ready to start <br /> your project?
          </h2>
          <Link 
            to="/contact"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all group ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'}`}
          >
            Let's Talk <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-white"
      />
      
      <div className="w-full max-w-2xl flex flex-col items-center relative z-10">
        <motion.div 
          layoutId="nav-logo"
          className="text-black text-5xl md:text-7xl font-bold tracking-tighter mb-8"
        >
          VAIBHAV<span className="text-zinc-400"> STUDIO</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative"
        >
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">Initializing</span>
            <span className="text-zinc-400 font-mono text-xs">{progress}%</span>
          </div>
          <div className="h-[1px] w-full bg-zinc-100 overflow-hidden relative">
            <motion.div 
              layoutId="nav-border"
              className="absolute inset-0 bg-black origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  
  const privacyPolicy = (
    <div className="space-y-4">
      <p>Your privacy is important to us. It is Vaibhav Studio's policy to respect your privacy regarding any information we may collect from you across our website.</p>
      <h4 className="font-bold">1. Information we collect</h4>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
      <h4 className="font-bold">2. Use of Information</h4>
      <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.</p>
      <h4 className="font-bold">3. Cookies</h4>
      <p>We use cookies to help improve your experience of our website. This includes cookies that are necessary for the operation of the site, as well as those used for analytical purposes.</p>
    </div>
  );

  const termsOfService = (
    <div className="space-y-4">
      <p>By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
      <h4 className="font-bold">1. Use License</h4>
      <p>Permission is granted to temporarily download one copy of the materials on Vaibhav Studio's website for personal, non-commercial transitory viewing only.</p>
      <h4 className="font-bold">2. Disclaimer</h4>
      <p>The materials on Vaibhav Studio's website are provided on an 'as is' basis. Vaibhav Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
      <h4 className="font-bold">3. Limitations</h4>
      <p>In no event shall Vaibhav Studio or its suppliers be liable for any damages arising out of the use or inability to use the materials on Vaibhav Studio's website.</p>
    </div>
  );
  
  return (
    <>
      <footer className={`py-12 px-6 border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-500 text-sm text-center md:text-left">© 2026 Vaibhav Studio. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            <button 
              onClick={() => setModalContent({ title: 'Privacy Policy', content: privacyPolicy })}
              className="hover:text-zinc-500 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setModalContent({ title: 'Terms of Service', content: termsOfService })}
              className="hover:text-zinc-500 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalContent(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 md:p-12 rounded-3xl shadow-2xl ${
                theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-white'
              }`}
            >
              <button 
                onClick={() => setModalContent(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold mb-8">{modalContent.title}</h2>
              <div className={`space-y-6 ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {modalContent.content}
              </div>
              <button 
                onClick={() => setModalContent(null)}
                className={`mt-12 w-full py-4 rounded-full font-bold uppercase tracking-widest transition-colors ${
                  theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <Router>
            <ScrollToTop />
            <ScrollProgress />
            <Navbar />

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkArchive />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/project/:slug" element={<ProjectPage />} />
              </Routes>
            </AnimatePresence>

            <Footer />
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
