// SITE WEB (back-office) — cas de test en langage simple.
// Un seul mot de passe pour tous les comptes : Demo2026!

import type { Section } from "./recette-types";

export const WEB_SECTIONS: Section[] = [
  // ------------------------------------------------------------------ Tous
  {
    profil: "tous",
    titre: "Connexion et notifications",
    cas: [
      {
        id: "w-login",
        titre: "Se connecter au site",
        aFaire: [
          "Ouvrir le site.",
          "Se connecter avec un compte de test.",
        ],
        attendu:
          "L'accueil s'affiche selon le role du compte. En rechargeant la page, on reste connecte.",
      },
      {
        id: "w-notifs",
        titre: "Consulter ses notifications",
        aFaire: [
          "Ouvrir les notifications.",
          "Marquer une notification (ou toutes) comme lue.",
        ],
        attendu:
          "La liste des notifications s'affiche et le compteur de non-lues se met a jour.",
      },
    ],
  },

  // ---------------------------------------------------------- Collaborateur
  {
    profil: "collaborateur",
    titre: "Saisir et suivre ses activites",
    cas: [
      {
        id: "w-saisie-create",
        titre: "Saisir une activite",
        aFaire: [
          "Se connecter avec alice.demo@inov.local.",
          "Ouvrir Nouvelle saisie.",
          "Choisir un dossier et un type d'activite, indiquer une duree et une date, ecrire un commentaire.",
          "Enregistrer.",
        ],
        attendu:
          "La saisie apparait dans la liste des saisies avec le statut En attente.",
      },
      {
        id: "w-saisie-edit",
        titre: "Modifier ou supprimer sa saisie",
        aFaire: [
          "Ouvrir une de ses saisies En attente.",
          "Modifier une information et enregistrer.",
        ],
        attendu:
          "La modification est enregistree. Une saisie deja Validee ne peut plus etre modifiee.",
      },
      {
        id: "w-attach",
        titre: "Ajouter et telecharger des pieces jointes",
        aFaire: [
          "Ouvrir une saisie.",
          "Ajouter une piece jointe (image ou PDF).",
          "Ouvrir l'apercu de la piece, puis la telecharger.",
        ],
        attendu:
          "La piece jointe s'ajoute, l'apercu s'affiche et le telechargement fonctionne.",
      },
      {
        id: "w-export",
        titre: "Exporter la liste en CSV et PDF",
        aFaire: [
          "Ouvrir la liste des saisies.",
          "Cliquer Export CSV, puis Export PDF.",
        ],
        attendu:
          "Deux fichiers se telechargent, correspondant a la liste affichee (avec les filtres en cours).",
      },
      {
        id: "w-contest",
        titre: "Contester le refus d'une saisie",
        aFaire: [
          "Ouvrir une saisie Rejetee.",
          "Cliquer Contester, indiquer un motif, envoyer.",
        ],
        attendu:
          "La contestation part au manager et apparait dans le suivi de ses contestations.",
      },
    ],
  },

  // ---------------------------------------------------------------- Manager
  {
    profil: "manager",
    titre: "Valider, piloter et gerer les dossiers",
    cas: [
      {
        id: "w-validate",
        titre: "Valider ou refuser les saisies de l'equipe",
        aFaire: [
          "Se connecter avec marie.demo@inov.local.",
          "Ouvrir les saisies a valider.",
          "Valider une saisie, en refuser une autre avec un motif.",
        ],
        attendu:
          "Seules les saisies de son equipe apparaissent. La validation ou le refus met a jour le statut et notifie le collaborateur.",
      },
      {
        id: "w-decide-contest",
        titre: "Traiter les contestations",
        aFaire: [
          "Ouvrir une contestation recue.",
          "Accepter ou refuser.",
        ],
        attendu:
          "La decision est enregistree. Si acceptee, la saisie revient En attente.",
      },
      {
        id: "w-dossier",
        titre: "Creer ou modifier un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer un dossier ou en modifier un, puis enregistrer.",
        ],
        attendu: "Le dossier est cree ou mis a jour.",
      },
      {
        id: "w-dossier-collab",
        titre: "Affecter des collaborateurs a un dossier",
        aFaire: [
          "Ouvrir un dossier.",
          "Ajouter ou retirer des collaborateurs.",
        ],
        attendu:
          "Les collaborateurs affectes peuvent saisir sur ce dossier.",
      },
      {
        id: "w-dashboard",
        titre: "Consulter le tableau de bord",
        aFaire: ["Ouvrir le Tableau de bord."],
        attendu:
          "Les indicateurs de l'equipe s'affichent. Le tableau de bord est reserve aux managers et aux admins : un collaborateur ne le voit pas.",
      },
    ],
  },

  // ------------------------------------------------------------------ Admin
  {
    profil: "admin",
    titre: "Administration du cabinet",
    cas: [
      {
        id: "w-admin-dashboard",
        titre: "Voir le tableau de bord du cabinet",
        aFaire: [
          "Se connecter avec diane.demo@inov.local.",
          "Ouvrir le tableau de bord.",
        ],
        attendu:
          "Une vue d'ensemble du cabinet s'affiche (au-dela d'une seule equipe).",
      },
      {
        id: "w-clients",
        titre: "Gerer les clients et exporter leur activite",
        aFaire: [
          "Ouvrir la liste des clients.",
          "Creer ou modifier un client.",
          "Exporter l'activite d'un client en PDF.",
        ],
        attendu:
          "Les clients se creent et se modifient. L'export PDF de l'activite d'un client se telecharge.",
      },
      {
        id: "w-audit",
        titre: "Consulter le journal d'audit",
        aFaire: [
          "Ouvrir le Journal d'audit.",
          "Exporter en CSV ou en PDF.",
        ],
        attendu:
          "Les evenements s'affichent et l'export se telecharge.",
      },
      {
        id: "w-admin-consult",
        titre: "Demander la consultation d'une saisie",
        aFaire: [
          "Ouvrir une saisie d'un collaborateur.",
          "Demander l'acces au contenu confidentiel.",
        ],
        attendu:
          "Le contenu detaille reste masque tant que la demande n'est pas approuvee.",
      },
    ],
  },
];
