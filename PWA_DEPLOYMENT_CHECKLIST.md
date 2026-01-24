# PWA Deployment Checklist

## Requirements for PWA Install Prompt to Work

### 1. **HTTPS is REQUIRED** ✅
- PWAs **MUST** be served over HTTPS (except localhost)
- Check your deployment URL starts with `https://`
- If using HTTP, the install prompt will **NOT** appear

### 2. **Manifest.json Must Be Accessible** ✅
- Visit: `https://yourdomain.com/manifest.json`
- Should return valid JSON (not 404)
- Check browser console for manifest errors

### 3. **Service Worker Must Register** ✅
- Open DevTools → Application → Service Workers
- Should show "activated and running"
- Check console for `[PWA] Service Worker registered`

### 4. **Icons Must Be Correct Size** ⚠️
- Current: Using `/images/logo.png` for both 192x192 and 512x512
- **Recommended**: Create proper icon sizes:
  - 192x192px icon
  - 512x512px icon
- Icons should be square PNG files

### 5. **Check Installability**
- Open Chrome DevTools → Application → Manifest
- Should show "Add to homescreen" is available
- Check for any errors or warnings

## Debugging Steps

### Step 1: Check Console Logs
Look for these logs in browser console:
- `[PWA] Service Worker registered: https://yourdomain.com/`
- `[PWA] beforeinstallprompt event fired` (if installable)
- `[PWA] Showing install prompt` (after 3 seconds)

### Step 2: Verify Manifest
1. Open DevTools → Application → Manifest
2. Check:
   - ✅ Manifest is valid
   - ✅ Icons are loaded
   - ✅ No errors shown

### Step 3: Check Service Worker
1. Open DevTools → Application → Service Workers
2. Should show:
   - Status: "activated and running"
   - Scope: `https://yourdomain.com/`

### Step 4: Test Install Prompt
1. Clear browser cache
2. Visit your deployed site
3. Wait 3 seconds
4. Install prompt should appear at bottom-right

## Common Issues

### Issue: Install prompt doesn't appear
**Solutions:**
- ✅ Ensure HTTPS is enabled
- ✅ Check manifest.json is accessible
- ✅ Verify service worker is registered
- ✅ Check browser console for errors
- ✅ Try in Chrome/Edge (best PWA support)

### Issue: "beforeinstallprompt event not fired"
**Possible causes:**
- Not on HTTPS
- Manifest.json not accessible
- Icons not correct size
- Already installed
- Browser doesn't support PWA

### Issue: Service Worker not registering
**Solutions:**
- Check `/sw.js` is accessible
- Verify service worker file exists in `public/` folder
- Check browser console for errors
- Ensure you're in production mode (not development)

## Testing Checklist

- [ ] Site is served over HTTPS
- [ ] `/manifest.json` is accessible
- [ ] `/sw.js` is accessible
- [ ] Service worker registers successfully
- [ ] Icons are correct size (192x192, 512x512)
- [ ] Install prompt appears after 3 seconds
- [ ] Can install app successfully
- [ ] App works offline (after installation)

## Browser Support

- ✅ Chrome/Edge (Desktop & Mobile) - Full support
- ✅ Safari (iOS 11.3+) - Limited support
- ✅ Firefox - Limited support
- ⚠️ Some browsers may not show install prompt

## Quick Test Commands

```bash
# Check if manifest is accessible
curl https://yourdomain.com/manifest.json

# Check if service worker is accessible
curl https://yourdomain.com/sw.js

# Check HTTPS
curl -I https://yourdomain.com
```

## Next Steps

1. **Generate proper icons:**
   - Create 192x192px PNG icon
   - Create 512x512px PNG icon
   - Update manifest.json with correct paths

2. **Test on mobile:**
   - Install prompt works best on mobile devices
   - Test on Android Chrome
   - Test on iOS Safari

3. **Monitor console:**
   - Check for any errors
   - Verify all PWA logs appear
   - Test install flow
