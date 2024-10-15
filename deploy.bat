@echo off
npm run build
git add out/*
git commit -m "Deploy to GitHub Pages"
git push origin main
