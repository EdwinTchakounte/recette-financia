// Plan de recette Financia — socle (comptes de test, libelles, assemblage).
//
// Les cas de test sont definis par plateforme dans recette-web.ts et
// recette-mobile.ts. Ils ne couvrent que des fonctionnalites reellement
// presentes dans l'application, ecrites en langage simple pour un testeur.

import type { Plateforme, Profil, Section, Compte, NonCouvert } from "./recette-types";
import { WEB_SECTIONS } from "./recette-web";
import { MOBILE_SECTIONS } from "./recette-mobile";

export type { Plateforme, Profil, Statut, CasTest, Section, Compte, NonCouvert } from "./recette-types";

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

// Fonctionnalites pas encore disponibles, listees a titre informatif (pas de
// test a cocher). Elles existent parfois sur l'autre plateforme.
export const NON_COUVERT: Record<Plateforme, NonCouvert[]> = {
  web: [
    {
      id: "w-nc-saisie-edit",
      titre: "Modifier ou supprimer une saisie",
      detail:
        "Sur le site web, une saisie se consulte mais ne se modifie pas encore ; l'edition et la suppression se font sur l'application mobile.",
    },
    {
      id: "w-nc-contest",
      titre: "Contester le refus d'une saisie",
      detail:
        "Le depot d'une contestation se fait sur l'application mobile ; le site web permet de suivre ses contestations et, cote manager, de les traiter.",
    },
  ],
  mobile: [
    {
      id: "m-nc-admin-note",
      titre: "Ajouter une note sur un dossier",
      detail:
        "L'application mobile affiche les notes d'un dossier mais ne permet pas encore d'en ajouter.",
    },
  ],
};
