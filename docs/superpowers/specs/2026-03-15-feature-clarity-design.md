# Feature clarity verbetering

## Probleem

De functionaliteiten van Claudict zijn niet helder voor nieuwe bezoekers. Drie lagen:
1. Homepage legt niet uit wat de site is of wat je er kan doen
2. Na aanmelding geen oriëntatie
3. Lege profielsecties geven geen richting

## Aanpak: gebalanceerd (in-character uitleg)

### 1. Homepage: treatment program sectie

Nieuwe subtitel onder hero heading:
"A real community for Claude Code addicts. Group therapy, clinical evidence, relapse documentation. Free admission."

Nieuw blok tussen stats en "Latest group therapy": 2x2 grid met kaarten per feature. SVG-iconen, klikbaar, linkt naar pagina.

| Feature | Titel | Uitleg |
|---------|-------|--------|
| Forum | Group therapy | Share your stories, debate prompting strategies, request interventions. |
| Wall of shame | Clinical evidence | Upload screenshots of your worst sessions. Community votes on severity. |
| Showcase | Relapse gallery | Document projects built during episodes. Proof that addiction produces results. |
| Profiel | Patient file | Track your days clean, earn badges, log relapses. Your clinical record. |

### 2. Post-signup: admission briefing

Route: `/admitted`. Redirect na succesvolle intake.

Inhoud: klinische bevestiging + drie actie-kaarten met directe CTAs + "Proceed to patient file" link.

### 3. Betere empty states op profiel

Activity tabs in `/my-file` krijgen CTA-links bij lege staat.

### Wat niet verandert

Navigatie, pagina-headers, satirische toon.
