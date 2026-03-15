# Deelbare patient cards en publieke profielen

## Doel

Viraliteit via identiteit. Gebruikers delen hun "patient card" als sociale valuta. Spotify Wrapped-logica voor Claude Code-verslaafden.

## 1. Publiek profiel: `/patient/[username]`

Publiek toegankelijke pagina, geen login vereist.

Zichtbare data:
- Username, avatar, admitted datum
- Drug of choice
- Days clean (groot, dominant), relapse count
- Badges
- Diagnosis (afgeleid van hours_per_day): Recreational user (1-4h), Substance dependent (5-8h), Chronic abuser (9-14h), Terminal case (15+h)
- Prognosis: altijd "Recovery unlikely"
- Severity bar (visueel, groen naar rood)
- Case number: "CASE-" + eerste 8 karakters user ID

Niet zichtbaar: posts, evidence, showcases (privé op /my-file).

OG-image via Next.js opengraph-image.tsx. CTA onderaan voor bezoekers.

## 2. Patient card PNG

API route `/api/patient-card/[username]` genereert 1200x630 PNG via Satori/ImageResponse.

Inhoud: logo, "PATIENT RECORD", username, avatar, diagnosis, severity bar, days clean, relapse count, drug of choice, prognosis, case number, nep-barcode, claudict.com + datum.

Dezelfde route voor OG-image en download.

## 3. Delen

"Share your file" knop op /my-file met:
- Copy link (publieke profiel-URL)
- Download patient card (PNG)

## 4. Geen schema-wijzigingen

Alle benodigde data bestaat al in profiles tabel.
