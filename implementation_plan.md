# Portfolio Admin Backend with Firebase

Build a Firebase-powered admin dashboard at `/admin` to manage portfolio projects (CRUD + image upload + reordering), replacing the current hardcoded project array in `PortfolioGallery.tsx`.

## User Review Required

> [!IMPORTANT]
> **Firebase project required**: You'll need to create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and provide the config credentials. I'll set up the code to read from environment variables.

> [!IMPORTANT]
> **Admin password**: The admin page will be protected with a simple password gate (stored in `.env.local`). This is lightweight security — not a full auth system. Is a single shared password sufficient, or do you want Firebase Auth with email/password login instead?

## Open Questions

> [!IMPORTANT]
> **Image hosting**: Firebase Storage will be used for project screenshot uploads. Images currently live in `/public/images/work/`. Should we migrate the 3 existing projects to Firebase on setup, or keep them as-is and only use Firebase for new projects?

## Proposed Changes

### Firebase Setup

#### [NEW] `lib/firebase.ts`
- Firebase app initialization using env vars (`NEXT_PUBLIC_FIREBASE_*`)
- Export `db` (Firestore) and `storage` (Firebase Storage) instances

#### [MODIFY] [next.config.js](file:///c:/Users/USER/Downloads/brandme-main/next.config.js)
- Add Firebase Storage domain to `images.remotePatterns` so `next/image` can load uploaded screenshots

#### [MODIFY] [package.json](file:///c:/Users/USER/Downloads/brandme-main/package.json)
- Add `firebase` dependency

#### [NEW] `.env.local`
- Template with all required Firebase config keys + `ADMIN_PASSWORD`

---

### Firestore Data Layer

#### [NEW] `lib/projects.ts`
- `getProjects()` — fetch all projects from Firestore, ordered by `order` field
- `getProject(id)` — fetch single project
- `addProject(data)` — create new project document
- `updateProject(id, data)` — update existing project
- `deleteProject(id)` — delete project + its Storage image
- `reorderProjects(orderedIds)` — batch update `order` field
- `uploadProjectImage(file)` — upload to Firebase Storage, return public URL

Firestore schema per project document:
```
projects/{auto-id}
├── title: string
├── category: 'Business' | 'E-Learning' | 'Industrial'
├── description: string
├── image: string (Firebase Storage URL)
├── codeUrl: string
├── liveUrl: string
├── tags: string[]
├── order: number
├── createdAt: timestamp
└── updatedAt: timestamp
```

---

### Admin Dashboard

#### [NEW] `app/admin/page.tsx`
Protected admin page with:
- **Password gate**: Simple password input that checks against `NEXT_PUBLIC_ADMIN_PASSWORD` env var (stored in sessionStorage after successful login)
- **Project list**: Table/card view of all projects with edit/delete actions
- **Add Project button**: Opens a form modal
- **Drag-to-reorder**: Simple up/down arrow buttons to reorder projects
- **Image upload**: File input with preview before saving

#### [NEW] `app/admin/layout.tsx`
- Admin-specific layout (no Navbar/Footer, clean minimal UI)
- Dark admin theme consistent with site branding

#### [NEW] `components/admin/ProjectForm.tsx`
- Reusable form for both Add and Edit modes
- Fields: title, category (dropdown), description, image upload, code URL, live URL, tags (comma-separated input)
- Client-side validation
- Image preview with drag-and-drop support

#### [NEW] `components/admin/AdminHeader.tsx`
- Simple admin navigation bar with "← Back to Site" link and logout button

---

### Updated Public Portfolio

#### [MODIFY] [PortfolioGallery.tsx](file:///c:/Users/USER/Downloads/brandme-main/components/PortfolioGallery.tsx)
- Remove hardcoded `projects` array
- Fetch projects from Firestore using `getProjects()` on mount
- Add loading skeleton while data loads
- Keep existing filter, card, and modal UI intact
- Categories will be derived dynamically from fetched projects

---

## File Structure (new files)

```
brandme-main/
├── .env.local                          ← Firebase config + admin password
├── lib/
│   ├── firebase.ts                     ← Firebase init
│   └── projects.ts                     ← Firestore CRUD + Storage helpers
├── app/
│   └── admin/
│       ├── layout.tsx                  ← Admin layout (no nav/footer)
│       └── page.tsx                    ← Admin dashboard page
├── components/
│   └── admin/
│       ├── ProjectForm.tsx             ← Add/Edit project form
│       └── AdminHeader.tsx             ← Admin top bar
└── components/
    └── PortfolioGallery.tsx            ← Modified to fetch from Firestore
```

## Verification Plan

### Manual Verification
1. Start dev server → navigate to `/admin` → verify password gate blocks access
2. Enter correct password → verify project list loads with existing data
3. Add a new project with image upload → verify it appears on the public portfolio
4. Edit a project → verify changes reflect on public site
5. Delete a project → verify removal
6. Reorder projects → verify new order on public site
7. Check that the public portfolio page still works with loading states
