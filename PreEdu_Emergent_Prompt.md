# 🎯 PROMPT UNTUK EMERGENT — PreE-du Website
> Gunakan prompt ini langsung di Emergent. Sudah dioptimasi untuk efisiensi token (~15 messages).

---

## MASTER PROMPT (Paste langsung ke Emergent)

---

### 🎓 PROJECT CONTEXT (Read this first — it shapes every decision)

This is a **non-commercial university social project** built by Indonesian college students as a community service initiative (*kegiatan pengabdian masyarakat / sosial project*). The team will **physically visit an orphanage (panti asuhan)** and use this website as a demo tool during their session with the kids.

**How it will be used in the real session:**
- College students (the facilitators) open the website on a laptop/projector
- They demo the **online game** to the kids on-screen first
- Then they immediately run the **real-life offline version** of the same activity with the kids using physical materials
- The whole session is collaborative, fun, and social — not solo learning

**Therefore:**
- The website is a **facilitation & demo tool**, not a self-study app
- It must look impressive and fun when projected on a screen in a room full of kids
- The real-life activity cards must be **clear and actionable** for college-student facilitators to read and execute quickly
- Keep everything warm, encouraging, and celebratory — these kids deserve the best experience

---

Build a fun, colorful, child-friendly educational web app called **PreE-du** for Indonesian orphanage kids (ages 6–12, SD level). Language: **Bahasa Indonesia only**. No login needed — guest mode only. Save progress to **localStorage** only (demo purposes).

---

### 🎨 VISUAL & THEME REQUIREMENTS
- Bright, playful color palette: use cheerful colors like orange, yellow, sky blue, purple, green
- Use **Lottie animations** or **CSS animations** for characters, rewards, and transitions
- Add a fun **mascot character** (e.g., a cute robot or owl) that reacts to correct/wrong answers
- Large buttons, big text (min 18px body), rounded corners everywhere
- Confetti/star burst animation when completing a module
- Mobile-friendly and responsive
- Use **Google Fonts**: "Nunito" for body, "Fredoka One" for headings
- Cartoon-style icons and illustrations (use free SVG/Lottie from LottieFiles or similar)

---

### 🏗️ APP STRUCTURE

**Homepage:**
- Big animated banner with PreE-du logo + mascot
- 3 big colorful cards for the 3 learning tracks:
  1. 🧠 **Berpikir Komputasional** (Computational Thinking)
  2. 🔍 **Berpikir Kritis** (Critical Thinking)
  3. 🎨 **Berpikir Desain** (Design Thinking)
- Progress bar per track (saved in localStorage)
- Fun tagline: *"Belajar sambil bermain — khusus untuk kamu!"*

---

### 📚 MODULE STRUCTURE (Apply to ALL 3 tracks)

Each track has **3 topics minimum**. Every topic follows this exact flow:

```
[Intro Animasi] → [Gameplay Online] → [Panduan Real Life] → [Selesai + Reward]
```

**Per topic page layout:**
1. **Intro** — Animated mascot explains the concept in simple Bahasa Indonesia (max 2 sentences, large font)
2. **Gameplay Online** — Interactive mini-game in the browser (see specs below)
3. **Tombol "Sekarang Kita Main Beneran! 🎉"** — Big button that reveals the Real Life section
4. **Real Life Activity Card** — Step-by-step offline activity using simple materials (paper, pencils, rulers, cards)
5. **Completion screen** — Stars (1–3), confetti animation, "Lanjut ke topik berikutnya" button

---

### 🧠 TRACK 1: BERPIKIR KOMPUTASIONAL
*(Reference: CS Unplugged — csunplugged.org)*

**Topik 1 — Mengurutkan Angka (Sorting)**
- **Online Game:** Cards with numbers appear on screen. Kids drag-and-drop to sort from smallest to largest. Add timer + score. 5 rounds, increasing difficulty.
- **Real Life Activity:** Print/write numbers 1–20 on paper pieces. Kids physically sort them on the floor from smallest to largest. Variation: sort by length of word, sort by number of letters in their names.
- **Materials:** Kertas, pulpen/spidol, gunting (optional)

**Topik 2 — Menemukan Pola (Pattern Recognition)**
- **Online Game:** Show a sequence of shapes/colors (e.g., 🔴🔵🔴🔵❓). Kid clicks the correct next shape. 10 rounds, patterns get harder.
- **Real Life Activity:** Kids clap hands / stomp feet in a pattern (clap-clap-stomp, repeat). One kid makes a pattern, others copy it. Then use colored paper pieces to make visual patterns.
- **Materials:** Kertas warna, tangan & kaki mereka sendiri

**Topik 3 — Instruksi Langkah demi Langkah (Algorithms)**
- **Online Game:** Guide a cute character through a maze by selecting direction arrows (up/down/left/right) in sequence before running. Like a simple block coding game.
- **Real Life Activity:** "Robot Friend" game — one kid is the robot, eyes closed. Others give step-by-step instructions ("maju 2 langkah", "belok kiri") to navigate to a target. 
- **Materials:** Ruangan / halaman, tali atau buku sebagai penanda jalan

---

### 🔍 TRACK 2: BERPIKIR KRITIS
*(Reference: Philosophy for Children / Socratic method adapted for kids)*

