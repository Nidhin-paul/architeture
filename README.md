# Atelier Vanguard — Luxury Architecture Practice & Monograph

An international luxury architecture studio and spatial design web application featuring an immersive cinematic 3D scroll experience, physical pivot doors, horizontal monograph archive, and dynamic lighting.

---

## Key Features

- **Cinematic 3D Scroll Journey**:
  - WebGL / Three.js sunlit brutalist architectural pavilion with reflective pool, travertine limestone textures, and physical double pivot entrance doors.
  - Smooth camera progression from exterior aerial perspective, gliding into the building entrance portal and revealing the illuminated interior spatial gallery.
- **Horizontal Project Monograph Gallery**:
  - Natural horizontal carousel with mouse wheel glide, touch support, Framer Motion spring tab filtering, and high-resolution plate modal triggers.
- **Studio Philosophy & Accolades**:
  - Three editorial pillars (*Vision*, *Precision*, *Purpose*) with interactive grayscale-to-color plates.
  - Animated live stat counters (*15+ Years*, *120+ Projects*, *80+ Designers*, *12 Countries*).
- **Interactive Practice & Services**:
  - Dynamic image reveals on discipline hover (*Architecture*, *Interior Design*, *Master Planning*, *Landscape*, *Management*, *Advisory*).
- **Architectural Journal & Essays**:
  - Monograph dispatch articles on board-formed concrete massing and obsidian reflection pools.
- **Luxury Light Editorial Aesthetic**:
  - Curated warm alabaster (`#F9F8F6`), limestone (`#F2EFE9`), obsidian ink (`#181614`), and champagne bronze (`#9E7D47`) color harmony with Cormorant Garamond & Inter typography.
- **Direct Commission Inquiry System**:
  - Full-stack consultation form with Express, TypeScript, and MongoDB storage.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, React 19)
- **3D Engine**: Three.js
- **Animations**: Framer Motion 12
- **Smooth Scroll**: Lenis Scroll
- **Styling**: Tailwind CSS & Vanilla CSS Variables
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js & Express
- **Language**: TypeScript
- **Database**: MongoDB via Mongoose
- **CORS & Validation**: Configured for secure cross-origin communication

---

## Quick Start

### 1. Prerequisites
- Node.js (v18.17+ or v20+)
- MongoDB running locally on port `27017` (or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds sample luxury architectural commissions
npm run dev      # Starts API server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts Next.js client on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## License
MIT
