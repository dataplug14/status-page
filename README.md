# Usenubis Status Page

A bespoke status page built with Next.js that surfaces service availability, incident timelines, and upcoming maintenance for the Usenubis platform.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the page.

3. Create an optimized production build:

   ```bash
   npm run build
   npm run start
   ```

## Project structure

- `src/app` – Application routes powered by the Next.js App Router.
- `src/components` – UI building blocks for status badges, component cards, and timelines.
- `src/lib` – In-memory domain data and formatting helpers.
- `public` – Static assets such as the site favicon.

## Customizing data

Replace the sample data in `src/lib/status-data.ts` with live data pulled from your monitoring pipeline or database. The structure is intentionally simple, so you can wire it up to APIs, webhooks, or scheduled jobs without major refactors.
