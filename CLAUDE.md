# FY Motors — upute za Claude Code

fymotors.ba — statični HTML (index.html shop + dashboard.html CRM), Supabase preko CDN. Znanje: CTOS-Brain/02-Projekti/FY-Motors/.
NAPOMENA: repo je PUBLIC — nikad ne commitovati ključeve osim anon.

## CTOS-Brain pravila (obavezno)
Na kraju SVAKE radne sesije, prije završetka:
1. Kreiraj/ažuriraj sesijski log u ../CTOS-Brain/02-Projekti/FY-Motors/Sesije/YYYY-MM-DD.md
   (šta je rađeno, šta je deployano, otvorena pitanja)
2. Ako je riješen bug → novi fajl u 04-Bugs-i-Lekcije/
3. Ako je nastao reusable pattern → novi fajl u 03-Patterns/
4. Ako je donesena arhitekturalna odluka → ADR u 01-Vizija/Odluke/
5. Ažuriraj [[wiki-linkove]] i relevantne MOC fajlove
6. U CTOS-Brain repou: git add -A && git commit && git push
Sve bilješke pisati tako da služe budućoj CTOS multi-tenant migraciji:
kod svakog patterna označi da li je "tenant-ready" ili vezan za jedan projekt.
