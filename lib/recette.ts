// Plan de recette Financia — socle (comptes de test, libelles, assemblage).
//
// Les cas de test sont definis par plateforme dans recette-web.ts et
// recette-mobile.ts. Ils ne couvrent que des fonctionnalites reellement
// presentes dans l'application, ecrites en langage simple pour un testeur.

import type { Plateforme, Profil, Section, Compte } from "./recette-types";
import { WEB_SECTIONS } from "./recette-web";
import { MOBILE_SECTIONS } from "./recette-mobile";

export type { Plateforme, Profil, Statut, CasTest, Section, Compte } from "./recette-types";

export const PROFIL_LABEL: Record<Profil, string> = {
  tous: "Tout le monde",
  collaborateur: "Collaborateur",
  manager: "Manager",
  admin: "Administrateur",
};

export const PLATEFORME_LABEL: Record<Plateforme, string> = {
  web: "Site web",
  mobile: "Application mobile",
};

export const PROFIL_ORDER: Profil[] = ["tous", "collaborateur", "manager", "admin"];

// Comptes a utiliser pour se connecter pendant les tests.
export const MOT_DE_PASSE_DEMO = "Demo2026!";

export const COMPTES: Compte[] = [
  {
    email: "alice.demo@inov.local",
    role: "collaborateur",
    pour: "Saisir des activites, joindre des fichiers, contester un refus.",
  },
  {
    email: "benoit.demo@inov.local",
    role: "collaborateur",
    pour: "Deuxieme collaborateur de la meme equipe qu'Alice (tests a deux).",
  },
  {
    email: "marie.demo@inov.local",
    role: "manager",
    pour: "Valider ou refuser les saisies de son equipe (Alice, Benoit), gerer les dossiers.",
  },
  {
    email: "mathieu.demo@inov.local",
    role: "manager",
    pour: "Manager d'une autre equipe (Camille).",
  },
  {
    email: "diane.demo@inov.local",
    role: "admin",
    pour: "Vue d'ensemble du cabinet, gestion des dossiers, demandes de consultation.",
  },
  {
    email: "camille.demo@inov.local",
    role: "collaborateur",
    pour: "Collaboratrice de l'equipe de Mathieu.",
  },
];

export const CONSIGNES =
  "Pour chaque carte : suis les etapes, regarde si le resultat correspond a ce qui est attendu, puis clique OK si tout va bien, ou Probleme si quelque chose ne marche pas. En cas de probleme, ecris en une phrase ce qui ne va pas. Ton avancement est enregistre sur cet appareil et reste apres fermeture.";

export const RECETTE: Record<Plateforme, Section[]> = {
  web: WEB_SECTIONS,
  mobile: MOBILE_SECTIONS,
};
