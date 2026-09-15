// ! Testing
// import { defineConfig } from 'astro/config';
// import react from '@astrojs/react';

// export default defineConfig({
//   integrations: [react()],
// });

// ! Production
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), icon()],
  site: 'https://ctechintl.com',

  vite: {
    plugins: [tailwindcss()],
  },
});