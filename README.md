# GreenDew Botanicals Website

Rebranded responsive static-exported Next.js App Router website for **GreenDew Botanicals** (formerly *Verdant Agro Exports*).

## Project Setup & Configuration

This project contains precompiled static export files. The codebase is optimized for:
- Root-relative subpath routing under `/greendew` to support GitHub Pages out of the box.
- Custom domain branding for `greendewbotanicals.com`.
- Unix LF newline compliance, stripped BOM characters, and a global capturing click interceptor to bypass Next.js client-side routing exceptions on subpath deployments.

## Getting Started Locally

To run a local static server to browse the site:

### Method 1: Using Node.js (Recommended)
If you have Node.js installed, serve the directory directly using `serve` via `npx`:
```bash
npx serve
```
This will host the site locally. Open the provided link adding `/greendew/` to the path (e.g., `http://localhost:3000/greendew/`).

### Method 2: Using Python
If you have Python installed, run the HTTP server module:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/greendew/`.

---

## Pushing to GitHub & Deploying to Vercel

### Step 1: Initialize Git & Commit
To push this directory to your remote repository:
```bash
git init
git add .
git commit -m "Initialize GreenDew Botanicals website with rebranded details and routing fixes"
```

### Step 2: Push to GitHub
Link the local repository to your remote GitHub repository and push:
```bash
git remote add origin https://github.com/ashwinnithi/greendew.git
git branch -M main
git push -u origin main
```

### Step 3: Publish on GitHub Pages
1. Go to your GitHub repository: `https://github.com/ashwinnithi/greendew`
2. Click **Settings** > **Pages** in the left sidebar.
3. Under **Build and deployment**:
   - Set **Source** to **Deploy from a branch**.
   - Set **Branch** to **`main`** and folder to **`/ (root)`**.
   - Click **Save**.
4. Within 1-2 minutes, your website will be live at `https://ashwinnithi.github.io/greendew/` with fully working client-side navigation!

### Step 4: Deploying on Vercel
1. Log in to Vercel and import the repository (`ashwinnithi/greendew`).
2. The included `vercel.json` contains configuration rewrites that automatically redirect the `/greendew` assets and links to the root path on Vercel.
3. In the project import screen, under **Build & Development Settings**:
   - Change the **Framework Preset** to **Other** (since this is a pre-compiled static export project).
4. Click **Deploy**. Vercel will instantly host your static site at the root domain!
