# VentraIP Deployment Checklist - Heart Clinic Melbourne

## Pre-Deployment Preparation

### ✅ Local Development
- [ ] All features tested and working locally
- [ ] TypeScript compilation successful (`npm run typecheck`)
- [ ] Linting passed (`npm run lint`)
- [ ] Production build successful (`npm run build`)
- [ ] Build output tested (`npm run preview`)

### ✅ Build Analysis
- [ ] **Total build size**: ~182MB (includes large image assets)
- [ ] **Main JS bundle**: ~1.66MB (474KB gzipped)
- [ ] **Main CSS bundle**: ~86KB (14KB gzipped)
- [ ] **HTML entry**: ~5.3KB (1.7KB gzipped)
- [ ] Build includes `.htaccess` file for SPA routing
- [ ] PWA manifest file present

### ✅ VentraIP Account Setup
- [ ] Business Hosting account activated
- [ ] Growth Plan selected (recommended for 182MB site)
- [ ] Domain configured (heartclinicmelbourne.com.au)
- [ ] cPanel access confirmed
- [ ] SSL certificate requested/activated

## Deployment Process

### ✅ File Upload
- [ ] Access cPanel File Manager
- [ ] Navigate to `public_html` directory
- [ ] Upload all contents from `dist/` folder:
  - [ ] `index.html` (main entry point)
  - [ ] `assets/` folder (JS/CSS bundles)
  - [ ] `images/` folder (47 medical images)
  - [ ] `manifest.webmanifest` (PWA manifest)
  - [ ] `.htaccess` (Apache configuration)
  - [ ] `share.html` (social sharing page)
  - [ ] `A4-Referral-Pad-update-Feb-2023.pdf` (referral form)

### ✅ File Permissions
- [ ] Set file permissions to 644 for all files
- [ ] Set directory permissions to 755 for all folders
- [ ] Verify `.htaccess` file is readable by Apache

### ✅ Apache Configuration
- [ ] `.htaccess` file properly uploaded to root directory
- [ ] SPA routing rules active (test by refreshing on any page)
- [ ] Security headers implemented
- [ ] Gzip compression enabled
- [ ] Cache headers configured for static assets

## Post-Deployment Testing

### ✅ Basic Functionality
- [ ] **Homepage loads**: https://heartclinicmelbourne.com.au
- [ ] **SSL certificate active**: HTTPS working without warnings
- [ ] **Navigation working**: All menu items functional
- [ ] **React Router working**: Page refresh works on all routes
- [ ] **Mobile responsive**: Test on various screen sizes

### ✅ Core Features
- [ ] **Learning Library**: All procedure pages load correctly
- [ ] **Referral Form**: Form submission works
- [ ] **Doctor Profiles**: All doctor pages accessible
- [ ] **PDF Downloads**: Referral pad PDF downloads correctly
- [ ] **Search Functionality**: Site search works properly

### ✅ PWA Features
- [ ] **Manifest loading**: Check browser dev tools for manifest
- [ ] **Service Worker**: Verify installation (if implemented)
- [ ] **Add to Home Screen**: Test on mobile devices
- [ ] **Offline functionality**: Test offline capabilities (if implemented)

### ✅ Performance Testing
- [ ] **Page load speed**: Under 3 seconds on 3G connection
- [ ] **Image optimization**: All images loading properly
- [ ] **Bundle size**: Large bundle warning acceptable for medical site
- [ ] **Caching**: Static assets properly cached

### ✅ Medical Website Specific
- [ ] **Patient forms**: All forms submit correctly
- [ ] **Medical images**: Procedure images display properly
- [ ] **Professional referrals**: Referral system functional
- [ ] **Contact information**: All contact details accurate

## Security Verification

### ✅ HTTPS Configuration
- [ ] **SSL certificate active**: No mixed content warnings
- [ ] **HSTS header**: Strict-Transport-Security header present
- [ ] **Security headers**: All headers from .htaccess active
- [ ] **Sensitive files blocked**: Source maps and config files inaccessible

### ✅ Medical Data Protection
- [ ] **No sensitive data**: No patient information in client-side code
- [ ] **Secure forms**: All forms use HTTPS
- [ ] **File access**: Restricted access to sensitive files
- [ ] **Error handling**: No sensitive information in error messages

## Domain & Email Setup

### ✅ Domain Configuration
- [ ] **Primary domain**: heartclinicmelbourne.com.au points to hosting
- [ ] **WWW redirect**: www.heartclinicmelbourne.com.au → heartclinicmelbourne.com.au
- [ ] **HTTP redirect**: http:// → https:// automatic redirect
- [ ] **DNS propagation**: Domain resolves correctly globally

### ✅ Email Setup (if required)
- [ ] **MX records**: Configured for professional email
- [ ] **Email accounts**: Created in cPanel
- [ ] **Email delivery**: Test sending/receiving emails
- [ ] **Contact form**: Test form email delivery

## Monitoring & Maintenance

### ✅ Backup Configuration
- [ ] **Automated backups**: VentraIP daily backups enabled
- [ ] **Local backups**: Code repository backed up
- [ ] **Database backups**: If applicable, database backed up
- [ ] **Restore procedure**: Backup restoration process documented

### ✅ Monitoring Setup
- [ ] **Uptime monitoring**: Third-party uptime monitoring configured
- [ ] **SSL monitoring**: SSL certificate expiration monitoring
- [ ] **Performance monitoring**: Page speed monitoring tools
- [ ] **Error monitoring**: Error tracking system (if implemented)

## Final Verification

### ✅ User Acceptance Testing
- [ ] **Medical staff testing**: Site tested by clinic staff
- [ ] **Patient journey testing**: Complete patient workflows tested
- [ ] **Mobile testing**: Tested on actual mobile devices
- [ ] **Browser compatibility**: Tested on major browsers

### ✅ Documentation
- [ ] **Deployment guide**: DEPLOYMENT.md completed
- [ ] **User instructions**: Staff training on website updates
- [ ] **Technical documentation**: CLAUDE.md updated
- [ ] **Emergency contacts**: Support contacts documented

## Troubleshooting Reference

### Common Issues & Solutions

#### 404 Errors on Page Refresh
**Check**: `.htaccess` file present and correctly configured
**Solution**: Verify SPA routing rules in `.htaccess`

#### Mixed Content Warnings
**Check**: All resources loading over HTTPS
**Solution**: Update any HTTP URLs to HTTPS

#### Large Bundle Size Warning
**Status**: ✅ Acceptable for medical site with extensive imagery
**Note**: 474KB gzipped is reasonable for feature-rich medical website

#### Slow Image Loading
**Check**: Image optimization and lazy loading
**Solution**: Implement progressive loading if needed

## Site Specifications Summary

| Metric | Value |
|--------|-------|
| Total Site Size | 182MB |
| Main JS Bundle | 1.66MB (474KB gzipped) |
| Main CSS Bundle | 86KB (14KB gzipped) |
| Image Assets | 47 medical procedure images |
| File Count | ~50 files |
| Recommended Plan | VentraIP Growth Plan |

## Deployment Completion

### ✅ Sign-off
- [ ] **Technical testing**: All technical requirements met
- [ ] **Content review**: All content accurate and current
- [ ] **Performance acceptable**: Site meets performance requirements
- [ ] **Security verified**: All security measures implemented
- [ ] **Documentation complete**: All documentation updated

**Deployment Date**: _______________
**Deployed By**: Shane Nanayakkara
**Tested By**: _______________
**Approved By**: _______________

---

**Next Review**: 3 months from deployment date
**Contact**: Shane Nanayakkara (Developer)
**Emergency Support**: VentraIP 24/7 Support