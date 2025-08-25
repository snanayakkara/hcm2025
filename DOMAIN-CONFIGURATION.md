# Domain Configuration - heartclinicmelbourne.com.au

## 🌐 Domain Overview
**Primary Domain**: heartclinicmelbourne.com.au  
**Hosting Provider**: VentraIP Australia  
**SSL Certificate**: Let's Encrypt (included with hosting)

## 📋 Pre-Configuration Checklist
- [ ] VentraIP Business Hosting account activated
- [ ] Domain registration confirmed (heartclinicmelbourne.com.au)
- [ ] Access to domain registrar control panel
- [ ] cPanel access credentials ready

## 🔧 DNS Configuration

### Step 1: Primary DNS Settings
Configure these DNS records at your domain registrar:

```dns
Type    Name    Value                           TTL
A       @       [VentraIP Server IP]           3600
A       www     [VentraIP Server IP]           3600
CNAME   www     heartclinicmelbourne.com.au    3600
```

### Step 2: VentraIP Server Details
**Find your server IP address:**
1. Login to VentraIP client portal
2. Go to "Hosting Services" → "Your hosting package"
3. Note the **Server IP** (usually starts with 103.x.x.x or 150.x.x.x)

### Step 3: Common DNS Records
```dns
# Essential records
A       @       [VentraIP IP]     # Main domain
CNAME   www     @                 # WWW subdomain

# Optional email records (if using VentraIP email)
MX      @       mail.heartclinicmelbourne.com.au    10
A       mail    [VentraIP IP]
```

## 🚀 VentraIP Domain Setup

### Step 1: Add Domain to Hosting
1. **Login to VentraIP client portal**
2. **Navigate to hosting services**
3. **Click "Manage" on your hosting package**
4. **Go to "Addon Domains" or "Domain Management"**
5. **Add heartclinicmelbourne.com.au as primary domain**

### Step 2: Configure Domain in cPanel
1. **Open cPanel**
2. **Find "Subdomains" or "Addon Domains"**
3. **Ensure heartclinicmelbourne.com.au points to public_html/**
4. **Set up www.heartclinicmelbourne.com.au as an alias**

### Step 3: SSL Certificate Installation
1. **In cPanel, go to "SSL/TLS"**
2. **Select "Let's Encrypt SSL"**
3. **Choose domains to secure:**
   - ✅ heartclinicmelbourne.com.au
   - ✅ www.heartclinicmelbourne.com.au
4. **Click "Install Certificate"**
5. **Wait 5-10 minutes for activation**

## 🔄 Redirect Configuration

### WWW to Non-WWW Redirect
The `.htaccess` file (included in deployment) handles this automatically:
```apache
# Redirect www to non-www (handled in .htaccess)
RewriteCond %{HTTP_HOST} ^www\.heartclinicmelbourne\.com\.au [NC]
RewriteRule ^(.*)$ https://heartclinicmelbourne.com.au/$1 [R=301,L]
```

### HTTP to HTTPS Redirect
Also handled automatically in `.htaccess`:
```apache
# Force HTTPS (handled in .htaccess)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📧 Email Configuration (Optional)

### If Using VentraIP Email Services
1. **In cPanel, go to "Email Accounts"**
2. **Create professional email accounts:**
   - info@heartclinicmelbourne.com.au
   - admin@heartclinicmelbourne.com.au
   - referrals@heartclinicmelbourne.com.au

### MX Records for Email
```dns
MX    @    mail.heartclinicmelbourne.com.au    10
A     mail [VentraIP IP Address]
```

## ✅ Verification Steps

### Step 1: DNS Propagation Check
Use online tools to verify DNS propagation:
- **whatsmydns.net**
- **dnschecker.org**

Test these domains:
- heartclinicmelbourne.com.au
- www.heartclinicmelbourne.com.au

### Step 2: SSL Certificate Verification
1. **Visit**: https://heartclinicmelbourne.com.au
2. **Check for green padlock** in browser
3. **Verify certificate details** (should show "Let's Encrypt")
4. **Test**: https://www.heartclinicmelbourne.com.au (should redirect)

### Step 3: Redirect Testing
Test these URLs to ensure proper redirects:
```
http://heartclinicmelbourne.com.au 
→ https://heartclinicmelbourne.com.au

http://www.heartclinicmelbourne.com.au 
→ https://heartclinicmelbourne.com.au

https://www.heartclinicmelbourne.com.au 
→ https://heartclinicmelbourne.com.au
```

## 🚨 Troubleshooting

### Common Issues

#### DNS Not Resolving
**Problem**: Domain doesn't point to VentraIP servers  
**Solution**: 
- Verify A records point to correct VentraIP IP
- Wait up to 48 hours for DNS propagation
- Check with VentraIP support for correct server IP

#### SSL Certificate Not Working
**Problem**: Browser shows "Not Secure" warning  
**Solution**:
- Wait up to 24 hours for SSL propagation
- Verify domain is correctly configured in cPanel
- Try reinstalling Let's Encrypt certificate

#### WWW Redirect Not Working
**Problem**: www.domain.com doesn't redirect to domain.com  
**Solution**:
- Verify `.htaccess` file is present in public_html/
- Check CNAME record for www subdomain
- Ensure mod_rewrite is enabled (VentraIP default)

#### Email Not Working
**Problem**: Email accounts not receiving mail  
**Solution**:
- Verify MX records are correctly configured
- Check cPanel email account settings
- Test with VentraIP webmail interface

## 📊 Configuration Summary

| Setting | Value |
|---------|-------|
| **Primary Domain** | heartclinicmelbourne.com.au |
| **WWW Redirect** | www → non-www |
| **SSL Certificate** | Let's Encrypt (auto-renewal) |
| **Web Directory** | public_html/ |
| **DNS TTL** | 3600 seconds (1 hour) |
| **Email** | Optional VentraIP hosting |

## 📞 Support Contacts

### VentraIP Support
- **Phone**: 1300 378 365 (24/7)
- **Email**: support@ventraip.com.au
- **Live Chat**: Client portal

### Domain Registrar Support
If domain is registered elsewhere:
- Contact your domain registrar for DNS changes
- Provide VentraIP server IP address
- Request A record and CNAME updates

## 🎯 Success Checklist

Your domain is correctly configured when:
- [ ] **heartclinicmelbourne.com.au** resolves to VentraIP servers
- [ ] **www.heartclinicmelbourne.com.au** redirects to non-www version
- [ ] **SSL certificate active** (green padlock in browser)
- [ ] **HTTP automatically redirects** to HTTPS
- [ ] **All subpages accessible** via direct URL
- [ ] **No mixed content warnings** in browser console
- [ ] **DNS propagation complete** globally (check online tools)

## 🔄 Maintenance

### SSL Certificate Renewal
- **Auto-renewal**: Let's Encrypt certificates renew automatically
- **Monitor expiration**: Set calendar reminder for 60 days
- **Backup plan**: Manual renewal via cPanel if auto-renewal fails

### DNS Monitoring
- **Monthly check**: Verify DNS records remain correct
- **Change tracking**: Document any DNS modifications
- **Performance monitoring**: Use tools like GTmetrix or PageSpeed Insights

---

**Created**: August 16, 2025  
**Domain**: heartclinicmelbourne.com.au  
**Hosting**: VentraIP Business Plan  
**Next Review**: 30 days after go-live