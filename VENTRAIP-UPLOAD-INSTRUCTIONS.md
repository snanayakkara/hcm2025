# VentraIP Upload Instructions - Heart Clinic Melbourne
**Domain: www.heartclinicmelbourne.com.au**

## 📦 Deployment Package Ready
✅ **File**: `hcm-deployment-20250816.zip` (192MB)  
✅ **Contents**: Complete production build with all assets  
✅ **Location**: `/Users/shane/SynologyDrive/Cloud/githubrepo/snanayakkara.github.io/hcm2025/`

## 🚀 Step-by-Step Upload Process

### Step 1: Access VentraIP Control Panel
1. **Login to VentraIP**: Visit [my.ventraip.com.au](https://my.ventraip.com.au)
2. **Navigate to cPanel**: Click "Manage Hosting" → "cPanel"
3. **Domain**: Ensure you're working with `heartclinicmelbourne.com.au`

### Step 2: Prepare for Upload
1. **Open File Manager** in cPanel
2. **Navigate to public_html** directory
3. **Clear existing files** (if any) - backup first if needed
4. **Verify you're in the root web directory**

### Step 3: Upload Deployment Package
1. **Click "Upload"** in File Manager
2. **Select file**: `hcm-deployment-20250816.zip`
3. **Wait for upload**: (~192MB, may take 5-10 minutes)
4. **Return to File Manager** when upload completes

### Step 4: Extract Files
1. **Select the ZIP file** in File Manager
2. **Click "Extract"** from the toolbar
3. **Choose "Extract to current directory"**
4. **Wait for extraction** to complete
5. **Delete the ZIP file** after successful extraction

### Step 5: Verify File Structure
Ensure these files are present in `public_html/`:
```
public_html/
├── index.html                    (Main entry point)
├── .htaccess                     (Apache configuration)
├── manifest.webmanifest          (PWA manifest)
├── share.html                    (Social sharing)
├── A4-Referral-Pad-update-Feb-2023.pdf
├── assets/                       (JS/CSS bundles)
│   ├── index-DdL8tWJO.css       (Main CSS ~83KB)
│   ├── index-WJv9CcJ6.js        (Main JS ~339KB)
│   ├── PatientInfo-z8um0gMe.js  (Patient info ~983KB)
│   ├── MobileLayout-BMopBGtW.js (Mobile layout ~584KB)
│   └── [other component files]
└── images/                       (47 medical images)
    ├── [doctor photos]
    ├── [procedure images]
    ├── icons/
    └── backups/
```

### Step 6: Set File Permissions
1. **Select all files and folders**
2. **Right-click** → "Change Permissions"
3. **Set permissions**:
   - **Files**: 644 (read/write for owner, read for others)
   - **Directories**: 755 (read/write/execute for owner, read/execute for others)
4. **Apply recursively** to all subdirectories

### Step 7: Configure SSL Certificate
1. **In cPanel, find "SSL/TLS"**
2. **Click "Let's Encrypt SSL"**
3. **Select your domain**: heartclinicmelbourne.com.au
4. **Include www subdomain**: www.heartclinicmelbourne.com.au
5. **Install certificate** (usually takes 5-10 minutes)

## ✅ Post-Upload Testing Checklist

### Immediate Tests
- [ ] **Homepage loads**: https://heartclinicmelbourne.com.au
- [ ] **WWW redirect works**: www.heartclinicmelbourne.com.au → heartclinicmelbourne.com.au
- [ ] **HTTPS enforced**: HTTP automatically redirects to HTTPS
- [ ] **No SSL warnings**: Green padlock in browser
- [ ] **All navigation links work**

### Core Functionality Tests
- [ ] **React Router working**: Refresh any page (should not get 404)
- [ ] **Learning Library**: All procedure pages load
- [ ] **Doctor profiles**: All doctor pages accessible
- [ ] **Referral form**: Form loads and appears functional
- [ ] **PDF download**: Referral pad PDF downloads correctly
- [ ] **Mobile responsive**: Test on phone/tablet

### Performance Tests
- [ ] **Page load speed**: Under 3 seconds on normal connection
- [ ] **Images loading**: All medical images display properly
- [ ] **No 404 errors**: Check browser console for missing assets
- [ ] **Caching active**: Static assets load quickly on second visit

## 🔧 Domain Configuration

### DNS Settings (if needed)
```
A Record:    @ → [VentraIP server IP]
CNAME:       www → heartclinicmelbourne.com.au
```

### Redirects to Configure
1. **WWW to non-WWW**: www.heartclinicmelbourne.com.au → heartclinicmelbourne.com.au
2. **HTTP to HTTPS**: Automatic with SSL certificate

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 404 Errors on Page Refresh
**Problem**: Direct URLs return 404 errors  
**Solution**: Verify `.htaccess` file is present in root directory

#### Mixed Content Warnings
**Problem**: HTTP resources on HTTPS site  
**Solution**: All resources should be relative URLs (already handled in build)

#### Large Files Not Loading
**Problem**: Some images or assets fail to load  
**Solution**: Check file permissions and server limits

#### SSL Certificate Issues
**Problem**: Browser shows "Not Secure"  
**Solution**: Wait for SSL propagation (up to 24 hours) or contact VentraIP support

## 📊 Site Specifications

| Metric | Value |
|--------|-------|
| **Total Size** | 192MB compressed (ZIP) |
| **Main JS Bundle** | 339KB (gzipped: ~104KB) |
| **Patient Info JS** | 983KB (gzipped: ~379KB) |
| **Mobile Layout JS** | 584KB (gzipped: ~119KB) |
| **CSS Bundle** | 83KB (gzipped: ~14KB) |
| **Images** | 47 medical procedure images |
| **File Count** | ~80 files total |

## 🎯 Final Validation

### Use DEPLOYMENT-CHECKLIST.md
After upload, work through the comprehensive checklist in:
`DEPLOYMENT-CHECKLIST.md`

This covers:
- ✅ Basic functionality testing
- ✅ Medical website features
- ✅ PWA capabilities
- ✅ Security verification
- ✅ Performance validation

## 📞 Support Resources

### VentraIP Support
- **Phone**: 1300 378 365 (24/7 Australian support)
- **Email**: support@ventraip.com.au
- **Live Chat**: Available through client portal

### Technical Support
- **Developer**: Shane Nanayakkara
- **Documentation**: See `CLAUDE.md` for development details
- **Backup**: Original source code in Git repository

## 🎉 Success Indicators

Your deployment is successful when:
1. ✅ **https://heartclinicmelbourne.com.au** loads the homepage
2. ✅ **React Router works** (no 404s on page refresh)
3. ✅ **All navigation functions** (learning library, doctors, referrals)
4. ✅ **Mobile responsive** on all devices
5. ✅ **SSL certificate active** (green padlock)
6. ✅ **No console errors** in browser developer tools

---

**Created**: August 16, 2025  
**Package**: hcm-deployment-20250816.zip (192MB)  
**Next Review**: After successful deployment