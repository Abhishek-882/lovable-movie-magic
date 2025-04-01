
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 215 30% 98%;
    --foreground: 224 71.4% 4.1%;
    
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    
    /* Changed primary color to a vibrant red tone common in Indian cinema themes */
    --primary: 350 87% 55%;
    --primary-foreground: 210 20% 98%;
    
    /* Changed secondary color to a complementary gold/yellow common in Indian decorative themes */
    --secondary: 45 100% 60%;
    --secondary-foreground: 220.9 39.3% 11%;
    
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    
    --accent: 350 87% 96%;
    --accent-foreground: 220.9 39.3% 11%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 350 87% 55%;
    
    --radius: 0.75rem;
  }

  * {
    @apply border-border;
  }
  
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }
  
  body {
    /* Changed background to a subtle gradient to make the site more colorful */
    @apply bg-background text-foreground bg-gradient-to-b from-background to-accent/30;
    letter-spacing: -0.011em;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .clip-text {
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  /* Added colorful glass effect commonly seen in modern Indian movie sites */
  .glass {
    @apply backdrop-blur-md bg-white/70 border border-white/20 shadow-sm;
  }
  
  .glass-dark {
    @apply backdrop-blur-md bg-foreground/5 border border-white/10 shadow-sm;
  }
  
  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary clip-text text-transparent;
  }
  
  .transition-all-200 {
    @apply transition-all duration-200 ease-in-out;
  }
  
  .transition-all-300 {
    @apply transition-all duration-300 ease-in-out;
  }
  
  .transition-transform-300 {
    @apply transition-transform duration-300 ease-in-out;
  }
}

/* Added colorful pulse animation for featured content */
@keyframes colorful-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  50% { box-shadow: 0 0 20px 5px rgba(239, 68, 68, 0.3); }
}

.pulse-primary {
  animation: colorful-pulse 2s infinite;
}

/* Vibrant hover effects for cards */
.card-hover {
  @apply transition-all duration-300;
}

.card-hover:hover {
  @apply shadow-lg shadow-primary/20 scale-[1.02] z-10;
}

/* MovieCard custom styling */
.movie-card {
  @apply overflow-hidden rounded-xl transition-all duration-300 bg-white shadow-md hover:shadow-xl;
}

.movie-card-image {
  @apply aspect-[2/3] w-full object-cover transition-transform duration-300;
}

.movie-card:hover .movie-card-image {
  @apply scale-105;
}

.movie-card-content {
  @apply p-4;
}

.movie-card-badge {
  @apply inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary/10 rounded-full hover:bg-primary/20 transition-colors;
}

/* BookMyShow-like theater seat layout */
.seat-layout {
  @apply my-8 rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-white;
}

.screen {
  @apply mx-auto mb-8 h-2 w-4/5 rounded-lg bg-gray-300 shadow-lg;
}

.screen-text {
  @apply mb-2 text-center text-xs font-medium uppercase tracking-widest text-gray-400;
}

/* Movie detail page */
.movie-backdrop {
  @apply absolute inset-0 z-0 h-full w-full;
}

.movie-backdrop-image {
  @apply h-full w-full object-cover;
}

.movie-backdrop-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20;
}

.movie-content {
  @apply relative z-10 container mx-auto flex h-full items-end;
}

.movie-poster {
  @apply mb-6 h-[280px] w-[200px] shrink-0 overflow-hidden rounded-lg shadow-xl md:mb-0 md:h-[360px] md:w-[240px];
}

.movie-details {
  @apply max-w-2xl;
}

.movie-tags {
  @apply mb-2 flex flex-wrap gap-2;
}

.movie-tag {
  @apply rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary;
}

.movie-title {
  @apply mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl;
}

.movie-meta {
  @apply mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600;
}

.movie-rating {
  @apply flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary;
}

.movie-overview {
  @apply mb-6 text-gray-700;
}

.movie-credits {
  @apply mb-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3;
}

.movie-credit-title {
  @apply text-xs font-semibold uppercase text-gray-500;
}

.movie-credit-value {
  @apply text-sm text-gray-800;
}

.movie-cta {
  @apply flex;
}

.movie-cta-button {
  @apply inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90;
}
