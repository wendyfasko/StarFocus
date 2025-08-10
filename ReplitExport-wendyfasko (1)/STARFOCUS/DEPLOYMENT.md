# StarFocus - Vercel Deployment Guide

## Quick Deployment

### 1. Connect Repository to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository

### 2. Configure Project Settings

Vercel should automatically detect the configuration from `vercel.json`. If needed, set:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Root Directory**: `.` (leave empty)

### 3. Environment Variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

```
NODE_ENV=production
```

### 4. Deploy

Click "Deploy" - Vercel will build and deploy automatically.

## What's Configured

✅ **Serverless API**: All API routes handled by `/api/index.ts`
✅ **Static Assets**: Frontend built to `/dist/public`
✅ **CORS**: Properly configured for cross-origin requests
✅ **TypeScript**: Full type safety with build-time checking
✅ **Modern Build**: Optimized bundles with code splitting

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/default-user` - Get default user
- `GET /api/user/:id/progress` - Get user progress
- `PATCH /api/user/:id/progress` - Update progress
- `POST /api/game-sessions` - Create game session
- `POST /api/text-content` - Save text content
- `POST /api/speech-recordings` - Save speech recordings

## File Structure for Deployment

```
starfocus/
├── api/
│   └── index.ts          # Vercel serverless function
├── client/               # React frontend source
├── dist/public/          # Built frontend (auto-generated)
├── vercel.json          # Vercel configuration
├── .vercelignore        # Files to ignore in deployment
└── README.md            # Documentation
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Verify `vercel.json` configuration

### API Not Working
- Check function logs in Vercel dashboard
- Verify CORS settings
- Test API endpoints individually

### Assets Not Loading
- Confirm build output in `dist/public`
- Check asset paths and imports
- Verify static file routing

## Production Features

- **Automatic HTTPS**: Vercel provides SSL certificates
- **Global CDN**: Fast loading worldwide
- **Automatic Deployments**: Deploy on git push
- **Preview Deployments**: Test branches before merging
- **Analytics**: Built-in performance monitoring

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Vercel handles SSL automatically

Your StarFocus app will be available at:
- Default: `https://your-project.vercel.app`
- Custom: `https://your-domain.com`