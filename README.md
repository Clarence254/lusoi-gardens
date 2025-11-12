# Lusoi Gardens Website

A modern, responsive website for Lusoi Gardens resort built with Astro. The site showcases the resort's accommodations, leisure activities, nearby attractions, and provides contact information.

## Features

- **Responsive Design**: Mobile-friendly layout that works across all devices
- **Multiple Pages**:
  - Home page with hero slider and featured content
  - About page with resort information
  - Rooms page showcasing accommodations
  - Leisure Activities page highlighting on-site activities
  - Nearby Attractions page featuring local destinations
  - Contact page with contact form and map
- **Component-Based Architecture**: Reusable components for navigation, footer, and layouts
- **Modern Stack**: Built with Astro for optimal performance

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v4.16.19
- **Styling**: Custom CSS with Bootstrap-inspired components
- **JavaScript**: jQuery and various plugins for interactive features
- **Icons**: Ionicons, Flaticon, Icomoon
- **Maps**: Google Maps embed

## Project Structure

```
lusoi-gardens/
├── public/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/           # Image assets
│   └── fonts/            # Font files
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.astro  # Navigation component
│   │   └── Footer.astro  # Footer component
│   ├── layouts/          # Page layouts
│   │   └── BaseLayout.astro
│   └── pages/            # Route pages
│       ├── index.astro   # Home page
│       ├── about.astro
│       ├── rooms.astro
│       ├── leisure-activities.astro
│       ├── nearby-attractions.astro
│       └── contact.astro
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lusoi-gardens
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321` (or the next available port).

### Building for Production

Build the static site:
```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Alias for `dev`
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Pages

### Home (`/`)
Landing page featuring:
- Hero slider with resort imagery
- Featured services and amenities
- Room showcases
- Guest testimonials
- Photo gallery

### About (`/about`)
Information about Lusoi Gardens including:
- Welcome message
- Resort features and services
- Guest testimonials
- Photo gallery

### Rooms (`/rooms`)
Showcase of available accommodations with details and pricing.

### Leisure Activities (`/leisure-activities`)
Activities available at the resort:
- For Families & Kids: Trampoline Zone, Bouncing Castle, Picnic & Snack Corner
- For Adventurers: Mountain Bike Trails, Nature Walks, Photography Spots
- For Relaxation Seekers: Garden Lounges, Outdoor Café, Evening Bonfire

### Nearby Attractions (`/nearby-attractions`)
Information about nearby destinations:
- Equator Marker (20 km)
- Mount Kenya National Park (19 km)
- Mount Kenya Animal Orphanage (30 km)
- Ol Pejeta Conservancy (26 km)
- Ngare Ndare Forest Park (59 km)
- Baden-Powell's House, Nyeri (38 km)
- Samburu National Reserve (160 km)
- Meru National Park (160 km)

### Contact (`/contact`)
Contact page with:
- Contact information (address, phone, email)
- Contact form
- Google Maps embed showing location

## Components

### BaseLayout
Main layout component that wraps all pages, including:
- Navigation bar
- Page content slot
- Footer
- Meta tags and SEO

### Navbar
Navigation component with active page highlighting.

### Footer
Footer component with:
- Logo and tagline
- Useful links
- Contact information
- Social media links

## Customization

### Updating Content
- Edit page files in `src/pages/` to modify page content
- Update components in `src/components/` for site-wide changes
- Modify `src/layouts/BaseLayout.astro` for layout changes

### Styling
- Main stylesheet: `public/css/style.css`
- Additional CSS files in `public/css/`

### Images
- Add images to `public/images/`
- Reference them in pages using `/images/filename.jpg`

## Deployment

The site can be deployed to any static hosting service:

- **Netlify**: Connect your repository and deploy automatically
- **Vercel**: Import your repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Traditional Hosting**: Upload the `dist/` folder contents to your web server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software for Lusoi Gardens.

## Contact

For questions or support, contact:
- Email: admin@lusoigardens.com
- Phone: +254 722 345 678
- Location: Nyeri, Kenya

