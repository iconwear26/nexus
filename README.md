# NexusFlow — Marketing Automation & n8n Growth Operating System

> **Autonomous marketing automation engineering for ambitious growth brands.** Eliminate manual busywork, protect paid ad budgets 24/7, publish organic content automatically, and follow up with high-intent inbound leads in under 90 seconds.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Verify `.env` in the root folder:
```env
PORT=3000
GEMINI_API_KEY="" # Optional: for custom Google GenAI copy generation
N8N_WEBHOOK_URL="http://localhost:5678/"
```

### 3. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. (Optional) Run the n8n Workflow Server
In another terminal:
```bash
n8n start
```
Open **[http://localhost:5678](http://localhost:5678)** to inspect, modify, or activate automation workflows.

---

## 📚 Complete Developer Handbook

For the complete technical guide, system architecture, database specifications, API references, and extension tutorials, please read:

👉 **[DEVELOPER_HANDBOOK.md](DEVELOPER_HANDBOOK.md)**

### Handbook Contents:
1. **System Overview & Architecture Diagram**
2. **Directory & File Layout**
3. **Local Development Setup**
4. **REST API Specification (14 Endpoints)**
5. **Persistence Engine (`data/*.json` & `server/db.ts`)**
6. **n8n Automation Pipelines (4 Production Blueprints)**
7. **Live Technical SEO & Google Indexing Engine (`server/seo.ts`)**
8. **Frontend UI & Design System (React 19 + Tailwind v4 + Theme Engine)**
9. **Developer Extension Guide (Adding Routes, Tabs, Workflows)**
10. **Quality Assurance & Testing (Type Safety + Puppeteer E2E)**
11. **Production Deployment & Scaling Roadmap**

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion.
* **Backend**: Node.js, Express, tsx.
* **AI Engine**: Google Gen AI SDK (`@google/genai` with `gemini-2.5-flash`) + Dynamic Contextual Fallback.
* **Automation**: Self-hosted n8n workflows (`workflows/*.json`).
* **Storage**: Atomic file-backed JSON database (`data/`).
* **SEO**: Live HTTP network crawler, DOM parser, Google Indexing API push gateway.

---

## 📋 Available Scripts

* `npm run dev` — Starts Express backend and Vite client.
* `npm run build` — Compiles the production bundle with Vite.
* `npm run lint` — Runs TypeScript type-checking (`tsc --noEmit`).
* `npm run clean` — Removes the `dist` build folder.
