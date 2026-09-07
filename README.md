# WhereWent

A web app that plots the route you traveled on a map, using the GPS location and capture time embedded in your photos' EXIF data.

## Features

- Upload photos via drag-and-drop or a file picker
- Supports PNG / JPEG / HEIC / HEIF (HEIC is automatically converted for browser display)
- Extracts GPS coordinates and capture time from EXIF, then draws a chronological track (polyline) on the map
- Clicking a photo in the timeline at the bottom syncs the map and its popup
- Shows stats such as total distance traveled and the date range covered
- Photos missing location or timestamp data are listed with the reason they were skipped

## Tech stack

- React 19 + TypeScript
- Vite
- react-leaflet / Leaflet (map)
- exifr (EXIF parsing)
- heic2any (HEIC → JPEG conversion)
- zustand (state management)
- pnpm

## Setup

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build          # standard build
pnpm build:github   # GitHub Pages build (sets /WhereWent/ as the base path)
```

## Deploying to GitHub Pages

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`, which runs `pnpm run build:github` and deploys to GitHub Pages automatically.

In the repository, set Settings → Pages → Source to **GitHub Actions**.

To deploy manually instead:

```bash
pnpm run build:github
pnpm run deploy
```
