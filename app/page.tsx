const projects = [
  {
    n: "01",
    title: "خانوویێ تایبەت",
    en: "Private Residence",
    image: "/residence/brand/hero-house.webp",
    href: "/projects/private-residence?from=home",
    facts: [["جۆر", "نیشتەجێبوون"], ["ڕووبەر", "200 m²"], ["قات", "2"], ["قوناغ", "07"]],
  },
  {
    n: "02",
    title: "مەلەڤانگەها ناڤخۆ یا تایبەت",
    en: "Private Indoor Pool",
    image: "/pool/renders/hero.webp",
    href: "/projects/private-indoor-pool?from=home",
    facts: [["جۆر", "ناڤخۆیی"], ["جهـ", "دهۆک"], ["قوناغ", "05"], ["ساڵ", "2026"]],
  },
] as const;

export default function Home() {
  return <main className="home-page" dir="rtl">
    <section className="home-hero" id="home">
      <img className="home-hero-image" src="/residence/final-renders/street-elevation.webp" alt="پڕۆژەیا دەلۆکس ئەندازیاری"/>
      <div className="home-hero-shade"/>
      <a className="hero-brand" href="#projects" aria-label="Deluxe Engineering">
        <img src="/deluxe-logo.png" alt="لۆگۆیا دەلۆکس ئەندازیاری"/>
        <span><strong className="hero-brand-ku">دیلوکس بوو کاروبارێن ئەندازیای وئاڤاکرنێ</strong></span>
      </a>
    </section>

    <section className="home-projects" id="projects">
      <div className="section-title">
        <span>01</span>
        <h1>پڕۆژێن مە<small>Selected Projects</small></h1>
      </div>
      <div className="project-cards">
        {projects.map(project => <a className="project-card" href={project.href} key={project.href}>
          <img src={project.image} alt={project.title}/>
          <div className="project-card-shade"/>
          <span className="project-number">{project.n}</span>
          <div className="project-card-copy">
            <p>{project.en}</p>
            <h2>{project.title}</h2>
            <div className="card-facts">
              {project.facts.map(([label, value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}
            </div>
            <em>پڕۆژێ ببینە <span>↗</span></em>
          </div>
        </a>)}
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="section-title contact-title">
        <span>02</span>
        <h2>پەیوەندیێ ب مە بکەن<small>Contact & Location</small></h2>
      </div>
      <div className="contact-heading">
        <h3>وەرن، پێنگاڤا داهاتی پێکڤە ئاڤا بکەین.</h3>
        <p>ئەندازیاری، دیزاین و ئاڤاکرن ل دهۆکێ.</p>
      </div>
      <div className="contact-links">
        <a href="https://maps.app.goo.gl/o4aKMhR1BxwSQ9sQA"><b>01</b><span>جهێ ئۆفیسێ<small>عێراق · دهۆک · ماسیکێ</small></span><i>↗</i></a>
        <a href="https://www.instagram.com/aqaratdeluxe/"><b>02</b><span>ئینستاگرام<small>@aqaratdeluxe</small></span><i>↗</i></a>
        <a href="tel:+9647509817989"><b>03</b><span>تەلەفۆن<small>0750 981 7989</small></span><i>↗</i></a>
        <a href="https://wa.me/9647509817989"><b>04</b><span>واتسئاپ<small>0750 981 7989</small></span><i>↗</i></a>
      </div>
    </section>

    <footer className="home-footer">
      <Brand/>
      <p>ئەندازیاری · دیزاین · ئاڤاکرن</p>
      <a href="#home">ڤەگەڕە سەرەڤە ↑</a>
    </footer>
  </main>;
}

function Brand() {
  return <a className="brand" href="/"><img src="/deluxe-logo.png" alt=""/><span><strong>DELUXE</strong><b>ENGINEERING</b></span></a>;
}

