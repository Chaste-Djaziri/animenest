<div align="center">
  <a href="https://skyanime.com" target="_blank">
    <img src="https://github.com/EternalAnime/skyanime-best-verse-/blob/main/public/android-chrome-512x512.png" alt="Logo" width="140" height="140">
  </a>
🌌 SkyAnime
The Future of Anime Streaming — Open Source & Ad-Free

<p> Built with <strong>Next.js 14</strong>, integrated with <strong>AniList</strong>, and powered by <strong>Consumet API</strong> & <strong>Anify</strong> — SkyAnime delivers a seamless, beautiful, and blazing-fast anime experience. </p>
🌍 Visit SkyAnime • 💬 Join Discord • 📸 Instagram

</div>
🧩 What is SkyAnime?
SkyAnime is a powerful and modern anime streaming platform with an intuitive UI, fast performance, and zero ads. Whether you're on mobile, desktop, or using it as a PWA — it just works. With full AniList support, your anime journey is always tracked, organized, and personalized.

⚙️ Built With
Next.js 14 – blazing-fast SSR & App Router

NextUI – sleek, customizable components

MongoDB & Redis – data storage + caching

AniList & Anify – profile syncing & metadata

Consumet API – multi-provider anime support

✨ Core Features
🚫 100% Ad-Free

🔁 Auto Play Next Episode

🕒 Skip OP / ED Button

📱 PWA (Installable like an App)

💾 Watch History & Tracking (via AniList)

⚡ Instant Load Speeds (thanks to Redis caching)

🎯 Scene-based Search (Coming Soon!)

🧠 Smart Recommendations

🌐 Multi-Provider Compatibility

📍 Upcoming Roadmap
⬜ Download Episodes

⬜ Disqus-powered Comment System

⬜ AniList User Dashboard

⬜ Full Anime Stats & Progress

⬜ Watchlist Display

⬜ Scene Search by Dialogue / Moments

⬜ Manga Reader Support(soon)

⬜ Comick

⬜ Mangadex

⬜ More...

✅ Episode Tracker & Profile Pages

🛠️ Setup & Development
🔐 Environment Variables
Create a .env file and include the following:

env
Copy
Edit
# Redis (Optional)
REDIS_URL="Your Redis URL"

# AniList API
GRAPHQL_ENDPOINT=https://graphql.anilist.co
ANILIST_CLIENT_ID="Your AniList App ID"
ANILIST_CLIENT_SECRET="Your AniList Secret"

# NextAuth
NEXTAUTH_SECRET="Generate using: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000 OR your deployed domain"

# Proxy (Optional)
NEXT_PUBLIC_PROXY_URI="(Optional)"

# Consumet API
CONSUMET_URI="Your own hosted Consumet API base URL"

# MongoDB
MONGODB_URI="Your MongoDB URI"

# Deployment URLs
NEXT_PUBLIC_DEV_URL="http://localhost:3000"
NEXT_PUBLIC_PRODUCTION_URL="https://yourdomain.com"
Also, in AniList Developer Console, add:

Copy
Edit
Redirect URI: https://yourdomain.com/api/auth/callback/AniListProvider

🤝 Contributing
Contributions, ideas, or bug fixes are always welcome!

Fork the project

Create a new branch

Make your changes

Submit a pull request

Or just give us a ⭐ and share with friends — that helps too!

📬 Feature suggestions? DM us on Instagram @its.dark.devil

📬 Contact
Instagram: @the._.voidborn

Discord Server: Join SkyAnime discord.gg/soupfr

Official Site: https://skyanime.com

<div align="center">
🌀 Made with love by anime fans for anime fans.
🚀 Powered by open-source.
🌌 Experience the best of anime — with SkyAnime.

</div>
