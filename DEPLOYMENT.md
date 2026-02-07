# VentraIP Deployment Guide - Heart Clinic Melbourne

## Overview
This guide provides step-by-step instructions for deploying the Heart Clinic Melbourne React/TypeScript application to VentraIP's Business Hosting service.

## Pre-Deployment Requirements

### 1. System Requirements
- Node.js 18+ installed locally
- Git repository access
- VentraIP Business Hosting account
- Domain name configured (heartclinicmelbourne.com.au)

### 2. Local Build Preparation

#### Build the Application
```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test build locally (optional)
npm run preview
```

#### Verify Build Output
The build creates a `dist/` folder containing:
- `index.html` - Main application entry point
- `assets/` - Bundled JavaScript and CSS files
- `images/` - Static image assets
- `manifest.webmanifest` - PWA manifest file
- `.htaccess` - Apache configuration for SPA routing

## VentraIP Account Setup

### 1. Choose Hosting Plan
**Recommended**: Growth Plan ($8.25/month after 50% discount)
- Unlimited bandwidth
- Professional SSL certificate
- Adequate storage for medical website
- Australian servers (Sydney)

### 2. Domain Configuration
- Configure DNS settings for heartclinicmelbourne.com.au
- Enable SSL certificate (included with hosting)
- Set up domain redirects if needed

### 3. Access cPanel
- Log into your VentraIP hosting account
- Access cPanel through the client portal
- Familiarize yourself with File Manager

## Deployment Process

### Step 1: Upload Files

#### Using cPanel File Manager
1. Log into cPanel
2. Open File Manager
3. Navigate to `public_html` directory
4. Upload entire contents of `dist/` folder
5. Extract if uploaded as zip archive

#### Using FTP/SFTP
```bash
# Example using rsync (if available)
rsync -av dist/ shane@heartclinicmelbourne.com.au:public_html/

# Or use FTP client like FileZilla
# Server: yourserver.com
# Username: your_cpanel_username
# Password: your_cpanel_password
```

### Step 2: Configure Apache

The `.htaccess` file (included in build) handles:
- SPA routing (redirects to index.html)
- Security headers for medical website
- Static asset caching
- Gzip compression

**Important**: Ensure `.htaccess` is in the root directory (public_html)

### Step 3: SSL Certificate Setup

1. In cPanel, go to "SSL/TLS"
2. Select "Let's Encrypt SSL"
3. Enable for your domain
4. Verify HTTPS works correctly

### Step 4: Test Deployment

#### Basic Functionality Test
- Visit your domain: https://heartclinicmelbourne.com.au
- Test all navigation links
- Verify React Router works (refresh on any page)
- Check mobile responsiveness

#### PWA Features Test
- Test "Add to Home Screen" on mobile
- Verify service worker installation
- Check offline functionality (if implemented)

#### Medical Website Specific Tests
- Test referral form submission
- Verify learning library navigation
- Check doctor profile pages
- Test PDF generation features

## Post-Deployment Configuration

### 1. Domain Redirects
Configure redirects in cPanel:
- www.heartclinicmelbourne.com.au → heartclinicmelbourne.com.au
- http:// → https:// (if not automatic)

### 2. Email Setup
If using professional email:
- Configure MX records
- Set up email accounts in cPanel
- Test email delivery

### 3. Monitoring Setup
- Set up uptime monitoring
- Configure backup schedules
- Monitor SSL certificate expiration

## Troubleshooting

### Common Issues

#### 1. 404 Errors on Page Refresh
**Problem**: Direct URLs return 404 errors
**Solution**: Verify `.htaccess` file is present and configured correctly

#### 2. Mixed Content Warnings
**Problem**: HTTP resources on HTTPS site
**Solution**: Ensure all assets use HTTPS URLs

#### 3. Slow Loading Times
**Problem**: Large bundle sizes
**Solution**: Optimize images, enable gzip compression

#### 4. PWA Installation Issues
**Problem**: "Add to Home Screen" not appearing
**Solution**: Verify HTTPS, check manifest.webmanifest accessibility

### Performance Optimization

#### 1. Image Optimization
- Compress images before upload
- Use WebP format where supported
- Implement lazy loading for large images

#### 2. Caching Strategy
- Leverage browser caching via .htaccess
- Use CDN for static assets (if needed)
- Monitor cache hit rates

#### 3. Bundle Analysis
```bash
# Analyse bundle size locally
npm run build -- --analyse
```

## Security Considerations

### 1. Medical Website Compliance
- HTTPS enforced for all pages
- Secure headers implemented
- No sensitive data in client-side code
- Regular security updates

### 2. File Permissions
- Set appropriate file permissions (644 for files, 755 for directories)
- Restrict access to sensitive files
- Regular security scans

### 3. Backup Strategy
- Daily automated backups (VentraIP feature)
- Local backup copies
- Version control for code changes

## Maintenance

### 1. Regular Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Test updates in staging environment

### 2. Content Updates
- Use version control for all changes
- Test builds before deployment
- Maintain deployment logs

### 3. Performance Monitoring
- Monitor page load times
- Track user engagement
- Review error logs regularly

## Support Resources

### VentraIP Support
- 24/7 Australian support
- Live chat and ticket system
- Knowledge base and tutorials

### Development Support
- GitHub repository for version control
- Documentation in CLAUDE.md
- TypeScript/React community resources

## Deployment Checklist

See DEPLOYMENT-CHECKLIST.md for step-by-step verification list.

---

**Last Updated**: August 2025
**Next Review**: Quarterly
**Contact**: Shane Nanayakkara (Developer)