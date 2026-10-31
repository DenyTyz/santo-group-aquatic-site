"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  type FormEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const MAP_URL = "https://maps.app.goo.gl/yyen3Pbg2oTPajWj9";
const MAP_EMBED = "https://www.google.com/maps?q=-8.0558945,111.8837425&output=embed";
const WHATSAPP_NUMBER = "6281515766244";

const navItems = [
  { id: "tentang", label: "Tentang" },
  { id: "produk", label: "Pilihan" },
  { id: "galeri", label: "Galeri" },
  { id: "kontak", label: "Lokasi & kontak" },
];

const products = [
  {
    number: "01",
    icon: "◉",
    title: "Ikan hias pilihan",
    copy: "Tanyakan pilihan dan ketersediaan ikan langsung kepada tim Santo Group.",
  },
  {
    number: "02",
    icon: "≈",
    title: "Grosir maupun eceran",
    copy: "Belanja untuk koleksi pribadi atau kebutuhan usaha—hubungi kami untuk informasi.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Pengiriman luar kota",
    copy: "Butuh pengiriman ke luar kota? Diskusikan tujuan dan ketentuannya melalui WhatsApp.",
  },
];

const galleryImages = [
  {
    title: "Warna yang hidup",
    caption: "Ikan hias pilihan untuk akuarium Anda",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
  {
    title: "Dunia bawah air",
    caption: "Inspirasi untuk ruang akuatik di rumah",
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
  {
    title: "Temukan suasananya",
    caption: "Mampir dan tanyakan pilihan yang tersedia",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
];

const bubbles = Array.from({ length: 21 }, (_, index) => ({
  left: `${(index * 47 + 11) % 100}%`,
  size: `${6 + ((index * 13) % 17)}px`,
  duration: `${12 + ((index * 7) % 16)}s`,
  delay: `${-((index * 5) % 24)}s`,
}));

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className || "button-arrow"} fill="none">
      <path d="M3.5 10h12m-4.5-4.5L15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20.2 11.7a8.17 8.17 0 0 1-12.1 7.16L3 20l1.18-4.9A8.17 8.17 0 1 1 20.2 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.2 7.8c.2-.45.42-.46.66-.47h.56c.18 0 .4.07.5.38l.7 1.7c.08.2.05.4-.08.57l-.52.62c-.14.15-.26.3-.1.58.17.28.73 1.18 1.58 1.92.98.86 1.8 1.12 2.1 1.24.29.12.46.1.63-.1.17-.2.72-.83.92-1.11.19-.28.39-.23.66-.14l1.58.75c.29.14.49.21.56.34.07.13.07.74-.17 1.45-.24.71-1.39 1.36-1.92 1.4-.5.04-1.13.08-1.83-.14-.42-.13-.96-.3-1.65-.6-2.9-1.25-4.8-4.18-4.94-4.38-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41Z" fill="currentColor" />
    </svg>
  );
}

function FishIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 72" fill="none" className={className}>
      <path d="M14 36c13-19 31-27 51-22 12 3 21 10 28 20l17-14v32L93 38c-7 10-16 17-28 20-20 5-38-3-51-22Z" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="2" />
      <circle cx="49" cy="31" r="2.6" fill="currentColor" />
      <path d="M71 23c-5 8-5 18 0 26" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.5" />
    </svg>
  );
}

function Bubbles() {
  return (
    <div className="bubble-layer" aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          className="bubble"
          key={index}
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
          }}
        />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <span
          aria-hidden="true"
          className="spark"
          key={`spark-${index}`}
          style={{
            left: `${(index * 31 + 8) % 95}%`,
            top: `${(index * 23 + 12) % 84}%`,
            animationDelay: `${index * -0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.16 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(5px)" }}
      animate={isInView || reducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: reducedMotion ? 0.01 : 0.72, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 16, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 190, damping: 16, mass: 0.2 });
  const reducedMotion = useReducedMotion();

  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.11);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`action-button ${secondary ? "action-button-secondary" : ""} ${className}`}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
      onMouseMove={move}
      onMouseLeave={reset}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

function FloatingNav() {
  const [active, setActive] = useState("tentang");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 680px)");
    function updateViewport() {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) setMenuOpen(false);
    }

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobile || !menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobile, menuOpen]);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      className="floating-nav"
      initial={reducedMotion ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.65, delay: reducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand-lockup" href="#beranda" aria-label="Santo Group, beranda" onClick={closeMenu}>
        <span className="brand-mark">SG</span>
        <span className="brand-copy">
          <strong>SANTO GROUP</strong>
          <small>SUPPLIER IKAN HIAS</small>
        </span>
      </a>
      <nav
        className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}
        aria-label="Navigasi utama"
        aria-hidden={isMobile && !menuOpen}
        inert={isMobile && !menuOpen}
      >
        {navItems.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            className={`nav-link ${active === item.id ? "nav-link-active" : ""}`}
            onClick={closeMenu}
          >
            {item.label}
            {active === item.id && <motion.span className="nav-indicator" layoutId="active-nav" />}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <MagneticButton href={`https://wa.me/${WHATSAPP_NUMBER}`} className="nav-cta hidden sm:inline-flex">
          <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp
        </MagneticButton>
        <button
          ref={menuToggleRef}
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>
    </motion.header>
  );
}

