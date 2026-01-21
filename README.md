# Guitar Tabber

A simple web-based guitar tab editor with URL-based sharing. Type or paste your guitar tablature, and the URL automatically updates so you can share it with anyone.

## Features

- **Instant sharing** - The tab is compressed and stored in the URL hash, so you can share by copying the link
- **No account required** - Everything is stored in the URL, no backend needed
- **Browser history support** - Back/forward navigation works as expected

## Usage

1. Type or paste your guitar tab in the editor
2. Click "Copy Link" to copy the shareable URL
3. Send the link to anyone - they'll see your exact tab

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- LZ-string (URL compression)
