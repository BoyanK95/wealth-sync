# 💰 Wealth-Sync

**Wealth-Sync** is a unified financial dashboard that seamlessly syncs data from multiple stock and crypto exchanges—like **Binance**, **Trading212**, and more—and displays it in a beautifully designed, responsive interface.

<img width="1728" alt="Screenshot 2025-04-20 at 21 13 30" src="https://github.com/user-attachments/assets/b08fb321-ab49-471e-b227-3f9c2a31cfab" />


Built using the powerful **T3 Stack** (Next.js, tRPC, TailwindCSS, Prisma), Wealth-Sync offers a full-stack TypeScript experience with blazing-fast performance and type safety from front to back. Hosted on **Vercel** for zero-config deployments and global availability.

## ✨ Features

- 🔄 **Real-Time Market Data**  
  Pulls live pricing data from sources like Binance (more to come).

- 📊 **Multi-Exchange Support**  
  View assets from various platforms in one clean UI.

- 🎨 **Beautifully Crafted UI**  
  Minimal, modern, and responsive design using TailwindCSS.

- ⚡ **Powered by the T3 Stack**  
  Type-safe, scalable architecture with tRPC and Prisma.

- ☁️ **Deployed on Vercel**  
  Fast, serverless, and auto-scaling deployments.

## 🚀 Quick Start

1. Visit [Wealth Sync App](https://wealth-sync-lime.vercel.app/)
2. Sign up using your preferred authentication method
3. Connect your exchange accounts
4. Start tracking your portfolio in real-time

## 🔗 Links

- [Documentation](https://wealth-sync.vercel.app/docs)
<!-- - [Live Demo](https://wealth-sync.vercel.app) -->
- [Report Bug](https://github.com/boyank95/wealth-sync/issues)

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)  
- [tRPC](https://trpc.io/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Prisma](https://prisma.io/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vercel](https://vercel.com/) for deployment  

---

## 📦 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/BoyanK95/wealth-sync.git
cd wealth-sync

# 2. Install dependencies
yarn install

# 3. Apply migrations to the database
yarn prisma migrate dev

# 4. Start the dev server
yarn dev