function RatingStars() {
  return <span aria-label="4.7 dari 5" className="rating-stars">★★★★★</span>;
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });
  const reducedMotion = useReducedMotion();

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.article
      className={className}
      style={{ rotateX: reducedMotion ? 0 : springX, rotateY: reducedMotion ? 0 : springY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
    >
      {children}
    </motion.article>
  );
}

function ProductIcon({ index }: { index: number }) {
  if (index === 0) return <FishIcon className="h-7 w-10" />;
  if (index === 1) return <span className="text-xl" aria-hidden="true">⌘</span>;
  return <span className="text-xl" aria-hidden="true">↗</span>;
}

function GalleryCarousel() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const lightboxPanelRef = useRef<HTMLDivElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedImage === null) return;
    lightboxCloseButtonRef.current?.focus();

    function handleLightboxKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedImage(null);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = lightboxPanelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
      } else if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleLightboxKeyDown);
    return () => {
      window.removeEventListener("keydown", handleLightboxKeyDown);
      lightboxTriggerRef.current?.focus();
    };
  }, [selectedImage]);

  return (
    <>
      <div className="gallery-mosaic">
        {galleryImages.map((image, index) => (
          <motion.button
            type="button"
            className={`gallery-tile gallery-tile-${index + 1}`}
            key={image.title}
            onClick={(event) => {
              lightboxTriggerRef.current = event.currentTarget;
              setSelectedImage(index);
            }}
            onPointerMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
              event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            }}
            whileHover={reducedMotion ? undefined : { y: -4 }}
            whileTap={reducedMotion ? undefined : { scale: 0.985 }}
            aria-label={`Perbesar foto: ${image.title}`}
          >
            <motion.span
              className="gallery-tile-image"
              style={{ backgroundImage: `url("${image.image}")`, backgroundPosition: image.position }}
              initial={reducedMotion ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reducedMotion ? undefined : { scale: 1.045 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="gallery-tile-shade" />
            <span className="gallery-tile-index">0{index + 1} <span>/</span> FOTO ILUSTRASI</span>
            <span className="gallery-tile-caption">
              <span><strong>{image.title}</strong><small>{image.caption}</small></span>
              <span className="gallery-expand" aria-hidden="true">↗</span>
            </span>
          </motion.button>
        ))}
      </div>
      {selectedImage !== null && (
          <motion.div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ilustrasi: ${galleryImages[selectedImage].title}`}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              ref={lightboxPanelRef}
              className="lightbox-panel"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="lightbox-image"
                role="img"
                aria-label={`${galleryImages[selectedImage].title}, foto ilustrasi`}
                style={{ backgroundImage: `url("${galleryImages[selectedImage].image}")` }}
              />
              <div className="lightbox-caption">
                <span><strong>{galleryImages[selectedImage].title}</strong><small>{galleryImages[selectedImage].caption} · Foto ilustrasi</small></span>
                <button ref={lightboxCloseButtonRef} type="button" className="gallery-close" aria-label="Tutup foto" onClick={() => setSelectedImage(null)}>×</button>
              </div>
            </motion.div>
          </motion.div>
      )}
      <p className="gallery-disclaimer">Foto ilustrasi, bukan dokumentasi stok atau kondisi toko.</p>
    </>
  );
}

function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("nama") ?? "").trim();
    const topic = String(formData.get("topik") ?? "Informasi ikan hias");
    const message = String(formData.get("pesan") ?? "").trim();
    const text = [
      `Halo Santo Group, saya ${name}.`,
      `Saya ingin bertanya tentang ${topic.toLowerCase()}.`,
      message ? `Pesan: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <p className="form-title">Mulai percakapan</p>
      <label className="field-label">
        Nama
        <input className="form-control" name="nama" placeholder="Nama Anda" autoComplete="name" required />
      </label>
      <label className="field-label">
        Yang ingin ditanyakan
        <select className="form-control" name="topik" defaultValue="Pilihan ikan hias">
          <option>Pilihan ikan hias</option>
          <option>Harga grosir atau eceran</option>
          <option>Pengiriman luar kota</option>
          <option>Jam operasional dan alamat</option>
        </select>
      </label>
      <label className="field-label">
        Pesan <span className="text-slate-500">(opsional)</span>
        <textarea className="form-control" name="pesan" placeholder="Ceritakan kebutuhan Anda..." rows={3} />
      </label>
      <button className="action-button form-submit" type="submit">
        <WhatsAppIcon className="h-4 w-4" /> Lanjutkan ke WhatsApp <ArrowIcon />
      </button>
      <p className="form-hint">Pesan akan diteruskan ke WhatsApp. Tidak ada data yang disimpan di website.</p>
    </form>
  );
}

function FloatingDock() {
  const dockItems = [
    { href: "#beranda", icon: "⌂", label: "Beranda" },
    { href: "#produk", icon: "◉", label: "Pilihan" },
    { href: "#galeri", icon: "▧", label: "Galeri" },
    { href: "#kontak", icon: "⌖", label: "Kontak" },
  ];
  return (
    <nav className="floating-dock" aria-label="Navigasi cepat">
      {dockItems.map((item) => (
        <a className="dock-link" href={item.href} key={item.href}>
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="lamp-heading">
      <span className="lamp-glow" aria-hidden="true" />
      <span className="lamp-beam" aria-hidden="true" />
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </div>
  );
}

export function AquaticLanding() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="page-shell">
      <FloatingNav />

      <main>
        <section className="hero-section" id="beranda">
          <div className="hero-beams" aria-hidden="true" />
          <div className="hero-grid-glow" aria-hidden="true" />
          <svg className="water-waves" aria-hidden="true" viewBox="0 0 1440 240" preserveAspectRatio="none">
            <path d="M-60 92c140-72 250 65 400 0s260-56 390 4 250 64 390-1 230-61 390 0" />
            <path d="M-80 142c145-68 260 65 410 0s265-55 395 5 255 62 395-2 235-58 400 1" />
            <path d="M-60 190c150-60 265 58 420 0s270-47 400 7 260 54 400-2 240-49 400 3" />
          </svg>
          <Bubbles />
          <div className="section-shell hero-content">
            <div className="hero-copy">
              <motion.div
                className="hero-badge"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: reducedMotion ? 0 : 0.28 }}
              >
                <span className="live-dot" /> Supplier ikan hias · Tulungagung
              </motion.div>
              <motion.h1
                className="hero-title"
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.18, delayChildren: reducedMotion ? 0 : 0.4 } },
                }}
              >
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Hidupkan suasana
                </motion.span>
                <motion.span
                  className="highlight block"
                  variants={{
                    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  akuarium Anda.
                </motion.span>
              </motion.h1>
              <motion.p
                className="hero-description"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : 0.92 }}
              >
                Supplier ikan hias berkualitas untuk kebutuhan grosir maupun
                eceran. Buka 24 jam dan siap melayani pengiriman luar kota.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: reducedMotion ? 0 : 1.05 }}
              >
                <MagneticButton href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo Santo Group, saya ingin bertanya tentang ikan hias.")}`}>
                  <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp Sekarang <ArrowIcon />
                </MagneticButton>
                <MagneticButton href={MAP_URL} secondary>
                  Lihat lokasi <span aria-hidden="true">↗</span>
                </MagneticButton>
              </motion.div>
              <motion.div
                className="hero-facts"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.7, delay: reducedMotion ? 0 : 1.2 }}
              >
                <div className="hero-fact"><span className="hero-fact-icon">✳</span> Buka 24 jam</div>
                <div className="hero-fact"><span className="hero-fact-icon">◈</span> Grosir & eceran</div>
                <div className="hero-fact"><span className="hero-fact-icon">↗</span> Kirim luar kota</div>
              </motion.div>
            </div>

            <motion.div
              className="hero-art"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.93, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 1.05, delay: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-art-halo" />
              <motion.div
                className="hero-art-image"
                animate={reducedMotion ? undefined : { y: [0, -9, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1000&q=85"
                  alt="Ikan badut berwarna cerah berenang di dalam air"
                  fetchPriority="high"
                />
              </motion.div>
              <motion.div
                className="hero-art-label"
                initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : 1.15 }}
              >
                <span className="hero-art-mark"><FishIcon className="h-5 w-7" /></span>
                <span><strong>Santo Group</strong><small>Teman kebutuhan akuarium Anda</small></span>
              </motion.div>
              <motion.div className="fish-swimmer fish-swimmer-one" aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, -13, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                <FishIcon />
              </motion.div>
              <motion.div className="fish-swimmer fish-swimmer-two" aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }}>
                <FishIcon />
              </motion.div>
            </motion.div>
          </div>
          <a href="#tentang" className="scroll-cue section-shell" aria-label="Gulir ke bagian tentang">
            <span className="scroll-cue-line" /> Gulir untuk mengenal kami <span className="scroll-cue-arrow">↓</span>
          </a>
        </section>

        <div className="marquee-wrap" aria-label="Layanan Santo Group">
          <div className="marquee-track">
            {[0, 1].map((repeat) => (
              <div className="flex" key={repeat} aria-hidden={repeat === 1}>
                {["Ikan hias berkualitas", "Grosir & eceran", "Buka 24 jam", "Pengiriman luar kota", "Tulungagung, Jawa Timur"].map((item) => (
                  <span className="marquee-item" key={`${repeat}-${item}`}>
                    {item}<span className="marquee-dot">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="about-section section-shell" id="tentang">
          <Reveal>
            <SectionHeading kicker="Kenalan dengan kami" title={<>Teman baik untuk <span className="aqua-text">akuarium Anda.</span></>}>
              Dari memilih ikan hingga menyiapkan pengiriman, Santo Group siap
              membantu kebutuhan ikan hias Anda.
            </SectionHeading>
          </Reveal>

          <div className="bento-grid">
            <Reveal className="bento-card bento-card-large" delay={0.05}>
              <span className="bento-index">01 / UNTUK SEMUA KEBUTUHAN</span>
              <h3>Belanja sesuai kebutuhan.</h3>
              <p>Melayani pembelian grosir maupun eceran—tanyakan pilihan yang sesuai untuk Anda.</p>
              <div className="bento-graphic" aria-hidden="true"><FishIcon /></div>
            </Reveal>
            <Reveal className="bento-card bento-card-tall" delay={0.12}>
              <span className="bento-index">02 / SELALU SIAP</span>
              <div className="bento-stat">24<small>JAM</small></div>
              <h3>Buka setiap saat.</h3>
              <p>Hubungi atau kunjungi kami kapan saja. Kami buka 24 jam.</p>
              <div className="bento-graphic" aria-hidden="true">
                <svg viewBox="0 0 200 130" fill="none"><path d="M10 80c24-30 47-30 70 0s47 30 70 0 33-27 45-17M10 101c24-30 47-30 70 0s47 30 70 0 33-27 45-17" stroke="currentColor" strokeWidth="1.4" /><circle cx="72" cy="38" r="21" stroke="currentColor" strokeOpacity=".6" /><path d="M72 25v14l9 5" stroke="currentColor" strokeWidth="1.5" /></svg>
              </div>
            </Reveal>
            <Reveal className="bento-card" delay={0.16}>
              <span className="bento-index">03 / PILIHAN BERKUALITAS</span>
              <h3>Ikan hias berkualitas.</h3>
              <p>Temukan pilihan ikan hias untuk menambah warna di akuarium.</p>
            </Reveal>
            <Reveal className="bento-card" delay={0.22}>
              <span className="bento-index">04 / DARI TULUNGAGUNG</span>
              <h3>Menjangkau luar kota.</h3>
              <p>Tanyakan opsi pengiriman, tujuan, dan ketentuan melalui WhatsApp.</p>
              <span className="bento-mini">Jawa Timur · Indonesia</span>
            </Reveal>
          </div>
        </section>

        <section className="catalog-section" id="produk">
          <div className="section-shell catalog-layout">
            <Reveal className="catalog-sticky">
              <p className="section-kicker">Grosir, eceran & pengiriman</p>
              <h2 className="section-title">Kebutuhan ikan hias, <span className="aqua-text">satu tempat.</span></h2>
              <p className="section-copy">
                Hubungi tim kami untuk menanyakan produk, harga, dan ketersediaan
                terbaru. Informasi stok tidak ditampilkan agar selalu akurat.
              </p>
              <a className="catalog-note" href={`https://wa.me/${WHATSAPP_NUMBER}`}>
                Tanya pilihan melalui WhatsApp <ArrowIcon />
              </a>
              <div className="sticky-visual">
                <span className="orbit-ring" /><span className="orbit-ring orbit-ring-two" />
                <span className="fish-line-art"><FishIcon /></span>
              </div>
            </Reveal>
            <div className="product-list">
              {products.map((product, index) => (
                <Reveal key={product.number} delay={index * 0.08}>
                  <TiltCard className="product-card">
                    <div className="product-card-top">
                      <span className="product-icon"><ProductIcon index={index} /></span>
                      <span className="product-number">PILIHAN {product.number}</span>
                    </div>
                    <h3>{product.title}</h3>
                    <p>{product.copy}</p>
                    <span className="product-card-arrow" aria-hidden="true">↗</span>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section section-shell" id="galeri">
          <Reveal>
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Sedikit inspirasi</p>
                <h2 className="section-title">Warna-warni dunia <span className="aqua-text">akuatik.</span></h2>
              </div>
              <p className="section-copy">Geser galeri untuk melihat inspirasi ikan dan kehidupan bawah air.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}><GalleryCarousel /></Reveal>
        </section>

        <section className="rating-section" aria-labelledby="rating-title">
          <Reveal className="section-shell rating-inner">
            <div>
              <p className="section-kicker" id="rating-title">Dikenal di Google Maps</p>
              <div className="rating-score">
                <span className="rating-number">4.7</span>
                <span><RatingStars /><span className="rating-details block">Rating pada listing Google Maps</span></span>
              </div>
            </div>
            <p className="rating-note">
              <strong>Ulasan pelanggan?</strong> Lihat detail rating dan ulasan
              terbaru langsung pada profil Google Maps kami.
            </p>
            <a className="text-sm font-semibold text-aqua-300 transition hover:text-white" href={MAP_URL} target="_blank" rel="noreferrer">
              Buka Google Maps <ArrowIcon className="ml-1 inline h-4 w-4" />
            </a>
          </Reveal>
        </section>

        <section className="contact-section section-shell" id="kontak">
          <Reveal>
            <div className="contact-grid">
              <div className="contact-copy">
                <p className="section-kicker">Kami siap membantu</p>
                <h2 className="section-title">Mari bicara soal <span className="aqua-text">ikan hias.</span></h2>
                <p className="section-copy">
                  Tanyakan ketersediaan, harga grosir atau eceran, serta
                  pengiriman luar kota langsung melalui WhatsApp.
                </p>
                <div className="contact-detail-list">
                  <a className="contact-detail" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                    <span className="contact-detail-icon"><WhatsAppIcon className="h-4 w-4" /></span>
                    <span>+62 815-1576-6244</span>
                  </a>
                  <div className="contact-detail">
                    <span className="contact-detail-icon">◷</span>
                    <span>Buka 24 jam</span>
                  </div>
                  <a className="contact-detail" href={MAP_URL} target="_blank" rel="noreferrer">
                    <span className="contact-detail-icon">⌖</span>
                    <span>Batangsaren, Kauman, Tulungagung, Jawa Timur 66261</span>
                  </a>
                </div>
                <a className="whatsapp-large" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo Santo Group, saya ingin bertanya tentang ikan hias.")}`} target="_blank" rel="noreferrer">
                  <WhatsAppIcon /> Chat WhatsApp Sekarang <ArrowIcon />
                </a>
              </div>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="map-frame">
              <iframe
                title="Lokasi Supplier Ikan Hias Santo Group di Batangsaren, Tulungagung"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="map-caption" href={MAP_URL} target="_blank" rel="noreferrer">
                <span className="hero-art-mark">⌖</span>
                <span><strong>Supplier Ikan Hias Santo Group</strong><small>Batangsaren, Kauman, Tulungagung</small></span>
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell">
          <div className="footer-top">
            <a className="brand-lockup" href="#beranda">
              <span className="brand-mark">SG</span>
              <span className="brand-copy"><strong>SANTO GROUP</strong><small>SUPPLIER IKAN HIAS · TULUNGAGUNG</small></span>
            </a>
            <nav className="footer-links" aria-label="Navigasi footer">
              {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
              <a href={MAP_URL} target="_blank" rel="noreferrer">Google Maps</a>
            </nav>
            <a className="text-sm font-semibold text-aqua-300 hover:text-white" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              WhatsApp <ArrowIcon className="ml-1 inline h-4 w-4" />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Supplier Ikan Hias Santo Group. Hak cipta dilindungi.</span>
            <span>Batangsaren, Kauman · Buka 24 jam</span>
          </div>
        </div>
      </footer>

      <motion.a
        className="floating-wa"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo Santo Group, saya ingin bertanya tentang ikan hias.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp Santo Group"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 280, damping: 18 }}
        whileHover={reducedMotion ? undefined : { scale: 1.08 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </motion.a>
      <FloatingDock />
    </div>
  );
}
