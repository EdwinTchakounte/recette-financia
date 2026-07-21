// SITE WEB (back-office) — cas de test en langage simple.
// Un seul mot de passe pour tous les comptes : Demo2026!
//
// Ne couvre que des fonctionnalites reellement presentes dans le code.
// Ce qui n'est pas encore disponible est liste dans NON_COUVERT (recette.ts).

import type { Section } from "./recette-types";

export const WEB_SECTIONS: Section[] = [
  // Tous
  {
    profil: "tous",
    titre: "Connexion et notifications",
    cas: [
      {
        id: "w-login",
        titre: "Se connecter au site",
        aFaire: [
          "Ouvrir le site.",
          "Se connecter avec un compte de test via l'ecran Keycloak.",
        ],
        attendu:
          "L'accueil s'affiche selon le role : Administrateur et Manager arrivent sur le Tableau de bord, Collaborateur sur la liste des saisies. En rechargeant la page, on reste connecte.",
      },
      {
        id: "w-notifs",
        titre: "Consulter ses notifications",
        aFaire: [
          "Ouvrir les notifications depuis la cloche en haut a droite.",
          "Cliquer une notification pour la marquer lue, ou utiliser le bouton Tout marquer lu.",
        ],
        attendu:
          "La liste s'affiche (onglets Toutes et Non lues) et le compteur de la cloche se met a jour au changement d'onglet ou apres un court delai.",
      },
    ],
  },

  // Collaborateur
  {
    profil: "collaborateur",
    titre: "Saisir et suivre ses activites",
    cas: [
      {
        id: "w-saisie-create",
        titre: "Saisir une activite",
        aFaire: [
          "Se connecter avec alice.demo@inov.local.",
          "Cliquer Nouvelle saisie.",
          "Renseigner : Date (par defaut aujourd'hui), Dossier, Type d'activite, Duree en minutes (entre 5 et 480), et un Commentaire si besoin.",
          "Cliquer Enregistrer.",
        ],
        attendu:
          "La saisie apparait dans la liste avec le statut En attente.",
      },
      {
        id: "w-attach",
        titre: "Joindre un fichier et le telecharger",
        aFaire: [
          "Dans le formulaire Nouvelle saisie, ajouter une piece jointe (image ou PDF) avant d'enregistrer.",
          "Rouvrir la saisie, cliquer Apercu sur la piece, puis Telecharger.",
        ],
        attendu:
          "La piece est enregistree avec la saisie. Sur une saisie deja creee, on peut l'ouvrir en apercu et la telecharger. L'ajout d'une piece jointe se fait au moment de creer la saisie, pas apres.",
      },
      {
        id: "w-export",
        titre: "Exporter la liste en CSV et PDF",
        aFaire: [
          "Ouvrir la liste des saisies, appliquer un filtre si besoin (statut, dossier, dates).",
          "Cliquer Export CSV, puis Export PDF.",
        ],
        attendu:
          "Deux fichiers se telechargent, correspondant a la liste affichee avec les filtres et les colonnes visibles en cours.",
      },
    ],
  },

  // Manager
  {
    profil: "manager",
    titre: "Valider, piloter et gerer les dossiers",
    cas: [
      {
        id: "w-validate",
        titre: "Valider ou refuser les saisies de l'equipe",
        aFaire: [
          "Se connecter avec marie.demo@inov.local.",
          "Ouvrir File de validation (liste filtree sur les saisies En attente).",
          "Sur une ligne, cliquer Valider. Sur une autre, cliquer Rejeter et choisir un Motif de rejet (obligatoire), avec un commentaire optionnel.",
        ],
        attendu:
          "Seules les saisies de son equipe apparaissent. La validation ou le refus met a jour le statut et notifie le collaborateur. Le nom de l'auteur s'affiche (pas un identifiant numerique).",
      },
      {
        id: "w-decide-contest",
        titre: "Traiter les contestations",
        aFaire: [
          "Ouvrir les Contestations, onglet A decider.",
          "Cliquer Decider sur une contestation, puis choisir Accepter ou Refuser.",
        ],
        attendu:
          "La decision est enregistree. Si acceptee, la saisie repasse En attente.",
      },
      {
        id: "w-dossier",
        titre: "Creer ou modifier un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer un dossier, ou en ouvrir un et cliquer Modifier, puis enregistrer.",
        ],
        attendu:
          "Le dossier est cree ou mis a jour. Le bouton Modifier n'apparait que si le manager a le droit sur ce dossier.",
      },
      {
        id: "w-dossier-collab",
        titre: "Affecter des collaborateurs a un dossier",
        aFaire: [
          "Ouvrir un dossier, onglet Equipe.",
          "Cliquer Ajouter un collaborateur, ou retirer un collaborateur via l'icone corbeille.",
        ],
        attendu:
          "Les collaborateurs affectes peuvent saisir sur ce dossier.",
      },
      {
        id: "w-dashboard",
        titre: "Consulter le tableau de bord",
        aFaire: ["Ouvrir le Tableau de bord."],
        attendu:
          "Les indicateurs de l'equipe s'affichent. Le tableau de bord est reserve aux managers et aux admins : un collaborateur ne le voit pas dans le menu.",
      },
    ],
  },

  // Admin
  {
    profil: "admin",
    titre: "Administration du cabinet",
    cas: [
      {
        id: "w-admin-dashboard",
        titre: "Voir le tableau de bord a l'echelle du cabinet",
        aFaire: [
          "Se connecter avec diane.demo@inov.local.",
          "Ouvrir le Tableau de bord.",
        ],
        attendu:
          "C'est le meme ecran que le manager, mais les chiffres couvrent tout le cabinet et non une seule equipe.",
      },
      {
        id: "w-clients",
        titre: "Gerer les clients et exporter leur activite",
        aFaire: [
          "Ouvrir la liste des clients.",
          "Cliquer Nouveau client, ou Modifier un client existant.",
          "Sur une ligne client, cliquer l'action Exporter l'activite en PDF.",
        ],
        attendu:
          "Les clients se creent et se modifient. L'export PDF de l'activite d'un client se telecharge.",
      },
      {
        id: "w-audit",
        titre: "Consulter le journal d'audit",
        aFaire: [
          "Ouvrir le Journal d'audit.",
          "Cliquer Export CSV, puis Export PDF.",
        ],
        attendu:
          "Les evenements s'affichent et l'export se telecharge.",
      },
      {
        id: "w-admin-consult",
        titre: "Demander la consultation d'une saisie",
        aFaire: [
          "Ouvrir une saisie d'un collaborateur.",
          "Cliquer Faire une demande de consultation et saisir une justification.",
        ],
        attendu:
          "Le contenu detaille (commentaire et pieces jointes) reste masque derriere un bandeau Contenu restreint tant que la demande n'est pas approuvee.",
      },
    ],
  },
];
