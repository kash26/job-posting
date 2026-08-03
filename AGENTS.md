# Agent Guide - Job Posting Platform

Ce document definit les regles que tout contributeur humain ou IA doit respecter avant chaque commit.

## 1) Contexte Projet

- Stack frontend: Next.js (TypeScript) + Tailwind CSS.
- Stack backend: Laravel (API REST) + MySQL + Redis.
- Execution locale: Docker Compose avec separation front/back.
- Deployment frontend: Vercel.
- Le backend est expose en local via Nginx + PHP-FPM.

## 2) Regles de Qualite Obligatoires Avant Commit

- Responsive obligatoire: chaque page et composant doit etre valide au minimum sur 375px, 768px, 1024px et 1440px.
- Accessibilite minimale: navigation clavier, labels associes aux champs, contrastes lisibles, etat focus visible.
- Aucune regression: verifier que les flux existants restent fonctionnels.
- Code lisible: fonctions courtes, noms explicites, suppression du code mort.
- Cohesion: un commit = une intention claire (feature, fix, refactor, docs).

## 3) Standards Frontend (Next.js)

- Utiliser TypeScript strictement; eviter any sauf justification en commentaire.
- Preferer composants presentionnels reutilisables et logique factorisee (hooks/services).
- Gerer les etats de chargement, vide et erreur pour chaque vue data-driven.
- Eviter la logique metier lourde dans les composants UI.
- Pour les appels API, centraliser la couche HTTP et gerer timeout/erreurs.
- Optimiser les performances: lazy loading, images optimisees, et reduction des re-renders.

## 4) Standards Backend (Laravel)

- Valider toutes les entrees via Form Request ou validation explicite.
- Utiliser des Resources pour serialiser les reponses API.
- Encapsuler la logique metier dans Services/Actions, pas dans les Controllers.
- Proteger les endpoints sensibles (authentification, policies, rate limiting).
- Eviter N+1 queries (eager loading, indexes SQL adaptes).
- Logger les erreurs utiles sans exposer de donnees sensibles.

## 5) Securite (Non Negociable)

- Ne jamais commiter de secrets (.env, tokens, credentials).
- Sanitiser et valider toute entree utilisateur.
- Appliquer le principe du moindre privilege pour les roles et acces.
- Activer CORS de maniere stricte selon les domaines attendus.
- Ajouter des limites anti-abus (throttling) sur les routes critiques.
- Verifier dependances a risque connu avant merge.

## 6) Bonnes Pratiques d'Architecture

- Pattern recommande cote back: Controller -> Service -> Repository (si necessaire).
- Pattern recommande cote front: UI components -> hooks -> API client.
- Respecter SOLID et separation des responsabilites.
- Eviter le couplage fort entre modules front et back.
- Preferer composition a inheritance quand possible.

## 7) Definition of Done (DoD) par Commit

- Build et lint passent sur le scope modifie.
- Tests unitaires/feature impactes passes ou ajoutes.
- Verification responsive effectuee sur les breakpoints cibles.
- Documentation minimale mise a jour (README, notes API, env si besoin).
- Message de commit clair et actionnable.

## 8) Convention de Commit Recommandee

- feat: nouvelle fonctionnalite
- fix: correction de bug
- refactor: amelioration interne sans changement fonctionnel
- test: ajout/modification de tests
- docs: documentation
- chore: maintenance/outillage

## 9) Checklist Pre-Commit (obligatoire)

- [ ] Le code compile et le lint est propre.
- [ ] Les nouveaux composants/pages sont responsive.
- [ ] Les routes/API ajoutees sont validees et securisees.
- [ ] Aucune cle/secrets/fichier sensible n'est versionne.
- [ ] Les cas d'erreur utilisateur sont geres proprement.
- [ ] Les logs ne revelent pas d'informations sensibles.
- [ ] Le commit est atomique et son message est explicite.

## 10) Recommandations Supplementaires

- Ajouter des tests d'integration API pour les flux critiques (publication, edition, candidature).
- Mettre en place une CI (lint, tests, security checks) avant merge.
- Mesurer regulierement performance web (Core Web Vitals) et temps de reponse API.
- Mettre en place un schema de versionnement API (v1, v2) pour evolutions futures.
- Documenter les decisions d'architecture importantes (ADR court format markdown).
