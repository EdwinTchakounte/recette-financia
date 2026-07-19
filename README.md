# Plan de recette Financia

Application Next.js (App Router) qui liste, **par plateforme** (web / mobile) et
**par profil** (transverse / collaborateur / manager / administrateur), les
fonctionnalites **reellement implementees** a tester.

Chaque item est adosse a une preuve dans le code (chemin de fichier). Les
elements presents en surface mais non branches (mocks, boutons sans endpoint,
droits non cables) sont regroupes dans une section « Reserves » et volontairement
sortis des items testables.

La base factuelle provient de l'inventaire des deux depots :

- Web : `assistant_RH/Reporting_rh_front_web` (React / Redux / keycloak-js)
- Mobile : `Reporting_rh_front_mobile` (Flutter, Clean Architecture + BLoC)

## Lancer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Utilisation

- Basculer entre **Web** et **Mobile** en haut.
- Filtrer par **profil**.
- Cocher les fonctionnalites au fur et a mesure de la recette ; l'avancement est
  conserve dans le navigateur (localStorage).
- Theme clair / sombre.

## Structure

- `lib/recette.ts` — donnees (fonctionnalites + reserves par plateforme).
- `components/RecetteApp.tsx` — interface (filtres, suivi, progression).
- `app/` — layout, page, styles.

Pour faire evoluer le plan, editer `lib/recette.ts`.