**Topik 1 — Mana yang Berbeda? (Odd One Out)**
- **Online Game:** Show 4 images, kid clicks the one that doesn't belong. Explain WHY after each answer (animated mascot gives reason). 8 rounds.
- **Real Life Activity:** Spread 5–6 real objects on a table (pencil, eraser, pen, book, apple). Kids discuss which doesn't belong and explain their reasoning out loud. Accept multiple valid answers.
- **Materials:** Benda-benda di sekitar kelas/ruangan

**Topik 2 — Fakta atau Opini? (Fact vs Opinion)**
- **Online Game:** Sentence appears on screen (e.g., "Kucing itu lucu" vs "Kucing adalah hewan"). Kid taps FAKTA or OPINI button. 10 rounds with explanation.
- **Real Life Activity:** Write 8 sentences on paper strips. Kids sort them into two piles: "Fakta" and "Opini". Then discuss why. 
- **Materials:** Kertas, pulpen, 2 kotak/wadah berlabel

**Topik 3 — Apa Akibatnya? (Cause & Effect)**
- **Online Game:** Show a scenario image (e.g., "Tidak minum air seharian"). Kid matches it to the correct effect from 3 options. 8 rounds.
- **Real Life Activity:** Write causes on one set of cards, effects on another. Kids match them like a card game. Then create their own cause-effect pairs.
- **Materials:** Kertas dipotong jadi kartu, pulpen

---

### 🎨 TRACK 3: BERPIKIR DESAIN
*(Reference: IDEO Design Thinking for Educators, Stanford d.school K12)*

**Topik 1 — Apa Masalahnya? (Empathy & Problem Finding)**
- **Online Game:** Show a character with a problem (e.g., backpack too heavy, can't reach the shelf). Kid selects from 3 options: what is the real problem? Mascot explains empathy.
- **Real Life Activity:** "Wawancara Mini" — Kids pair up. One asks: "Apa hal paling susah yang kamu lakukan setiap hari?" Other answers. Then they draw the problem on paper.
- **Materials:** Kertas, pensil/krayon

**Topik 2 — Ide Sebanyak Mungkin! (Ideation / Brainstorming)**
- **Online Game:** Timer appears (60 seconds). Kid clicks on as many idea bubbles as possible to "collect" them for a given problem. Fun, fast-paced clicking game.
- **Real Life Activity:** "Brainstorm Bintang" — Each kid gets a star-shaped paper. Write 1 problem in the center, then write/draw 5 solutions on each star point. No wrong answers!
- **Materials:** Kertas berbentuk bintang (bisa digambar), pensil warna/krayon

**Topik 3 — Buat dan Coba! (Prototype & Test)**
- **Online Game:** Drag-and-drop simple components to "build" a solution to a problem shown on screen (like building a toy design). Present it and get feedback score.
- **Real Life Activity:** Using paper and stationery, kids build a simple prototype (e.g., a paper bag, a bookmark with a name tag, a simple holder). Then they "test" it and tell the group what they'd improve.
- **Materials:** Kertas, gunting, selotip/lem, krayon/spidol

---

### 💾 SAVE & PROGRESS SYSTEM
- Use **localStorage** only
- Track: which topics completed, star rating per topic, total stars collected
- Homepage shows overall progress bar
- Add a "Trofi Ku 🏆" page showing all earned stars and badges

---

### 🚀 DEPLOYMENT
- Build as a **single HTML file** OR a simple **React/Vite app**
- Must be deployable to **GitHub Pages** (add instructions in README) — free, permanent link that can be shared with the orphanage
- Alternatively compatible with **Vercel free tier**
- No backend, no database, no auth required
- **Must work offline after first load** (use service worker or ensure assets are embedded) — orphanage may have unstable internet
- Add a simple **"Cetak Kartu Aktivitas"** (Print Activity Cards) button per topic so facilitators can print the real-life instructions beforehand

---

### ⚡ EFFICIENCY NOTES FOR EMERGENT
To stay within token budget, build in this order:
1. **Message 1–2:** Homepage + routing structure + design system (colors, fonts, mascot)
2. **Message 3–5:** Track 1 (Computational Thinking) — all 3 topics with online games
3. **Message 6–8:** Track 2 (Critical Thinking) — all 3 topics with online games
4. **Message 9–11:** Track 3 (Design Thinking) — all 3 topics with online games
5. **Message 12–13:** Real Life cards for all 9 topics
6. **Message 14:** Progress/save system + trophy page
7. **Message 15:** Final polish — animations, mascot reactions, confetti, deployment setup

---

### ✅ DEFINITION OF DONE
- [ ] 3 tracks visible on homepage with progress bars
- [ ] 9 topics total (3 per track), each with online game + real life card
- [ ] Mascot character with at least 3 states (idle, happy, sad)
- [ ] Confetti/celebration on topic completion
- [ ] localStorage saves progress
- [ ] Works on mobile browser
- [ ] Works well projected on a big screen / laptop screen in a room
- [ ] Deployable to GitHub Pages or Vercel
- [ ] All text in Bahasa Indonesia
- [ ] No login required
- [ ] Real life activity cards are printable / clearly readable by adult facilitators
- [ ] Works after first load even with unstable internet (assets embedded or cached)

---

### 👥 TONE REMINDER FOR EMERGENT
This is built **by students, for kids, as an act of care**. Every design choice, every word, every animation should feel like a gift — warm, joyful, and made with love. The kids at the orphanage deserve something that makes them feel seen and celebrated. Build it like it matters, because it does. 💛

---

*Prompt dibuat untuk PreE-du — Sosial Project Mahasiswa untuk Anak Panti Asuhan 🌟*
*"Belajar sambil bermain, bersama teman-teman baru dari kampus."*
