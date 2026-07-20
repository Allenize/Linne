<h1 align="center">Linne</h1>

<p align="center">
  Personal portfolio of <strong>John Allen A. Guerra</strong> — BSIT graduate, developer, and builder.
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a> ·
  <a href="#project-structure">Project Structure</a>
</p>

---

## Overview

Linne is a personal portfolio site built with **Next.js** and **Tailwind CSS**. It presents an about section, education and certifications, technical skills, a projects showcase, a live GitHub contributions graph, and a contact form — all wrapped in animated, interactive UI.

## Features

- **Hero & About** — introduction, bio, and career stats (degree, graduation year, certifications, projects)
- **Education & Certifications** — tabbed display backed by structured data
- **Skills** — categorized list of languages, technologies, and tools
- **Projects showcase** — detailed project cards (description, screenshots, tech stack, live/GitHub links), including featured work like *Artistic Vision* and *Adarna*
- **Live GitHub contributions graph** — fetched server-side from the GitHub contributions API
- **Contact form** — sends messages via EmailJS, protected with reCAPTCHA
- **Polished interactions** — tilt cards, magnetic buttons, scroll progress indicator, and page transitions via Framer Motion

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** for animation
- **Lucide React** / **React Icons** for iconography
- **EmailJS** for the contact form
- Deployed on **Vercel**

## Getting Started

### Clone and install

```bash
git clone https://github.com/Allenize/Linne.git
cd Linne
npm install
```

### Configure environment

The contact form uses EmailJS and Google reCAPTCHA. If you fork this project, replace the service ID, template ID, and public key in `src/components/Contact.tsx` with your own credentials rather than reusing the ones committed in this repo.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
Linne
├── public/
│   ├── certifications/     # Certification images
│   ├── education/          # Education-related assets
│   ├── projects/           # Project screenshots, logos, nav icons
│   ├── fonts/
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── page.tsx         # Home (Navbar, Hero, GitHub contributions, Footer)
│   │   ├── about/           # About page
│   │   ├── projects/        # Projects page
│   │   ├── skills/          # Skills page
│   │   ├── contact/         # Contact page
│   │   └── layout.tsx       # Root layout & metadata
│   ├── components/          # Hero, About, Projects, Skills, Contact, Navbar,
│   │                        # Footer, GithubContributions, TiltCard, Magnetic, etc.
│   ├── data/
│   │   └── index.ts         # Skills, projects, education, and nav content
│   └── types/
│       └── index.ts         # Shared TypeScript types
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Contributing

This is a personal portfolio, so it isn't generally open to external contributions. Feel free to fork it for your own use.

## License

No license file is currently included in this repository, so the project defaults to standard copyright — all rights reserved unless the maintainer adds a license.
