# Project conventions
- Keep shared public navigation in `src/lib/navigation.ts` so header and footer retain the same page ordering.
- Keep consultation review in a dedicated Admin component using typed database rows; database policies remain authoritative for access.
- Preserve real uploaded product photographs and use existing semantic design tokens and Button controls.
- Store editable public page copy in site_content under page-specific keys with typed fallback content; preserve form submission behavior independently of display copy.
- Keep hair product eligibility and supplied description fallbacks in shared catalog helpers so Home, Shop, requests, and Admin agree.