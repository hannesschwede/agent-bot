# Agent Bot — Cheat Sheet Lead Magnet Update

## Geänderte/neue Dateien

```
app/cheatsheet/page.tsx              ← NEU: Landing Page (agent-bot.de/cheatsheet)
app/components/CheatSheetForm.tsx    ← NEU: E-Mail-Formular mit PDF-Download
app/components/ExecutionModelLanding.tsx  ← GEÄNDERT: Nav-Link + CTA-Sektion
app/api/subscribe/route.ts           ← GEÄNDERT: utm_medium aus Body akzeptieren
public/macOS-Dev-Docker-AI-Ultimate-CheatSheet.pdf  ← NEU: Das PDF
```

## Deployment

```bash
# 1. In dein lokales Repo wechseln
cd ~/Projects/agent-bot

# 2. Dateien aus dem Update-Ordner kopieren (Ordnerstruktur ist identisch)
#    Oder manuell die 5 Dateien an die richtigen Stellen kopieren

# 3. Committen + deployen
git add -A
git commit -m "feat: cheatsheet lead magnet page + gated PDF download"
git push origin main

# Vercel deployed automatisch
```

## Was passiert

1. agent-bot.de/cheatsheet → Landing Page mit E-Mail-Gate
2. User gibt E-Mail ein → Beehiiv-Subscription mit utm_medium="cheatsheet_download"
3. Success-State zeigt PDF-Download-Button
4. Hauptseite hat neuen Nav-Link "Cheat Sheet" + Navy-CTA-Sektion am Ende

## Beehiiv Tracking

In Beehiiv kannst du Subscriber filtern nach:
- `utm_medium = newsletter_page` → Newsletter-Signups
- `utm_medium = cheatsheet_download` → Cheat-Sheet-Leads

## LinkedIn-Post Link

```
https://agent-bot.de/cheatsheet
```
