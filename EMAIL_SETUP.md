# Email Setup Guide for VueNexa Contact Form

## Overview
The contact form is now configured to send emails to `tech@vuenexa.com` using EmailJS API directly via `https://api.emailjs.com/api/v1.0/email/send`. This approach is more reliable and doesn't require loading external SDKs.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Submission - {{subject}}

**Content:**
```
You have received a new message from your website contact form:

Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your VueNexa Technologies website.
```

4. Save the template and note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

### 5. Update the Code
Replace the following placeholders in `index.html` (around line 569-571):

```javascript
// Replace these three lines in the script section:
const serviceId = 'YOUR_SERVICE_ID'; // Replace with your actual service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your actual template ID  
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your actual public key
```

**Example:**
```javascript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'user_def456';
```

### 6. Test the Form
1. Open your website
2. Fill out the contact form
3. Submit and check if you receive the email at `tech@vuenexa.com`

## Features Included

✅ **Form Validation**: All fields are required
✅ **Loading State**: Button shows "Sending..." while processing
✅ **Success Message**: Green confirmation when email is sent
✅ **Error Handling**: Red error message if sending fails
✅ **Form Reset**: Form clears after successful submission
✅ **Professional Styling**: Clean, modern form design

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- No credit card required
- Basic support

## Troubleshooting

**If emails aren't sending:**
1. Check that all IDs are correctly replaced
2. Verify your email service is properly connected
3. Check browser console for error messages
4. Ensure your email provider allows the connection

**If you need more emails:**
- Upgrade to EmailJS paid plan
- Or switch to another service like Formspree, Netlify Forms, etc.

## Alternative Services

If you prefer other free email services:
- **Formspree**: 50 submissions/month free
- **Netlify Forms**: 100 submissions/month free
- **Getform**: 50 submissions/month free

## Support

For technical issues with the contact form, check:
1. Browser console for JavaScript errors
2. EmailJS dashboard for service status
3. Your email provider's connection status
