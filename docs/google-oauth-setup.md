# Google OAuth Setup Guide

## Why it's needed

Google OAuth lets students sign in with their Google account in one click — no password to remember. Without it, only email + password sign-in works.

---

## Step-by-step: Get Google OAuth credentials

### 1. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Name it `AbdOfPhysics` → **Create**

---

### 2. Enable the OAuth consent screen

1. In the left sidebar: **APIs & Services → OAuth consent screen**
2. Choose **External** → **Create**
3. Fill in:
   - **App name**: `AbdOfPhysics`
   - **User support email**: `abd161199@gmail.com`
   - **Developer contact email**: `abd161199@gmail.com`
4. Click **Save and Continue** through all remaining steps (you can skip adding scopes for now)
5. At the end, click **Back to Dashboard**

> **Publishing status**: While in "Testing" mode, only users you add under "Test users" can sign in. Add your own Google account there to test. When ready to go live, click **Publish App**.

---

### 3. Create OAuth 2.0 credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth 2.0 Client IDs**
3. Application type: **Web application**
4. Name: `AbdOfPhysics Web`
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google` ← for local development
   - `https://abdofphysics.in/api/auth/callback/google` ← for production (add when you have a domain)
6. Click **Create**
7. A popup shows your **Client ID** and **Client Secret** — copy both

---

### 4. Add credentials to .env.local

> ✅ **Already done** — real credentials are set in `.env.local` and `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED="true"`.

If you ever need to rotate credentials, update these three lines in `.env.local`:

```env
AUTH_GOOGLE_ID="your-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-your-client-secret"
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED="true"
```

---

### 5. Restart the dev server

```bash
# Stop the current server (Ctrl+C), then:
npm run dev
```

Google sign-in will now work at `http://localhost:3000/login` and `http://localhost:3000/register`.

---

## How it works in the codebase

```
User clicks "Continue with Google"
        ↓
NextAuth redirects to Google
        ↓
Google authenticates user → redirects to /api/auth/callback/google
        ↓
NextAuth PrismaAdapter creates/updates:
  - users table (name, email, image from Google profile)
  - accounts table (provider = "google", providerAccountId, tokens)
        ↓
JWT session created → user lands on /dashboard
```

The `Account` and `User` records are stored in `prisma/dev.db` (SQLite).

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Error 401: invalid_client` | Wrong/placeholder credentials | Re-check Client ID and Secret in .env.local |
| `redirect_uri_mismatch` | Redirect URI not added in Google Console | Add `http://localhost:3000/api/auth/callback/google` in the credentials page |
| `access_blocked` | App still in Testing mode | Add your Google account under "Test users" in OAuth consent screen |
| Button shows "(not configured)" | `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED` is `"false"` | Set it to `"true"` after adding real credentials |
