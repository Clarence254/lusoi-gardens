import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://lusoigardens.com',
  output: 'server', // Server-rendered mode required for API routes
  adapter: cloudflare(),
  // Uncomment below and comment out cloudflare() above to switch to Netlify
  // adapter: netlify(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['jquery', 'popper.js']
    },
    ssr: {
      noExternal: ['nodemailer']
    }
  }
});

