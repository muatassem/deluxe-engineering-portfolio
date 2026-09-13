"use client";
import {use,useEffect,useState} from "react";
import {useSearchParams} from "next/navigation";

const data = {
  "private-residence": {
    title: "خانوویێ تایبەت",
    en: "PRIVATE RESIDENCE",
    label: "تۆمارا پڕۆژێ",
    hero: "/residence/brand/hero-house.webp",
    stats: [["قەبارێ زەڤیێ", "10 × 20 m"], ["ڕووبەر", "200 m²"], ["قات", "2"], ["قوناغێن ئاڤاکرنێ", "07"], ["وێنە", "82"]],
    final: [
      ["/residence/final-renders/street-elevation.webp", "ڕووکاری ژ لایێ شەقامێ", "Street Elevation"],
      ["/residence/final-renders/elevated-view.webp", "دیمەنا ژ سەرەڤە", "Elevated View"],
      ["/residence/final-renders/low-angle-detail.webp", "وردەکاری ژ گۆشەیەکا نزم", "Low-Angle Detail"],
    ],
    before: "/residence/comparison/before-house-shell.webp",
    after: "/residence/brand/hero-house.webp",
    plans: [
      ["/residence/project-plans/ground-floor.webp", "پلانێ قاتی عەردی", "Ground Floor"],
      ["/residence/project-plans/first-floor.webp", "پلانێ قاتی ئێکێ", "First Floor"],
    ],
    stages: [
      ["بنیات و ژێرئاڤاهی", "Foundations & Substructure"],
      ["سازیا کۆنکرێتا چەکدار", "Reinforced Concrete Structure"],
      ["دیوارسازی و خزمەتگوزاری", "Masonry & Services"],
      ["عەزل و سیستەمێن MEP", "Insulation & MEP"],
      ["ئامادەکرنا ڕوویان و کاشی", "Surface Preparation & Tilework"],
      ["تەمامکارییا ڕووکاری و ناڤخۆیی", "Facade & Interior Finishes"],
      ["عەردیات و دیمەنا دوماهیێ", "Flooring & Final Reveal"],
    ],
  },
  "private-indoor-pool": {
    title: "مەلەڤانگەها ناڤخۆ یا تایبەت",
    en: "PRIVATE INDOOR POOL",
    label: "پڕۆژەیا ناڤخۆیی",
    hero: "/pool/renders/hero.webp",
    stats: [["جهـ", "دهۆک"], ["جۆر", "ناڤخۆیی"], ["قوناغێن ئاڤاکرنێ", "05"], ["وێنە", "23"], ["ساڵ", "2026"]],
    final: [
      ["/pool/renders/hero.webp", "دیمەنا سەرەکی یا مەلەڤانگەهێ", "Main Pool View"],
      ["/pool/renders/full-room.webp", "دیمەنا گشتی یا ناڤخۆیی", "Interior Atmosphere"],
      ["/pool/renders/water-detail.webp", "وردەکارییا ئاڤ و ڕووناهیێ", "Water & Light Detail"],
    ],
    before: "/pool/comparison/before-private-pool.webp",
    after: "/pool/renders/hero.webp",
    plans: [
      ["/pool/plans/pool-plan.webp", "پلانێ مەلەڤانگەهێ · پێڤەر 1:100", "Pool Plan"],
      ["/pool/concept/material-board.webp", "تەختەیا ماتریال و کەشوهەوایێ", "Material Board"],
    ],
    stages: [
      ["کۆلان و سازیا سەرەتایی", "Excavation & Structural Shell"],
      ["عەزلا ئاڤێ و خزمەتگوزاری", "Waterproofing & Services"],
      ["کاشیکاری و کارێ بەری", "Pool Tiling & Stonework"],
      ["سەقف، ڕووناهی و تەمامکاری", "Ceiling, Lighting & Finishes"],
      ["تاقیکرن و دیمەنا دوماهیێ", "Commissioning & Final Reveal"],
    ],
  },
} as const;

