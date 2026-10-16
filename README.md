# ☕ Coffeo — Coffee Shop Management System

Sistem manajemen coffee shop full-stack dengan dashboard admin, katalog produk, dan integrasi upload gambar.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Tentang Project

**Coffeo** adalah sistem manajemen coffee shop yang dirancang untuk mempermudah operasional kedai kopi — mulai dari katalog produk, manajemen stok, sampai dashboard admin yang modern.

Project ini dibangun dengan **arsitektur monorepo** yang memisahkan **frontend** (Next.js 16) dan **backend** (Express 5), dengan fokus pada **clean architecture** dan **type safety** end-to-end.

---

## ✨ Fitur Utama

### 🎨 Frontend (Admin Dashboard)
- **Product Catalog** — CRUD lengkap dengan pagination, search, dan filter
- **Image Upload** — Upload gambar ke Cloudinary dengan preview & validasi
- **Order Management** — Kelola pesanan pelanggan
- **Dashboard Stats** — Statistik penjualan & performa produk
- **Authentication** — Login dengan Google OAuth via Better Auth
- **Responsive Design** — Layout adaptif untuk mobile, tablet, dan desktop
- **Dark Mode** — Tema gelap untuk kenyamanan mata

### ⚙️ Backend (REST API)
- **Pagination** — Query `page`, `limit`, `search`, `category`
- **Zod Validation** — Validasi request di semua endpoint
- **Error Handling** — Global error handler dengan tipe error konsisten
- **Authentication** — Session-based auth via Better Auth
- **Rate Limiting** — Proteksi dari brute force & spam
- **Cloudinary Integration** — Upload gambar ke CDN

### 🏗️ Arsitektur
- **Monorepo** — `frontend/` + `backend/` dalam satu repository
- **Type Safety** — Zod schema sebagai single source of truth
- **Clean Architecture** — Layer terpisah: UI → Hook → Service → API
- **React Query** — Cache, invalidation, dan optimistic update

---

## 🛠️ Tech Stack

### Frontend
| Tech | Fungsi |
|------|--------|
| **Next.js 16** | React framework (App Router, Turbopack) |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling utility-first |
| **shadcn/ui** | Komponen UI reusable |
| **TanStack Query** | Data fetching & cache |
| **React Hook Form** | Form management |
| **Zod v4** | Schema validation |
| **Better Auth** | Authentication (client) |
| **Cloudinary** | Image upload & CDN |
| **Sonner** | Toast notification |

### Backend
| Tech | Fungsi |
|------|--------|
| **Express 5** | Web framework |
| **TypeScript** | Type safety |
| **Prisma 7** | ORM |
| **PostgreSQL** | Database |
| **Zod v4** | Request validation |
| **Better Auth** | Authentication (server) |
| **Pino** | Logging |
| **Helmet** | Security headers |

---

## 📁 Struktur Project
```
coffee-shop/
├── frontend/ # Next.js app
│ ├── src/
│ │ ├── app/ # App Router
│ │ │ ├── (dashboard)/ # Admin area
│ │ │ ├── (marketing)/ # Public area
│ │ │ └── api/ # Next.js API routes
│ │ ├── components/ # React components
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # API service layer
│ │ ├── schemas/ # Zod schemas
│ │ ├── lib/ # Utilities
│ │ └── types/ # TypeScript types
│ └── next.config.ts
│
├── backend/ # Express API
│ ├── src/
│ │ ├── controllers/ # Request handlers
│ │ ├── services/ # Business logic
│ │ ├── routes/ # Route definitions
│ │ ├── middleware/ # Express middleware
│ │ ├── schemas/ # Zod schemas
│ │ ├── lib/ # Prisma, auth, env
│ │ └── index.ts
│ └── prisma/
│ ├── schema.prisma
│ ├── migrations/
│ └── seed.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v22+
- **pnpm** (recommended) atau npm/yarn
- **PostgreSQL** v16+
- **Cloudinary** account (free tier cukup)
- **Google OAuth** credentials

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/coffee-shop.git
cd coffee-shop
```

## 2. Setup backend
```
cd backend
pnpm install
```

### Buat file .env:
#### Database
```
DATABASE_URL="your-database-name".
```

#### Auth
``` env
BETTER_AUTH_SECRET="minimal-32-karakter-secret-key-anda".
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com".
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx".
```

#### App
```
PORT=3001
NODE_ENV="development"
```

### Jalankan migrasi & seed:
```
pnpm prisma migrate dev
pnpm prisma db seed
```

### Start backend:
```
pnpm dev
```

## 3. Setup Frontend
```
cd ../frontend
pnpm install
```

#### Buat file .env.local:
``` env
NEXT_PUBLIC_API_URL="http://localhost:3001".
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name".
CLOUDINARY_API_KEY="123456789012345".
CLOUDINARY_API_SECRET="your-api-secret".
```

#### Start frontend:
```
pnpm dev
```
