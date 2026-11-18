// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://deine-kirchen-erleben.netlify.app',
  // Alle Adressen enden mit "/" (z. B. /michaelskirche/klang/). Nicht ändern: steht auf den QR-Codes.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS direkt in die Seite schreiben: eine Anfrage weniger bei schwachem Empfang.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Audio nie als Base64 in die Seite einbetten, immer als eigene Datei ausliefern.
      assetsInlineLimit: 0,
    },
  },
});
