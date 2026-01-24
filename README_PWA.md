# Progressive Web App (PWA) Setup

This Next.js application has been configured as a Progressive Web App with the following features:

## Features

### 1. **Web App Manifest** (`/public/manifest.json`)
   - Defines app metadata (name, icons, theme colors)
   - Enables "Add to Home Screen" functionality
   - Configures app shortcuts for quick access

### 2. **Service Worker** (`/public/sw.js`)
   - Implements offline functionality
   - Caches critical assets for faster loading
   - Provides runtime caching for network requests
   - Enables the app to work offline

### 3. **Custom Install Prompt** (`/components/pwa/install-prompt.tsx`)
   - Custom install banner that appears after 3 seconds
   - Only shows if the app is installable
   - Respects user preferences (won't show if dismissed)
   - Tracks installation status

### 4. **PWA Provider** (`/components/pwa/pwa-provider.tsx`)
   - Registers the service worker on app load
   - Wraps the app with PWA functionality
   - Manages install prompt display

## Installation & Testing

### Development
1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open Chrome DevTools → Application tab
3. Check:
   - **Manifest**: Should show app details
   - **Service Workers**: Should show registered worker
   - **Application → Installability**: Should show install criteria

### Testing Install Prompt
1. Open the app in Chrome/Edge (mobile or desktop)
2. The install prompt will appear after 3 seconds (if installable)
3. Click "Install" to add to home screen
4. The prompt won't show again after installation

### Testing Offline Mode
1. Open Chrome DevTools → Network tab
2. Enable "Offline" mode
3. Refresh the page
4. The app should still work using cached assets

## Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet

## PWA Requirements Met

- ✅ HTTPS (required for production)
- ✅ Web App Manifest
- ✅ Service Worker
- ✅ Responsive design
- ✅ Offline functionality
- ✅ Install prompt

## Customization

### Update App Icons
Replace `/public/images/logo.png` with your app icons:
- 192x192px for standard icon
- 512x512px for splash screen

### Modify Service Worker Cache
Edit `/public/sw.js` to:
- Add more assets to `PRECACHE_ASSETS`
- Change cache names for versioning
- Customize caching strategies

### Customize Install Prompt
Edit `/components/pwa/install-prompt.tsx` to:
- Change delay before showing (currently 3 seconds)
- Modify prompt styling
- Add custom analytics tracking

## Production Deployment

1. **Ensure HTTPS**: PWAs require HTTPS (except localhost)
2. **Build the app**: `npm run build`
3. **Test service worker**: Verify it registers correctly
4. **Test install prompt**: Ensure it works on target devices
5. **Verify manifest**: Check all icons and metadata

## Troubleshooting

### Install Prompt Not Showing
- Ensure you're on HTTPS (or localhost)
- Check browser console for errors
- Verify manifest.json is accessible
- Check if app is already installed

### Service Worker Not Registering
- Check browser console for errors
- Verify `/sw.js` is accessible
- Ensure service worker scope matches app structure
- Clear browser cache and try again

### Offline Mode Not Working
- Verify service worker is active
- Check cached assets in DevTools
- Ensure assets are being cached correctly
- Check network tab for failed requests

## Next Steps

1. Generate proper app icons (192x192, 512x512)
2. Add more assets to service worker cache
3. Implement background sync (if needed)
4. Add push notifications (optional)
5. Test on real devices
