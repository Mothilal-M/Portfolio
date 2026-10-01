# Video Production & Multimodal Developer Strategy

> **Site**: [mothilal.dev](https://mothilal.dev)  
> **Goal**: Establish immediate visual authority, boost recruiter response rate by 300%+, and qualify for Google Video Rich Search.

---

## 1. Video 1: 60-Second "Interactive 3D Portfolio" Showcase
**Best for**: LinkedIn Video Post, Twitter / X Tech Showcase, Peerlist, YouTube Shorts.  
**Aspect Ratio**: 16:9 (Desktop) or 1:1 / 4:5 (for mobile-first LinkedIn feed).  
**Target Duration**: 55 – 65 seconds.

### Shot-by-Shot Recording Script

| Timestamp | Screen Action | Voiceover / Text Overlay |
| :--- | :--- | :--- |
| **0:00 - 0:08** | Cursor moving across the hero section; 3D torus rotating and reacting to mouse physics; text scrambling on hover. | *"I rebuilt my developer portfolio with Next.js 16, React Three Fiber, and GSAP. Here is how it works under the hood at 60 frames per second."* |
| **0:08 - 0:20** | Smooth scrolling down to the Skills & Experience curtain stack. Show the ticker bands and glowing bento cards. | *"Every interaction is optimized: hardware-accelerated shaders, zero layout shift, and responsive dark-mode architecture."* |
| **0:20 - 0:38** | Scroll to `[04] — Work` and click into `10xMindPlay` and the FastAPI Architecture Case Study (`/writing`). Scroll through the code block. | *"Beyond the frontend, my core focus is scalable backend engineering. I architected async connection pooling and GCP Cloud Run microservices for high throughput."* |
| **0:38 - 0:50** | Switch to terminal or curl: run `curl -i https://mothilal.dev/api/v1/profile` and open `/resume`. Show instant response. | *"Recruiters and engineers can even inspect my profile directly via a live REST API or print a clean CV at `/resume`."* |
| **0:50 - 1:00** | Back to the Hero CTA: hover over "Resume / LinkedIn" and "Get in touch". | *"Check out the live build at mothilal.dev — open source on GitHub. Feedback is welcome!"* |

---

### Ready-to-Copy LinkedIn Post Copy

```markdown
🚀 I just launched my new engineering portfolio: https://mothilal.dev

As a Software Engineer at 10xscale.ai specializing in Python, FastAPI, and GCP cloud infrastructure, I wanted a portfolio that felt as engineered and reliable as the production backend systems I build.

⚡ Tech Stack Highlights:
• Next.js 16 (Turbopack) & TypeScript
• 3D WebGL Torus Canvas with React Three Fiber
• Smooth physics-driven choreography with GSAP
• Live Developer REST API endpoints (try: curl https://mothilal.dev/api/v1/profile)
• Deep technical case studies & RSS feed at /writing
• Instant indexation via IndexNow protocol

I've documented the entire architectural breakdown in my latest article: "Building an Interactive 3D Portfolio with Next.js 16, R3F, and GSAP".

Check out the live experience at mothilal.dev and let me know your thoughts!

#SoftwareEngineering #Python #FastAPI #NextJS #WebDevelopment #ThreeJS #FullStack #DeveloperPortfolio
```

---

## 2. Video 2: Technical Deep Dive (FastAPI + GCP Cloud Run Microservices)
**Best for**: YouTube, Loom, Embed in `/writing/architecting-scalable-fastapi-microservices-gcp`.  
**Duration**: 3 – 5 minutes.

### Key Outline
1. **The Problem**: Why default synchronous database pools fail when Cloud Run scales from 0 to 20 instances.
2. **The Architecture**:
   - `SQLAlchemy 2.0` + `asyncpg` async connection pooling.
   - Centralized lifespan handler for graceful startup/shutdown.
   - Redis token-bucket rate limiting to protect downstream services.
3. **The Deployment Pipeline**:
   - Multi-stage Docker container (`python:3.12-slim`).
   - Cloud Run service configuration and non-root security containerization.
4. **Benchmark**: Showing sub-40ms P99 latencies under concurrent load.

---

## 3. Recommended Recording Setup (Free & High Quality)

1. **Tool**: [OBS Studio](https://obsproject.com/) (Open Source, 1080p 60fps) or [Loom](https://www.loom.com/) / [Screen Studio](https://www.screen.studio/).
2. **Browser Window**:
   - Resolution: Set browser to `1920x1080` (16:9).
   - Hide bookmarks bar (`Ctrl+Shift+B` in Chrome/Edge).
   - Zoom level: Default `100%`.
3. **Cursor Settings**:
   - Keep cursor visible; mouse movements should be deliberate and smooth to showcase the custom magnetic cursor effect.
4. **Audio Settings**:
   - In OBS: Add a **Noise Suppression** filter (RNNoise) and a mild **Compressor** on your microphone input for studio clarity.
