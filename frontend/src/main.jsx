import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Check, ChevronRight, Download,
  ExternalLink, FileText, Github, Globe, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Moon, Server, Send, ShoppingCart, Smartphone, Sparkles, Sun, User, Wrench, X
} from "lucide-react";
import {
  profile, skills, projects, experience, education, certificates, services, posts
} from "./data/portfolio";
import "./styles.css";

const nav = [
  ["home", "Home", Globe],
  ["about", "About", User],
  ["projects", "Projects", BriefcaseBusiness],
  ["skills", "Skills", Wrench],
  ["experience", "Experience", Award],
  ["education", "Education", FileText],
  ["certificates", "Certificates", Award],
  ["services", "Services", Wrench],
  ["blog", "Blog", FileText],
  ["contact", "Contact", Send],
];

const serviceIcons = { Globe, Smartphone, Server, ShoppingCart };

const techMarks = {
  html: "HTML", css: "CSS", js: "JS", react: "⚛", python: "PY", django: "DJ",
  api: "API", node: "JS", postgres: "PG", mysql: "SQL", mongo: "DB",
  git: "Git", github: "GH", vscode: "VS", docker: "▣",
};

function TechMark({ icon }) {
  return <span className={`tech-mark mark-${icon}`} aria-hidden="true">{techMarks[icon] || "•"}</span>;
}

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 80);
    };
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => projects.filter(p =>
    (filter === "All" || p.category === filter) &&
    `${p.title} ${p.description} ${p.tech.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [filter, query]);

  const go = (id) => {
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenu(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast("Email copied");
    } catch {
      window.location.href = profile.socials.email;
    }
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setSending(true);
    setContactStatus({ type: "", message: "" });

    const apiBase = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000")
      .trim().replace(/\/$/, "");

    try {
      const response = await fetch(`${apiBase}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Unable to send your message.");

      setContact({ name: "", email: "", subject: "", message: "", website: "" });
      setContactStatus({ type: "success", message: result.message });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error.message || "Could not connect to the contact server.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go("home")} aria-label="Go to home">
          <span className="brand-mark"><Sparkles size={15}/></span>
          <span>StarX</span>
        </button>

        <nav className={`desktop-nav ${menu ? "open" : ""}`}>
          {nav.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="top-actions">
          <button className="icon-btn" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button className="menu-btn icon-btn" onClick={() => setMenu(v => !v)} aria-label="Open menu">
            {menu ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="hero-greeting">Hi, I'm</p>
            <h1>{profile.name}</h1>
            <h2>{profile.role}</h2>
            <p className="hero-text">{profile.tagline}</p>

            <div className="hero-meta">
              <span><MapPin size={15}/> {profile.location}</span>
              <button onClick={copyEmail} title="Copy email"><Mail size={15}/> {profile.email}</button>
            </div>

            <div className="social-row">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
              <a href={profile.socials.email} aria-label="Email"><Mail size={18}/></a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18}/></a>
            </div>

            <div className="cta-row">
              <a className="btn primary" href={profile.resume} download>
                Download Resume <Download size={16}/>
              </a>
              <button className="btn secondary" onClick={() => go("contact")}>
                Contact Me <ArrowRight size={16}/>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-ring ring-a"/>
            <div className="hero-ring ring-b"/>
            <div className="floating-tech tech-react">⚛</div>
            <div className="floating-tech tech-js">JS</div>
            <div className="floating-tech tech-ts">TS</div>
            <div className="floating-tech tech-python">🐍</div>
            <div className="floating-tech tech-node">⬡</div>
            <div className="portrait-frame">
              <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt={`${profile.name} profile`} />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-head">
            <p className="kicker">01 — About</p>
            <h2>Build with purpose.</h2>
          </div>
          <div className="about-grid">
            <article className="glass about-copy">
              <p>I enjoy turning ideas into practical digital products. My focus is clean interfaces, reliable backend systems and experiences that work equally well on desktop and mobile.</p>
              <p className="muted">A good project is not only about code — it should solve a real problem, be easy to use and be maintainable.</p>
              <div className="location"><MapPin size={16}/> {profile.location}</div>
            </article>
            <div className="mini-grid">
              {[
                ["Web", "Responsive UI"],
                ["API", "Django / REST"],
                ["Mobile", "App-ready design"],
                ["Product", "End-to-end thinking"],
              ].map(([a,b]) => (
                <div className="glass mini-card" key={a}><strong>{a}</strong><span>{b}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head centered">
            <p className="kicker">02 — Projects</p>
            <h2>Selected work.</h2>
            <p className="muted">Some of my recent work</p>
          </div>

          <div className="filters">
            <div className="filter-pills">
              {["All", "Web", "AI"].map(f => (
                <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </div>

          <div className="project-grid">
            {filtered.map(p => (
              <article className="project-card glass" key={p.id}>
                <div className="project-visual">
                  <img src={p.image} alt={`${p.title} demo preview`} loading="lazy"/>
                  <span>{p.category}</span>
                </div>
                <div className="project-body">
                  <div className="project-title">
                    <div>
                      <h3>{p.title}</h3>
                      {p.status === "upcoming" && <span className="status-badge upcoming">Upcoming</span>}
                    </div>
                    {p.featured && <span className="badge">Featured</span>}
                  </div>
                  <p>{p.description}</p>
                  <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                  <div className="card-actions">
                    <button className="text-btn" onClick={() => setSelected(p)}>Details <ArrowUpRight size={15}/></button>
                    <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} GitHub`}>
                      <Github size={17}/>
                    </a>
                    {p.demo ? (
                      <a className="demo-link" href={p.demo} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`}>
                        <ExternalLink size={16}/> Live Demo
                      </a>
                    ) : (
                      <span className="demo-link upcoming-link" title="Real project demo will be linked later">
                        <Sparkles size={15}/> Upcoming
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section demo-previews">
          <div className="section-head centered">
            <p className="kicker">Project Demo Previews</p>
            <h2>Project Demo — Upcoming UI Now.</h2>
            <p className="muted demo-subtitle">Real project later · Current screens show the planned product direction.</p>
          </div>
          <div className="preview-grid">
            {projects.map(p => (
              <button className="preview-card" key={p.id} onClick={() => setSelected(p)}>
                <img src={p.image} alt={`${p.title} demo UI`}/>
                <span><b>{p.title}</b><small>{p.demo ? "Live project" : "UPCOMING UI NOW"}</small></span>
              </button>
            ))}
          </div>
        </section>

        <section id="project-details" className="section project-details-section">
          <div className="section-head centered">
            <p className="kicker">Project Details</p>
            <h2>Behind the builds.</h2>
            <p className="muted">A closer look at what each project solves, how it is structured and what comes next.</p>
          </div>
          <div className="project-detail-grid">
            {projects.map(p => (
              <article className="glass project-detail-card" key={p.id}>
                <div className="detail-top">
                  <div>
                    <span className="detail-category">{p.category}</span>
                    <h3>{p.title}</h3>
                  </div>
                  <span className={`status-badge ${p.status === "live" ? "live" : "upcoming"}`}>{p.status === "live" ? "Live" : "Upcoming"}</span>
                </div>
                <p>{p.overview}</p>
                <h4>Highlights</h4>
                <div className="detail-list">
                  {p.highlights.map(item => <span key={item}>✓ {item}</span>)}
                </div>
                <h4>Build</h4>
                <p className="detail-build">{p.build}</p>
                <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-head">
            <p className="kicker">03 — Skills</p>
            <h2>Tools I use.</h2>
          </div>
          <div className="skill-grid">
            {skills.map(s => (
              <div className="glass skill-box" key={s.group}>
                <h3>{s.group}</h3>
                <div className="tool-list">
                  {s.items.map(i => (
                    <span className="tool-item" key={i.name}>
                      <TechMark icon={i.icon}/>
                      <b>{i.name}</b>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-head">
            <p className="kicker">04 — Experience</p>
            <h2>What I've built.</h2>
          </div>
          <div className="timeline">
            {experience.map(x => (
              <div className="timeline-item" key={x.year}>
                <div className="time">{x.year}</div>
                <div><h3>{x.title}</h3><b>{x.company}</b><p>{x.text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <div className="section-head">
            <p className="kicker">05 — Education</p>
            <h2>Learning & foundation.</h2>
          </div>
          <div className="timeline">
            {education.map(x => (
              <div className="timeline-item" key={x.year}>
                <div className="time">{x.year}</div>
                <div><h3>{x.title}</h3><b>{x.institute}</b></div>
              </div>
            ))}
          </div>
        </section>

        <section id="certificates" className="section">
          <div className="section-head">
            <p className="kicker">06 — Certificates</p>
            <h2>Proof of learning.</h2>
          </div>
          <div className="cert-grid">
            {certificates.map(c => (
              <div className="glass certificate" key={c.title}>
                <div className="cert-icon"><Check size={17}/></div>
                <div><b>{c.title}</b><span>{c.issuer} · {c.year}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-head">
            <p className="kicker">07 — Services</p>
            <h2>What I can build.</h2>
          </div>
          <div className="service-grid">
            {services.map(s => {
              const Icon = serviceIcons[s.icon] || Globe;
              return (
                <article className="glass service" key={s.title}>
                  <span className="service-icon"><Icon size={27}/></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="blog" className="section">
          <div className="section-head">
            <p className="kicker">08 — Blog</p>
            <h2>Notes & learning.</h2>
          </div>
          <div className="blog-grid">
            {posts.map(p => (
              <article className="glass blog" key={p.title}>
                <span>{p.tag} · {p.date}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <button className="text-btn" onClick={() => setSelected({
                  title: p.title, category: p.tag, description: p.text,
                  tech: [p.tag], github: profile.socials.github, demo: "",
                  status: "article", highlights: [], build: "Article note from the StarX portfolio build."
                })}>
                  Read article <ArrowUpRight size={15}/>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="kicker">09 — Contact</p>
              <h2>Let's build something great.</h2>
              <p className="muted">Have an idea, project or opportunity? Send a message and it will be handled by the Django backend.</p>
              <div className="contact-points">
                <a href={profile.socials.email}><Mail size={17}/> {profile.email}</a>
                <span><MapPin size={17}/> {profile.location}</span>
              </div>
            </div>
            <form onSubmit={submitContact}>
              <input required value={contact.name} onChange={e => setContact(v => ({...v,name:e.target.value}))} placeholder="Your name" maxLength="100"/>
              <input required type="email" value={contact.email} onChange={e => setContact(v => ({...v,email:e.target.value}))} placeholder="Email address"/>
              <input value={contact.subject} onChange={e => setContact(v => ({...v,subject:e.target.value}))} placeholder="Subject" maxLength="150"/>
              <textarea required rows="5" value={contact.message} onChange={e => setContact(v => ({...v,message:e.target.value}))} placeholder="Tell me about your project..." maxLength="5000"/>
              <input className="hp-field" tabIndex="-1" autoComplete="off" aria-hidden="true" value={contact.website} onChange={e => setContact(v => ({...v,website:e.target.value}))}/>
              {contactStatus.message && <p className={`contact-status ${contactStatus.type}`} role="status">{contactStatus.message}</p>}
              <button className="btn primary" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"} <Send size={16}/>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-profile">
            <div className="footer-avatar"><img src="/profile.jpg" alt={`${profile.name} profile`}/></div>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
              <small>{profile.tagline}</small>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            {["home","about","projects","skills","contact"].map(id => (
              <button key={id} onClick={() => go(id)}>{id[0].toUpperCase()+id.slice(1)} <ChevronRight size={14}/></button>
            ))}
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <a href={profile.socials.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>
            <a href={profile.socials.email}><Mail size={16}/> Email</a>
            <button onClick={copyEmail}><Mail size={16}/> Copy email</button>
          </div>

          <div className="footer-cta">
            <h4>Let's Build Something Great!</h4>
            <a href={profile.socials.email}><Mail size={16}/> {profile.email}</a>
            <span><MapPin size={16}/> {profile.location}</span>
            <small>© 2026 {profile.name}. All rights reserved.</small>
          </div>
        </div>
      </footer>

      <nav className="mobile-nav">
        {nav.slice(0,5).map(([id,label,Icon]) => (
          <button key={id} onClick={() => go(id)}><Icon size={17}/><span>{label}</span></button>
        ))}
      </nav>

      {toast && <div className="toast">{toast}</div>}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal glass" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)} aria-label="Close details"><X/></button>
            {selected.image && <img className="modal-image" src={selected.image} alt="Preview"/>}
            <p className="kicker">{selected.category}{selected.status === "upcoming" ? " · Upcoming" : ""}</p>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            {selected.highlights?.length > 0 && (
              <>
                <h3>Highlights</h3>
                <div className="modal-highlights">{selected.highlights.map(item => <span key={item}>✓ {item}</span>)}</div>
              </>
            )}
            {selected.build && <><h3>Build notes</h3><p>{selected.build}</p></>}
            <h3>Technology</h3>
            <div className="tags">{(selected.tech || []).map(t => <span key={t}>{t}</span>)}</div>
            <div className="cta-row">
              {selected.demo && <a className="btn primary" href={selected.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={15}/></a>}
              {selected.github && <a className="btn secondary" href={selected.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
