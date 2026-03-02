# 🚀 Product Plan Launch

Product Plan Launch is an execution-focused planning tool built to help makers turn ideas into shipped products.  
It emphasizes **clear steps, daily execution, and real progress** — without bloated dashboards or fake productivity metrics.

---

## ✨ What it does

- Create structured product plans
- Break plans into phases and actionable steps
- Track execution with clear states: **TODO → DOING → DONE**
- Visualize progress at a glance
- Safely delete plans with confirmation

---

## 🧠 Philosophy

> Planning only matters if it leads to execution.

This project is intentionally minimal and opinionated:
- No cluttered project management features
- No vanity analytics
- No unnecessary configuration

Just **focus, momentum, and shipping**.

---

## 🏗️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Prisma ORM
- **Architecture**: Server Components + Server Actions

---

## 📁 Project Structure


app/
├─ page.tsx # Home (plans overview)
├─ plan/ # Plan execution pages
├─ today/ # Daily execution view
└─ layout.tsx # App layout

components/
├─ home/ # Home UI
├─ plan/ # Plan & phase components
├─ layout/ # Navigation
└─ ui/ # Reusable UI primitives

lib/
└─ db.ts # Prisma database client

prisma/
└─ schema.prisma # Database schema


---

## ⚙️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/product_plan_launch.git
cd product_plan_launch
2. Install dependencies
npm install
3. Configure environment

Create a .env file:

DATABASE_URL="your_database_url"
4. Generate Prisma client
npx prisma generate
5. Run migrations
npx prisma migrate dev
6. Start the development server
npm run dev

Open http://localhost:3000 in your browser.

🔐 Data Safety

Destructive actions require confirmation

All mutations run on the server

No unsafe client-side data handling

🚧 Status

Active development.

Planned improvements:

Plan duplication

Weekly review summaries

AI-assisted step generation

Lightweight execution insights

