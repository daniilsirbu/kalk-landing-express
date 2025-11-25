# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KALK is a landing page for an AI construction estimator tool. The project consists of:
- A static HTML landing page (`index.html`) with Three.js 3D visualization
- An Express.js backend (`server.js`) that handles form submissions
- Supabase integration for storing lead data

## Architecture

### Backend (server.js:1-44)
- Express.js server with CORS enabled
- Single API endpoint: `POST /api/submit` (server.js:16-39)
- Stores lead submissions in Supabase `leads` table with fields:
  - `company_name`: Company name
  - `email`: Work email
  - `phone`: Phone number
  - `division`: Construction division selection

### Frontend (index.html)
- Single-page application with no build process
- Three.js orthographic 3D floor plan visualization with shader-based room scanning animation
- GSAP for UI animations and transitions
- Modal form that submits to the Express backend at `http://localhost:3000/api/submit` (index.html:343)
- **Important**: When deploying, update the API URL in index.html:343 to point to production endpoint

### Environment Variables (.env)
Required environment variables:
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_KEY`: Supabase anon/public key
- `DATABASE_URL`: PostgreSQL connection string (optional, not used in current code)
- `PORT`: Server port (defaults to 3000)

## Development Commands

### Starting the server
```bash
node server.js
```
The server will run on port 3000 (or the PORT specified in .env).

### Installing dependencies
```bash
npm install express cors dotenv @supabase/supabase-js
```

### Viewing the application
Open `index.html` in a browser. The page makes API calls to `http://localhost:3000`.

## Database Schema

The Supabase `leads` table should have these columns:
- `company_name` (text)
- `email` (text)
- `phone` (text)
- `division` (text)

## Deployment Notes

1. Update the fetch URL in `index.html:343` from `http://localhost:3000/api/submit` to your production API endpoint
2. Ensure Supabase credentials are properly configured in production environment
3. The frontend (index.html) can be served statically from any web server or CDN
4. The backend (server.js) needs to be deployed to a Node.js hosting environment
