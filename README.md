# 💬 Full-Stack Discord Clone 

A modern, full-stack, real-time communication platform engineered with Next.js App Router, custom WebSockets via Socket.io, WebRTC audio/video rooms powered by LiveKit, and scalable database management with Prisma ORM.

![Discord Clone Banner](https://img.shields.io/badge/Status-Production%20Ready-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js%2015+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Prisma](https://img.shields.io/badge/Prisma%20ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![LiveKit](https://img.shields.io/badge/LiveKit%20WebRTC-002B36?style=for-the-badge)

---

## 📌 Architectural & Feature Highlights

* **Real-Time Messaging:** Instant bidirectional message broadcasting via Socket.io with fallback to standard HTTP polling.
* **Direct Messaging & Conversations:** 1-on-1 private messaging channels between server members with conversation initialization logic.
* **WebRTC Voice & Video Rooms:** Real-time low-latency audio/video conference rooms and screen sharing powered by LiveKit.
* **Server & Channel Management:** Complete CRUD workflows for Servers, Text Channels, Audio Channels, and Video Channels.
* **Member Role & Permission Hierarchy:** Dynamic role management (`ADMIN`, `MODERATOR`, `GUEST`) with permission-gated actions (kick members, change roles, manage channels).
* **Media & File Attachments:** End-to-end image and PDF uploads using UploadThing.
* **Infinite Message Pagination:** Batch message retrieval using TanStack React Query (`useInfiniteQuery`) for optimized client-side performance.
* **Authentication & Identity:** Complete session management and user verification via Clerk with strict required-name provisioning.
* **Modern Next.js Architecture:** Implements asynchronous `searchParams` and `params` Promises for App Router compatibility.
* **Custom Database Driver:** Utilizes `@prisma/adapter-mariadb` with configured connection timeouts to prevent serverless race conditions and pool exhaustion.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router + Pages Router for WebSocket handling) |
| **Language** | TypeScript |
| **Database & ORM** | MySQL / MariaDB (Aiven) via Prisma ORM |
| **Real-Time Engine** | Socket.io (`socket.io`, `socket.io-client`) |
| **Audio / Video** | LiveKit WebRTC Cloud (`livekit-server-sdk`, `@livekit/components-react`) |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) |
| **File Storage** | UploadThing (`uploadthing`, `@uploadthing/react`) |
| **UI Components** | Radix UI, Lucide Icons, Shadcn UI, Tailwind CSS |
| **State & Cache** | TanStack React Query v5, Zustand |

---

## 🚀 Step-by-Step Local Setup Guide

Follow these instructions to run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/discord-clone.git
cd discord-clone
```

### 2. Install Dependencies

Install all packages using `--legacy-peer-deps` to ensure full compatibility across all UI and real-time packages (specifically bridging React 19 with older peer dependencies):

```bash
npm install --legacy-peer-deps
```

---

## 🔑 Environment Variables Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables to your `.env` file. *(Note: If deploying to Render or similar platforms, remove the double quotes `""` in their UI dashboard).*

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

# Database (MySQL / MariaDB via Aiven)
DATABASE_HOST="your-database-host"
DATABASE_PORT="14999"
DATABASE_USER="your-database-username"
DATABASE_PASSWORD="your-database-password"
DATABASE_NAME="defaultdb"
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/NAME?ssl-mode=REQUIRED"
DATABASE_CONNECT_TIMEOUT="15000"

# File Uploads (UploadThing)
UPLOADTHING_TOKEN="eyJ..."

# Video / Audio Calling (LiveKit)
LIVEKIT_API_KEY="API..."
LIVEKIT_API_SECRET="..."
NEXT_PUBLIC_LIVEKIT_URL="wss://your-project.livekit.cloud"

# Deployment / Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 📋 How to Acquire API Keys

<details>
<summary><b>1. Clerk Authentication</b></summary>

1. Sign up at clerk.com.
2. Create a new application (select **Email** and **Google/GitHub** if desired).
3. Under **Configure > User & authentication > User model**, ensure **First and last name** is enabled and set to **Required**.
4. In **Configure > Identifiers**, disable **Username** if you only want email authentication.
5. Copy your **Publishable Key** and **Secret Key** from the **API Keys** tab and paste them into `.env`.
</details>

<details>
<summary><b>2. MySQL / MariaDB Database (Aiven or Local)</b></summary>

1. Sign up at aiven.io or use any cloud/local MySQL service.
2. Create a new free **MySQL** service.
3. Once running, copy your `Host`, `Port`, `User`, `Password`, and `Service URI` (`DATABASE_URL`).
4. Paste these values into the corresponding database fields in your `.env`.
</details>

<details>
<summary><b>3. UploadThing (File & Media Storage)</b></summary>

1. Sign up at uploadthing.com.
2. Create a new project.
3. In the project dashboard, navigate to **API Keys**.
4. Copy the `UPLOADTHING_TOKEN` (or App ID / Secret) and add it to `.env`.
</details>

<details>
<summary><b>4. LiveKit (Real-Time Audio / Video)</b></summary>

1. Sign up at livekit.io and create a Cloud project.
2. Under **Project Settings > Keys**, generate a new Key pair.
3. Copy your `LiveKit URL` (starts with `wss://`), `API Key`, and `API Secret` into `.env`.
</details>

---

## 🗄️ Database Initialization & Migration

Once your `.env` file is filled with your database credentials, generate the Prisma client and push your schema to your database:

```bash
# Generate the Prisma Client
npx prisma generate

# Push the schema definitions directly to your database
npx prisma db push
```

*(Optional: Run `npx prisma studio` to inspect and modify database records directly in a browser interface).*

---

## 💻 Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Directory Overview

```text
├── app/                  # Next.js App Router (Pages, Layouts, Server Components)
│   ├── (auth)/           # Authentication route group (Sign-in & Sign-up)
│   ├── (invite)/         # Server invitation token dynamic routes
│   ├── (main)/           # Primary server, channel, and conversation views
│   ├── (setup)/          # User onboarding and initial server configuration
│   └── api/              # App Router API endpoints (UploadThing, LiveKit tokens)
├── components/           # Reusable UI & Business Logic Components
│   ├── chat/             # Chat inputs, message item rendering, headers
│   ├── media-room/       # LiveKit video/audio conference wrappers
│   ├── modals/           # Dialogs (Create Server, Channel, Invite, Delete)
│   ├── navigation/       # Server navigation sidebar and action triggers
│   └── server/           # Channel list, member list, and header components
├── hooks/                # Custom React hooks (Modal state, chat queries, socket)
├── lib/                  # Core utility modules (Prisma db client, current-profile)
├── pages/api/socket/     # Custom WebSocket routes running via Next.js Pages Router
├── prisma/               # Prisma schema definitions
└── public/               # Static assets
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues tab if you have suggestions.

## 📄 License

This project is licensed under the MIT License.