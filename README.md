# FitPlan.dk - Personlig Kost- og Træningsrådgivning

## Projektoversigt

FitPlan.dk er en moderne, responsiv hjemmeside der tilbyder personlig kost- og træningsrådgivning. Projektet er bygget med React og fokuserer på at hjælpe brugere med at nå deres sundheds- og fitnessmål gennem skræddersyede planer og professionel vejledning.

## Hovedfunktioner

### Kostplaner
- **Vægttab**: Kalorielette, mættende måltider
- **Muskelopbygning**: Proteinrigt og smart timing
- **Diabetes-venlig**: Fokus på blodsukker, kulhydrater og lav GI
- **Low Carb/Keto**: Minimalt kulhydrat, stabil energi
- **Vegetar/Vegansk**: Grønne, proteinrige måltider
- **Kombipakker**: Kost + træning i ét

### Træningsprogrammer
- **Hjemmetræning**: Uden udstyr
- **Fitnesscenter**: Basis og avancerede programmer
- **Niveauer**: Begyndere til øvede
- **Specialisering**: Mobilitet og genoptræning
- **Skræddersyet**: Personlig progression

### Abonnementsmuligheder
- **Basis**: 299 kr/md - Kostplan + månedlig justering
- **Plus**: 449 kr/md - Kost + træning + telefonsamtale
- **Premium**: 799 kr/md - Skræddersyet + ugentlig support

### Diabetes-specialisering
- Kulhydrattælling og måltidsplan
- Lav-GI og fiberrige valg
- Telefonisk sparring
- Hverdagsvenlige opskrifter

## Teknisk Stack

### Frontend
- **React 19.1.1** - Moderne React med hooks
- **Vite 7.1.3** - Hurtig build tool og dev server
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Framer Motion 12.23.12** - Smooth animationer og transitions

### Struktur
- **Single Page Application (SPA)** med smooth scrolling navigation
- **Responsivt design** der virker på alle enheder
- **Dark mode support** med automatisk tema-skift
- **Moderne UI/UX** med hover effects og micro-interactions

## Projektstruktur

```
FitPlan/
├── src/
│   ├── App.jsx          # Hovedkomponent med al funktionalitet
│   ├── main.jsx         # App entry point
│   └── main.js          # Alternativ entry point
├── index.html           # HTML template med Tailwind CSS
├── package.json         # Dependencies og scripts
├── yarn.lock           # Locked dependency versions
└── README.md           # Denne fil
```

## Kom i gang

### Forudsætninger
- Node.js (version 18 eller nyere)
- Yarn eller npm

### Installation
1. **Klon projektet**
   ```bash
   git clone [repository-url]
   cd FitPlan
   ```

2. **Installer dependencies**
   ```bash
   yarn install
   # eller
   npm install
   ```

3. **Start udviklingsserver**
   ```bash
   yarn dev
   # eller
   npm run dev
   ```

4. **Åbn i browser**
   - Lokal URL: `http://localhost:5173`
   - Vite hot reload er aktiveret

### Build kommandoer
```bash
# Build til produktion
yarn build

# Preview produktion build
yarn preview
```

## Design og UX

### Farvetema
- **Primær**: Emerald (grøn) - sundhed og vækst
- **Sekundær**: Zinc (grå) - moderne og professionel
- **Accent**: Hvid/sort for kontrast

### Komponenter
- **Responsive navigation** med hamburger menu på mobile
- **Card-baserede layouts** for overskuelighed
- **Smooth scrolling** mellem sektioner
- **Formularer** med validering og user feedback
- **Animationer** med Framer Motion for engagerende UX

## Responsivt Design

Projektet er fuldt responsivt og optimeret til:
- **Mobile**: 320px+ (hamburger menu, stacked layouts)
- **Tablet**: 768px+ (grid layouts, side-by-side content)
- **Desktop**: 1024px+ (fuld navigation, multi-column grids)

## Konfiguration

### Email Integration
- Kontaktformularer sender direkte til `hej@fitplan.dk`
- Ingen backend nødvendig - bruger `mailto:` links
- Automatisk formatering af beskedindhold

### Eksterne Links
- Alle produktlinks er konfigurerbare i `LINKS` objektet
- Nem at opdatere priser og URLs

## Performance

- **Lazy loading** af billeder
- **Optimerede animationer** med Framer Motion
- **Efficient React rendering** med hooks
- **CDN-baseret Tailwind CSS** for hurtig loading

## Deployment

Projektet kan deployes til enhver statisk hosting service:
- **Vercel**: Automatisk deployment fra Git
- **Netlify**: Drag & drop deployment
- **GitHub Pages**: Gratis hosting for open source
- **AWS S3 + CloudFront**: Enterprise løsning

## Fremtidige Forbedringer

- [ ] **CMS integration** for blog indhold
- [ ] **Betalingssystem** (Stripe/PayPal)
- [ ] **Bruger dashboard** med progress tracking
- [ ] **Push notifications** for motivation
- [ ] **Multi-language support** (engelsk/svensk)
- [ ] **PWA features** for offline support

## Support og Kontakt

- **Email**: hej@fitplan.dk
- **Website**: [FitPlan.dk](https://fitplan.dk)
- **Social Media**: TikTok, Instagram, YouTube

## Licens

Dette projekt er privat og alle rettigheder forbeholdes FitPlan.dk.

---

**Bemærk**: Kostrådgivning er generel vejledning og ikke medicinsk rådgivning. Konsulter altid din læge ved ændringer i behandling eller kost.