const stageImages = {
  "private-residence": [
    ["b007","b009","b010","b006","b008","b011","b012","b013","b014","b015","b018","b020","b023","b024"],
    ["b005","a001","a002","a003","a004","a005","a008","a009","a010","a013","a016","a021"],
    ["a023","a026","a027","a029","a030","a031","a032","a033","a034","a035","a036"],
    ["b001","b002","b004","a037","a039","a040","a042","a045","a046","a047","a048","a051","a052"],
    ["a054","a055","a056","a057","a058","a059","a060","a061","a062","a063","a064","a065","a072"],
    ["a074","a076","a077","a079","a080","a081","a082","a084","a085","a086","a087"],
    ["a090","a092","a093","a094","a095","a098","a099","a100"],
  ],
  "private-indoor-pool": [
    ["p001","p002","p003","p004","p005"],
    ["p101","p102","p103","p104","p105"],
    ["p201","p202","p203","p204","p205"],
    ["p301","p302","p303","p304"],
    ["p401","p402","p403","p404"],
  ],
} as const;

const residenceLabels = [
  ["بنیاتی پێیەکان","شبکەیا ئاسنی یا بنیاتێ","قەالبێ بنیاتێ","کۆنکرێتا ژێرئاڤاهی","ئامادەکاریا بنیاتێ"],
  ["ستونێن کۆنکرێتی","تیرێن چەکدار","شبکەیا سەقفێ","قەالبێ سەقفێ","ڕژاندنا کۆنکرێتێ"],
  ["دیوارێن بلۆکی","ڤەکرنا دەرگەهان","ڕێڕەوا خزمەتگوزاریان","ناڤخۆیا ئاڤاهی","شێوازێ ڕووکاری"],
  ["عەزلا دیواران","بورێن ئاڤێ","هێلێن کارەبایی","عەزلا سەقفێ","ڕێکخستنا MEP"],
  ["سیمانکاریا دیواران","ئامادەکرنا عەردی","کاشیکاری","ڕاستکرنا ڕوویان","کارێن پێش تەمامکرنێ"],
  ["ڕووکاری دەرڤە","ڕەنگکرنا ناڤخۆیی","پەنجەرە و دەرگەهـ","سەقفێ ناڤخۆیی","تەمامکاریا دیواران"],
  ["دانانا عەردیاتێ","پارکێت و فلوورینگ","تەمامکاریا پلەکان","ناڤخۆیا تەمامکری","دیمەنا دوماهیێ"],
] as const;

const poolLabels = [
  ["کۆلانا مەلەڤانگەهێ","شبکەیا ئاسنی","قەالبێ کۆنکرێتێ","سازیا حەوزێ","وردەکارییا سازەیی"],
  ["عەزلا دیواران","عەزلا بنێ حەوزێ","بورێن ئاڤێ","ڕێڕەوا ئاڤێ","تاقیکرنا عەزلێ"],
  ["مۆزاییکا حەوزێ","بەرێ دەوروبەرێ","کاشیکارییا دیواران","پڕکرنا بندان","وردەکارییا کاشی"],
  ["سەقفێ هەڵواسراو","دانانا ڕووناهیێ","تەمامکاریا دیواران","سیستەمێ هەواگۆڕکێ","وردەکارییا ناڤخۆیی"],
  ["مەلەڤانگەها تەمامکری","تاقیکرنا ئاڤێ","کەشێ ڕووناهیێ","دیمەنا دوماهیێ","وردەکارییا تەمامکری"],
] as const;

