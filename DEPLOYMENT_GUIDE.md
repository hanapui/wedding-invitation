# Deployment Guide - Wedding Invitation Website

Follow these steps to publish your wedding invitation website on GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in (or create an account)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `wedding-invitation` or `melody-trevor-wedding`)
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we already have files)
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
cd "/Users/melo/Desktop/wedding invitation"

# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename main branch (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Choose **main** branch
6. Select **/ (root)** folder
7. Click **Save**

## Step 4: Access Your Website

After a few minutes (usually 1-2 minutes), your website will be live at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

For example:
```
https://johndoe.github.io/wedding-invitation/
```

## Step 5: Share with Guests

Send this URL to your wedding guests! They can access the invitation from any device.

## Important Notes

### Google Drive Folder Setup

Before sharing, make sure to:
1. Create a Google Drive folder for photo uploads
2. Right-click the folder → Share → Get link
3. Set permissions to "Anyone with the link can edit"
4. Copy the folder ID from the URL
5. Replace `YOUR_FOLDER_ID` in `index.html` line with your actual folder ID

### Google Maps

The Google Maps embed is already set up with your venue location. If you need to update it:
1. Go to Google Maps
2. Search for your venue
3. Click Share → Embed a map
4. Copy the iframe code
5. Replace the iframe src in `index.html`

## Updating Your Website

If you make changes to your website:

```bash
cd "/Users/melo/Desktop/wedding invitation"
git add .
git commit -m "Update invitation"
git push
```

Changes will be live on GitHub Pages within a few minutes!

