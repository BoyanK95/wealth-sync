# 🛠 Technical Implementation

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)


### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Authentication**: NextAuth.js v5 with Facebook, GitHub, and Discord providers
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: React Hooks + Context
- **Deployment**: Vercel
- **UI Components**: 
  - shadcn/ui for core components
  - Radix UI for primitive components
  - Sonner for toast notifications
  - Lucide for icons

### Project Structure
```
wealth-sync/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions and constants
│   ├── server/       # Server-side code
│   └── styles/       # Global styles and Tailwind config
├── prisma/           # Database schema and migrations
└── public/           # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- PostgreSQL database

### Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wealth-sync.git
   cd wealth-sync
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required variables in `.env`

4. Set up the database:
   ```bash
   yarn db:push
   ```

5. Start the development server:
   ```bash
   yarn dev
   ```

### Environment Variables
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: NextAuth secret key
- `FACEBOOK_CLIENT_ID`: Facebook OAuth client ID
- `FACEBOOK_CLIENT_SECRET`: Facebook OAuth client secret
- (See `.env.example` for full list)

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `yarn test`
5. Push to your fork: `git push origin feature/your-feature`
6. Create a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow the existing code style
- Use ESLint and Prettier for code formatting
- Write tests for new features

## 📚 Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)
- [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