export default function Project({params}:{params:Promise<{slug:string}>}) {
  const {slug} = use(params);
  const search = useSearchParams();
  const projectKey = slug as keyof typeof data;
  const p = data[projectKey];
  const [divider,setDivider] = useState(50);
  const [lightbox,setLightbox] = useState<{src:string;alt:string}|null>(null);
  const showStages = search.get("from") !== "home";

  useEffect(() => {
    const close = (event:KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown",close);
    return () => window.removeEventListener("keydown",close);
  },[]);

  if (!p) return <main className="project-page"><h1>پڕۆژە نەهاتە دیتن</h1></main>;
  const preview = (src:string,alt:string) => setLightbox({src,alt});
  const imageLabel = (stage:number,index:number) => {
    const labels = slug === "private-residence" ? residenceLabels[stage] : poolLabels[stage];
    return labels[index % labels.length];
  };

  return <main className={`project-page ${slug.includes("pool") ? "pool" : ""}`} dir="rtl">
    <section className="project-hero">
      <img className="previewable" onClick={() => preview(p.hero,p.title)} src={p.hero} alt={p.title}/>
      <header className="project-top">
        <a className="brand" href="/"><img src="/deluxe-logo.png" alt=""/><span><strong>DELUXE</strong><b>ENGINEERING</b></span></a>
        <a href="/">ڤەگەڕە بۆ سەرەکی <span>×</span></a>
      </header>
      <div className="project-hero-copy">
        <p>{p.label}</p>
        <h1>{p.title}</h1>
        <h2 dir="ltr">{p.en}</h2>
      </div>
    </section>

    <section className="project-facts project-section">
      <SectionHeading n="01" title="زانیاریێن گشتی" en="Project Information"/>
      <div className="stats">{p.stats.map(([label,value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}</div>
    </section>

    <section className="project-section plans-section">
      <SectionHeading n="02" title="پلانێن پڕۆژێ" en="Project Plans"/>
      <div className="plans">{p.plans.map(([src,title,en]) => <figure key={src}>
        <img className="previewable" onClick={() => preview(src,title)} src={src} alt={title}/>
        <figcaption><b>{title}</b><small>{en}</small></figcaption>
      </figure>)}</div>
    </section>

    <section className={`project-section renders-section ${slug.includes("pool") ? "blue" : "dark"}`}>
      <SectionHeading n="03" title="ڕەندەرێن دوماهیێ" en="Final Renders"/>
      <div className="gallery">{p.final.map(([src,title,en]) => <figure key={src}>
        <img className="previewable" onClick={() => preview(src,title)} src={src} alt={title}/>
        <figcaption><b>{title}</b><small>{en}</small></figcaption>
      </figure>)}</div>
    </section>

    {showStages && <section className="project-section construction-section">
      <SectionHeading n="04" title="قوناغێن ئاڤاکرنێ" en="Construction Stages"/>
      {p.stages.map(([title,en],stageIndex) => <article className="stage" id={`stage-${stageIndex+1}`} key={title}>
        <div className="stage-heading"><span>{String(stageIndex+1).padStart(2,"0")}</span><h2>{title}<small>{en}</small></h2></div>
        <div className="construction-gallery">{stageImages[projectKey][stageIndex].map((name,imageIndex) => {
          const src = slug === "private-residence" ? `/residence/photos/thumbs/${name}.webp` : `/pool/construction/thumbs/${name}.webp`;
          const title = imageLabel(stageIndex,imageIndex);
          return <figure key={name}>
            <img className="previewable" onClick={() => preview(src,title)} src={src} alt={title} loading="lazy"/>
            <figcaption><span>{String(stageIndex+1).padStart(2,"0")}.{String(imageIndex+1).padStart(2,"0")}</span><b>{title}</b></figcaption>
          </figure>;
        })}</div>
      </article>)}
    </section>}

    <section className="project-section comparison-section">
      <SectionHeading n="05" title="بەراوردکرنا بەری و پشتی" en="Before / Final"/>
      <div className={`comparison ${slug === "private-residence" ? "comparison-contain" : ""}`}>
        <img src={p.after} alt="دیمەنا دوماهیێ"/>
        <img className="before" style={{clipPath:`inset(0 ${100-divider}% 0 0)`}} src={p.before} alt="بەری ئاڤاکرنێ"/>
        <input aria-label="بەراوردکرنا بەری و پشتی" type="range" min="5" max="95" value={divider} onChange={event => setDivider(+event.target.value)}/>
        <div className="comparison-preview">
          <button onClick={() => preview(p.before,"بەری ئاڤاکرنێ")}>وێنا بەری</button>
          <button onClick={() => preview(p.after,"دیمەنا دوماهیێ")}>وێنا پشتی</button>
        </div>
      </div>
    </section>

    {lightbox && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="وێنا مەزن" onClick={() => setLightbox(null)}>
      <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="داخستن">✕</button>
      <img src={lightbox.src} alt={lightbox.alt} onClick={event => event.stopPropagation()}/>
      <p>{lightbox.alt}</p>
    </div>}
  </main>;
}

function SectionHeading({n,title,en}:{n:string;title:string;en:string}) {
  return <div className="section-title project-section-title"><span>{n}</span><h2>{title}<small>{en}</small></h2></div>;
}

