import React, { useState } from "react";
import { motion } from "framer-motion";

const EMAIL = "hej@kostboost.dk"; // ret til din mail

const LINKS = {
  oneOffKost:  "https://example.com",
  oneOffPakke: "https://example.com",
  basis:       "https://example.com",
  plus:        "https://example.com",
  premium:     "https://example.com",
};

const navItems = [
  { label: "Forside", href: "#top" },
  { label: "Kostplaner", href: "#kostplaner" },
  { label: "Træningsprogrammer", href: "#traening" },
  { label: "Abonnement", href: "#abonnement" },
  { label: "Blog", href: "#blog" },
  { label: "Om mig", href: "#om" },
  { label: "Kontakt", href: "#kontakt", onClick: () => setSelectedProduct("") },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
    {children}
  </div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
// --- Kontaktformular (state + submit via e-mail) ---
  const [contact, setContact] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    goalWeight: "",
    goalText: "",
    message: "",
  });

  const [simpleContact, setSimpleContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedFreeResource, setSelectedFreeResource] = useState("");
  const [freeResourceContact, setFreeResourceContact] = useState({
    name: "",
    email: "",
  });
  const [showThankYouPage, setShowThankYouPage] = useState(false);
  const [downloadedResource, setDownloadedResource] = useState("");

  const onContactChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSimpleContactChange = (e) =>
    setSimpleContact({ ...simpleContact, [e.target.name]: e.target.value });

  const onFreeResourceChange = (e) =>
    setFreeResourceContact({ ...freeResourceContact, [e.target.name]: e.target.value });

  function handleContactSubmit(e) {
    e.preventDefault();
    const body = [
      `Navn: ${contact.name}`,
      `E-mail: ${contact.email}`,
      contact.age ? `Alder: ${contact.age}` : null,
      contact.height ? `Højde: ${contact.height} cm` : null,
      contact.weight ? `Vægt: ${contact.weight} kg` : null,
      contact.goalWeight ? `Ønsket vægt: ${contact.goalWeight} kg` : null,
      contact.goalText ? `Mål/Ønske: ${contact.goalText}` : null,
      selectedProduct ? `Interesseret i: ${selectedProduct}` : null,
      contact.message ? `Besked: ${contact.message}` : null,
      "",
      "— Sendt fra kontaktformularen",
    ]
      .filter(Boolean)
      .join("\n");

    // Åbn mailklient med udfyldt emne og brødtekst (ingen backend nødvendig)
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Kontakt – forespørgsel"
    )}&body=${encodeURIComponent(body)}`;
  }

  function handleSimpleContactSubmit(e) {
    e.preventDefault();
    const body = [
      `Navn: ${simpleContact.name}`,
      `E-mail: ${simpleContact.email}`,
      simpleContact.message ? `Besked: ${simpleContact.message}` : null,
      "",
      "— Sendt fra simpel kontaktformular",
    ]
      .filter(Boolean)
      .join("\n");

    // Åbn mailklient med udfyldt emne og brødtekst
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Kontakt – generel forespørgsel"
    )}&body=${encodeURIComponent(body)}`;
  }

  function handleFreeResourceSubmit(e) {
    e.preventDefault();
    
    // Vis takke-siden direkte
    setDownloadedResource(selectedFreeResource);
    setShowThankYouPage(true);
    
    // Ryd formularen
    setFreeResourceContact({ name: "", email: "" });
    setSelectedFreeResource("");
  }



  function handleDiabetesSubmit(e) {
    e.preventDefault();
    alert("Tak! Din forespørgsel om diabetes-rådgivning er modtaget. Vi vender tilbage.");
  }

  return (
    <div id="top" className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
        <Container className="flex items-center justify-between py-4">
          <a href="#top" className="text-xl font-extrabold tracking-tight">
            KostBoost<span className="text-emerald-500">.dk</span>
          </a>
                     <nav className="hidden items-center gap-6 md:flex">
             {navItems.map((item) => (
               <a 
                 key={item.href} 
                 href={item.href} 
                 onClick={item.onClick}
                 className="text-sm font-medium text-zinc-700 transition hover:text-emerald-600 dark:text-zinc-300"
               >
                 {item.label}
               </a>
             ))}
             <a href="#diabetes" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
               Få din diabetes-kostplan
             </a>
           </nav>
          <button
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="i-hamburger h-5 w-5">
              <span className="block h-0.5 w-5 bg-zinc-800 dark:bg-zinc-100" />
              <span className="mt-1 block h-0.5 w-5 bg-zinc-800 dark:bg-zinc-100" />
              <span className="mt-1 block h-0.5 w-5 bg-zinc-800 dark:bg-zinc-100" />
            </div>
          </button>
        </Container>
                 {menuOpen && (
           <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
             <Container className="flex flex-col gap-3 py-3">
               {navItems.map((n) => (
                 <a 
                   key={n.href} 
                   href={n.href} 
                   onClick={() => {
                     if (n.onClick) n.onClick();
                     setMenuOpen(false);
                   }} 
                   className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                 >
                   {n.label}
                 </a>
               ))}
               <a href="#diabetes" onClick={() => setMenuOpen(false)} className="rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white">
                 Få din diabetes-kostplan
               </a>
             </Container>
           </div>
         )}
      </header>

             {/* HERO */}
       <Section id="hero" className="relative overflow-hidden">
         <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white dark:from-emerald-950/30 dark:via-zinc-950 dark:to-zinc-950" />
         <Container className="grid items-center gap-10 py-20 sm:py-24 md:grid-cols-2">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
               Din vej til <span className="text-emerald-600">sundhed</span>,
               <br className="hidden sm:block" /> energi og balance
             </h1>
             <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
               Personlig kost- og træningsvejledning – tilpasset dig og dine mål.
             </p>
             <div className="mt-8 space-y-3">
               <div className="flex items-center gap-3">
                 <span className="text-emerald-600 text-xl">✔</span>
                 <span className="text-zinc-700 dark:text-zinc-300">Personlige kostplaner</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-emerald-600 text-xl">✔</span>
                 <span className="text-zinc-700 dark:text-zinc-300">Diabetes-venlig vejledning</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-emerald-600 text-xl">✔</span>
                 <span className="text-zinc-700 dark:text-zinc-300">Ingen binding</span>
               </div>
             </div>
             <div className="mt-8 flex flex-col gap-4 sm:flex-row">
               <a href="#abonnement" className="rounded-xl bg-emerald-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl">
                 Kom i gang nu
               </a>
               <a href="#kontakt" className="rounded-xl bg-zinc-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:bg-zinc-700 hover:shadow-xl">
                 Prøv gratis intro
               </a>
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="relative"
           >
             <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-2xl dark:border-zinc-800">
               <img
                 src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop"
                 alt="Flatlay af sund mad og grøntsager"
                 className="h-full w-full object-cover"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
             </div>
           </motion.div>
         </Container>
               </Section>

       {/* YDELSER */}
       <Section className="py-16">
         <Container>
           <div className="mb-8 text-center">
             <h2 className="text-3xl font-extrabold">Mine Ydelser</h2>
             <p className="mt-2 text-zinc-600 dark:text-zinc-300">Alt du har brug for til en sundere livsstil</p>
           </div>
           <div className="grid gap-8 sm:grid-cols-3">
             {[
               {
                 icon: "🥗",
                 title: "Kostplaner",
                 description: "Personlige kostplaner tilpasset dine mål og præferencer. Fra vægttab til muskelopbygning.",
                 link: "#kostplaner",
                 linkText: "Se kostplaner"
               },
               {
                 icon: "🏋️",
                 title: "Træningsprogrammer",
                 description: "Effektive træningsprogrammer til hjemmet eller fitnesscenter. Til alle niveauer og mål.",
                 link: "#traening",
                 linkText: "Se træningsprogrammer"
               },
               {
                 icon: "💬",
                 title: "Sparring & Abonnement",
                 description: "Løbende support og månedlige opdateringer. Få nye planer og personlig vejledning.",
                 link: "#abonnement",
                 linkText: "Se abonnementer"
               }
             ].map((service) => (
               <Card key={service.title} className="text-center">
                 <div className="text-4xl mb-4">{service.icon}</div>
                 <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                 <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">{service.description}</p>
                 <a 
                   href={service.link} 
                   className="inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
                 >
                   {service.linkText} →
                 </a>
               </Card>
             ))}
           </div>
         </Container>
       </Section>

       {/* BENEFITS */}
      <Section className="py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Simple og budgetvenlige", desc: "Kostplaner, der er nemme at følge i en travl hverdag." },
              { title: "Til alle niveauer", desc: "Træningsprogrammer til hjemmet eller center – begynder til øvet." },
              { title: "Abonnement muligt", desc: "Få nye planer hver måned uden besvær." },
              { title: "Personlig support", desc: "Motivation og hjælp, når du har brug for det." },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* KOSTPLANER */}
      <Section id="kostplaner" className="py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold">Kostplaner</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">Spis dig til resultater – uden forvirring.</p>
            </div>
            <a href="#diabetes" className="hidden rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold transition hover:border-emerald-600 hover:text-emerald-700 sm:inline-block">
              Diabetes-rådgivning
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Vægttab", desc: "Kalorielette, mættende måltider.", price: "399 kr" },
              { title: "Muskelopbygning", desc: "Proteinrigt og smart timing.", price: "399 kr" },
              { title: "Diabetes-venlig", desc: "Fokus på blodsukker, kulhydrater og lav GI (ikke medicinsk rådgivning).", price: "399 kr" },
              { title: "Low Carb / Keto", desc: "Minimalt kulhydrat, stabil energi.", price: "399 kr" },
              { title: "Vegetar / Vegansk", desc: "Grønne, proteinrige måltider.", price: "399 kr" },
              { title: "Kost + Træning (pakke)", desc: "Skræddersyet engangslevering.", price: "749 kr" },
            ].map((p) => (
              <Card key={p.title}>
                <div className="flex h-full flex-col">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-extrabold">{p.price}</span>
                    <a 
                      href="#kontakt" 
                      onClick={() => setSelectedProduct(p.title)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Køb nu
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
                     <p className="mt-4 text-xs text-zinc-500">
             <strong>⚠️ ADVARSEL:</strong> Dette er IKKE medicinsk rådgivning. Jeg laver kun skræddersyet kostplaner. Tal altid med din læge ved ændringer i behandling eller medicin.
           </p>
        </Container>
      </Section>

      {/* 🔶 DIABETES-SEKTION */}
      <Section id="diabetes" className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div initial={{opacity:0, y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4}}>
                             <h2 className="text-3xl font-extrabold">Skræddersyet diabetes-kost</h2>
               <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                 <strong>VIKTIGT:</strong> Dette er IKKE medicinsk rådgivning. Jeg laver skræddersyet kostplaner tilpasset dine mål og præferencer – med fokus på stabilt blodsukker, kulhydrattælling og lav-glykæmiske valg.
               </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { t: "Kulhydrattælling & måltidsplan", d: "Konkrete rammer for portioner og timing i hverdagen." },
                  { t: "Lav-GI og fiberrige valg", d: "Sammensætning der støtter mere jævnt blodsukker." },
                  { t: "Telefonisk sparring", d: "Kort, målrettet rådgivning pr. måned (ikke medicinsk)." },
                  { t: "Hverdagsvenlige opskrifter", d: "Enkle, billige retter du kan holde fast i." },
                ].map((x) => (
                  <Card key={x.t}>
                    <h3 className="font-bold">{x.t}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{x.d}</p>
                  </Card>
                ))}
              </div>

                             <p className="mt-4 text-xs text-zinc-500">
                 <strong>⚠️ ADVARSEL:</strong> Dette er IKKE medicinsk rådgivning. Jeg laver kun skræddersyet kostplaner. Tal altid med din læge ved ændringer i behandling eller medicin.
               </p>
            </motion.div>

            <motion.form
              onSubmit={handleDiabetesSubmit}
              initial={{opacity:0, y:14}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{duration:0.4, delay:0.1}}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-xl font-extrabold">Book gratis intro (15 min)</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Fortæl kort om din situation – så matcher vi den rigtige plan.</p>

              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Navn</label>
                  <input required className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950" placeholder="Dit navn" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">E-mail</label>
                  <input type="email" required className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950" placeholder="din@mail.dk" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Diabetes-type</label>
                  <select className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                    <option>Type 2</option>
                    <option>Type 1</option>
                    <option>Svangerskabsdiabetes</option>
                    <option>Andet / usikker</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Mål</label>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {["Vægttab", "Vedligehold", "Muskelopbygning"].map((m) => (
                      <label key={m} className="flex items-center gap-2 rounded-xl border border-zinc-300 p-2 dark:border-zinc-700">
                        <input type="checkbox" /> {m}
                      </label>
                    ))}
                  </div>
                </div>
                <button className="mt-2 w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Send og book intro
                </button>
              </div>
            </motion.form>
          </div>
        </Container>
      </Section>

      {/* TRÆNING */}
      <Section id="traening" className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold">Træningsprogrammer</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">Træn smartere – ikke hårdere.</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Hjemme uden udstyr", desc: "Effektiv træning i stuen.", price: "399 kr" },
              { title: "Fitnesscenter – basis", desc: "Maskiner & frie vægte.", price: "399 kr" },
              { title: "Begyndere", desc: "Kom trygt i gang.", price: "399 kr" },
              { title: "Øvede", desc: "Udfordring og udvikling.", price: "399 kr" },
              { title: "Mobilitet & Genoptræning", desc: "Smidighed og skadesforebyggelse.", price: "399 kr" },
              { title: "Skræddersyet", desc: "Personlig progression – til dine mål.", price: "749 kr" },
            ].map((p) => (
              <Card key={p.title}>
                <div className="flex h-full flex-col">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-extrabold">{p.price}</span>
                    <a 
                      href="#kontakt" 
                      onClick={() => setSelectedProduct(p.title)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Køb nu
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

             {/* ABONNEMENT */}
       <Section id="abonnement" className="py-16">
         <Container>
           <div className="mb-8 text-center">
             <h2 className="text-3xl font-extrabold">Vælg den løsning der passer dig</h2>
             <p className="mt-2 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300">Alle pakker inkluderer personlig vejledning og løbende support</p>
           </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Basis",
                price: "299 kr/md",
                features: ["Kostplan (diabetes-venlig muligt)", "Månedlig justering", "E-mail support"],
                cta: "Vælg Basis",
              },
              {
                name: "Plus",
                price: "449 kr/md",
                features: ["Kost + træningsplan", "Månedlig justering", "1× 20 min telefonsamtale/måned"],
                cta: "Vælg Plus",
                popular: true,
              },
              {
                name: "Premium",
                price: "799 kr/md",
                features: ["Kost + træning (skræddersyet)", "Ugentlig e-mail check-in", "2× 20 min telefonsamtaler/måned"],
                cta: "Vælg Premium",
              },
            ].map((tier) => (
              <Card key={tier.name}>
                {tier.popular && (
                  <p className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    Mest populær
                  </p>
                )}
                <h3 className="text-xl font-extrabold">{tier.name}</h3>
                <p className="mt-1 text-2xl font-black">{tier.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
                <a 
                  href="#kontakt" 
                  onClick={() => setSelectedProduct(tier.name)}
                  className="mt-6 inline-block w-full rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  {tier.cta}
                </a>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Ingen binding – opsig når som helst.</p>
          </div>
        </Container>
      </Section>

      {/* BLOG / RESSOURCER */}
      <Section id="blog" className="bg-white py-16 dark:bg-zinc-950">
        <Container>
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">Gratis ressourcer</h2>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">Tips, opskrifter og mini-programmer, der hjælper dig i gang.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "5 nemme måltider under 30 min", img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1600&auto=format&fit=crop" },
              { title: "Hold motivationen i gang", img: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1600&auto=format&fit=crop" },
              { title: "3 hjemmetræningsøvelser der virker", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop" },
            ].map((post, index) => (
              <div key={post.title} className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={post.img} alt="" className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold group-hover:text-emerald-600">{post.title}</h3>
                  <button
                    onClick={() => setSelectedFreeResource(post.title)}
                    className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Få gratis
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="rounded-xl border border-zinc-300 px-5 py-2 text-sm font-semibold transition hover:border-emerald-600 hover:text-emerald-700">
              Se alle artikler
            </a>
          </div>

          {/* Gratis ressource formular */}
          {selectedFreeResource && (
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">Få din gratis ressource</h3>
                <button
                  onClick={() => setSelectedFreeResource("")}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/30">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  Du vil have: <span className="font-bold">{selectedFreeResource}</span>
                </p>
              </div>
              <form onSubmit={handleFreeResourceSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Navn</label>
                  <input
                    name="name"
                    value={freeResourceContact.name}
                    onChange={onFreeResourceChange}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
                    placeholder="Dit navn"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={freeResourceContact.email}
                    onChange={onFreeResourceChange}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
                    placeholder="din@mail.dk"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Send mig {selectedFreeResource}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Takke-side efter download */}
          {showThankYouPage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="mb-4 text-3xl font-bold">Tak for din interesse!</h2>
                  <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-300">
                    Du har nu adgang til <span className="font-semibold text-emerald-600">{downloadedResource}</span>
                  </p>
                  
                  {/* PDF Download sektion */}
                  <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
                    <h3 className="mb-3 text-xl font-semibold text-emerald-800 dark:text-emerald-200">📥 Download din gratis ressource</h3>
                    <p className="mb-4 text-sm text-emerald-700 dark:text-emerald-300">
                      Klik på knappen nedenfor for at downloade PDF'en direkte til din computer
                    </p>
                    <button className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                      Download PDF
                    </button>
                  </div>
                  
                  {/* Reklame for Plus-pakken */}
                  <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Mest populær
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Er du klar til at tage næste skridt?</h3>
                    <p className="mb-4 text-zinc-600 dark:text-zinc-300">
                      Få personlig kost- og træningsplan med månedlig justering og support
                    </p>
                    <div className="mb-4 text-center">
                      <span className="text-2xl font-black text-emerald-600">449 kr/md</span>
                      <span className="text-sm text-zinc-500"> (ingen binding)</span>
                    </div>
                    <a 
                      href="#kontakt" 
                      onClick={() => {
                        setSelectedProduct("Plus");
                        setShowThankYouPage(false);
                      }}
                      className="inline-block w-full rounded-xl bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Se Plus-abonnement her →
                    </a>
                  </div>
                  
                  {/* Luk knap */}
                  <button
                    onClick={() => setShowThankYouPage(false)}
                    className="rounded-xl border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-600 transition hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                  >
                    Luk
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* OM MIG */}
      <Section id="om" className="bg-white py-16 dark:bg-zinc-950">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-extrabold">Hej, jeg hedder [Dit Navn]</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              Jeg hjælper mennesker med at nå deres mål gennem simple, effektive kost- og træningsplaner. Jeg tror ikke på
              hurtige quick-fixes – men på bæredygtige vaner, der giver dig energi og resultater, du kan holde fast i.
            </p>
                         <a 
               href="#kontakt" 
               onClick={() => setSelectedProduct("")} 
               className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
             >
               Kontakt mig
             </a>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square overflow-hidden rounded-3xl border border-zinc-200 shadow-lg dark:border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1534367610401-9f51b1b5b1f4?q=80&w=1200&auto=format&fit=crop"
                alt="Coach portræt"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* KONTAKT */}
      <Section id="kontakt" className="py-16">
        <Container>
          <h2 className="text-3xl font-extrabold">Spørgsmål eller klar til at starte?</h2>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">Udfyld formularen – jeg vender tilbage hurtigst muligt.</p>

          {selectedProduct ? (
            <>
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/30">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  Du er interesseret i: <span className="font-bold">{selectedProduct}</span>
                </p>
              </div>
              <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">Navn</label>
    <input
      name="name"
      value={contact.name}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Dit navn"
      required
    />
  </div>
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">E-mail</label>
    <input
      type="email"
      name="email"
      value={contact.email}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="din@mail.dk"
      required
    />
  </div>
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">Alder</label>
    <input
      type="number"
      name="age"
      value={contact.age}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Din alder"
    />
  </div>
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">Højde (cm)</label>
    <input
      type="number"
      name="height"
      value={contact.height}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Din højde"
    />
  </div>
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">Vægt (kg)</label>
    <input
      type="number"
      name="weight"
      value={contact.weight}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Din vægt"
    />
  </div>
  <div className="sm:col-span-1">
    <label className="mb-1 block text-sm font-medium">Ønsket vægt (kg)</label>
    <input
      type="number"
      name="goalWeight"
      value={contact.goalWeight}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Din ønskede vægt"
    />
  </div>
  <div className="sm:col-span-2">
    <label className="mb-1 block text-sm font-medium">Mål/Ønske</label>
    <input
      name="goalText"
      value={contact.goalText}
      onChange={onContactChange}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Beskriv dit mål eller ønske"
    />
  </div>
  <div className="sm:col-span-2">
    <label className="mb-1 block text-sm font-medium">Besked</label>
    <textarea
      name="message"
      value={contact.message}
      onChange={onContactChange}
      rows={5}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900"
      placeholder="Skriv din besked her..."
      required
    />
  </div>
  <div className="sm:col-span-2">
    <button className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
      Send besked
    </button>
  </div>
</form>
            </>
          ) : (
            <form onSubmit={handleSimpleContactSubmit} className="mt-8 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Navn</label>
                <input
                  name="name"
                  value={simpleContact.name}
                  onChange={onSimpleContactChange}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950"
                  placeholder="Dit navn"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={simpleContact.email}
                  onChange={onSimpleContactChange}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950"
                  placeholder="din@mail.dk"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Beskrivelse</label>
                <textarea
                  name="message"
                  value={simpleContact.message}
                  onChange={onSimpleContactChange}
                  rows={5}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950"
                  placeholder="Skriv din besked her..."
                  required
                />
              </div>
              <div>
                <button className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Send besked
                </button>
              </div>
            </form>
          )}
        </Container>
      </Section>

             {/* FOOTER */}
       <footer className="border-t border-zinc-200 bg-white py-10 text-sm dark:border-zinc-800 dark:bg-zinc-950">
         <Container className="grid gap-8 sm:grid-cols-4">
           {/* Logo og beskrivelse */}
           <div className="sm:col-span-2">
             <a href="#top" className="text-lg font-extrabold">KostBoost<span className="text-emerald-500">.dk</span></a>
             <p className="mt-2 text-zinc-600 dark:text-zinc-300">Personlig kost- og træningsvejledning tilpasset dine mål</p>
           </div>
           
           {/* Hurtig navigation */}
           <div>
             <p className="font-semibold mb-3">Hurtig navigation</p>
             <div className="flex flex-col gap-2">
               <a href="#kostplaner" className="text-zinc-700 transition hover:text-emerald-700 dark:text-zinc-300">Ydelser</a>
               <a href="#abonnement" className="text-zinc-700 transition hover:text-emerald-700 dark:text-zinc-300">Priser</a>
               <a href="#kontakt" className="text-zinc-700 transition hover:text-emerald-700 dark:text-zinc-300">Kontakt</a>
             </div>
           </div>
           
           {/* Sociale medier og kontakt */}
           <div>
             <p className="font-semibold mb-3">Følg med</p>
             <div className="flex gap-3 mb-3">
               <a href="#" aria-label="TikTok" className="text-zinc-700 hover:text-emerald-700 transition">TikTok</a>
               <a href="#" aria-label="Instagram" className="text-zinc-700 hover:text-emerald-700 transition">Instagram</a>
             </div>
             <a href="mailto:hej@kostboost.dk" className="text-zinc-700 underline underline-offset-4 dark:text-zinc-300">hej@kostboost.dk</a>
           </div>
         </Container>
         
         {/* CVR og disclaimer */}
         <Container className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
             <div>
               <p>© {new Date().getFullYear()} KostBoost.dk – Alle rettigheder forbeholdes</p>
               <p>CVR: [Dit CVR-nummer]</p>
             </div>
             <p className="text-center sm:text-right">Kostvejledning er generel og ikke medicinsk rådgivning.</p>
           </div>
         </Container>
       </footer>
    </div>
  );
}
