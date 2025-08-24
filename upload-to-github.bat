@echo off
echo Uploading to GitHub...
echo.

echo 1. Adding all files...
git add .

echo 2. Committing changes...
git commit -m "Initial commit: KostBoost backend with SendGrid integration"

echo 3. Adding remote origin...
git remote add origin https://github.com/Anni/kostboost-backend.git

echo 4. Pushing to GitHub...
git push -u origin main

echo.
echo Done! Check GitHub for your files.
pause
