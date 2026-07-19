// APPLICATION MOBILE — cas de test en langage simple.
// Un seul mot de passe pour tous les comptes : Demo2026!

import type { Section } from "./recette-types";

export const MOBILE_SECTIONS: Section[] = [
  // ------------------------------------------------------------------ Tous
  {
    profil: "tous",
    titre: "Connexion, profil et notifications",
    cas: [
      {
        id: "m-login",
        titre: "Se connecter a l'application",
        aFaire: [
          "Ouvrir l'application.",
          "Saisir l'email et le mot de passe d'un compte de test.",
          "Toucher Se connecter.",
        ],
        attendu:
          "L'ecran d'accueil s'affiche. Si tu fermes completement l'application puis la rouvres, tu restes connecte sans avoir a ressaisir le mot de passe.",
      },
      {
        id: "m-profil",
        titre: "Voir son profil et se deconnecter",
        aFaire: [
          "Ouvrir l'ecran Profil.",
          "Verifier le nom, l'email et le role affiches.",
          "Toucher Deconnexion.",
        ],
        attendu:
          "Les informations du compte sont correctes et le role est le bon. La deconnexion ramene a l'ecran de connexion.",
      },
      {
        id: "m-notifs",
        titre: "Consulter ses notifications",
        aFaire: [
          "Ouvrir l'ecran des notifications (la cloche).",
          "Toucher Tout marquer comme lu.",
        ],
        attendu:
          "La liste des notifications s'affiche. Le compteur de notifications non lues repasse a zero.",
      },
      {
        id: "m-offline",
        titre: "Travailler sans connexion internet",
        aFaire: [
          "Activer le mode avion sur le telephone.",
          "Creer une saisie et l'enregistrer.",
          "Desactiver le mode avion et attendre quelques secondes.",
        ],
        attendu:
          "La saisie est bien enregistree meme sans internet (elle porte une marque Local). Des que le telephone retrouve internet, elle part toute seule et la marque Local disparait.",
      },
    ],
  },

  // ---------------------------------------------------------- Collaborateur
  {
    profil: "collaborateur",
    titre: "Saisir et suivre ses activites",
    cas: [
      {
        id: "m-saisie-create",
        titre: "Saisir une activite",
        aFaire: [
          "Se connecter avec alice.demo@inov.local.",
          "Toucher Nouvelle saisie.",
          "Choisir un dossier et un type d'activite.",
          "Indiquer une duree et une date, ecrire un commentaire.",
          "Enregistrer.",
        ],
        attendu:
          "La saisie apparait dans Mes saisies avec le statut En attente.",
      },
      {
        id: "m-saisie-edit",
        titre: "Modifier ou supprimer une de ses saisies",
        aFaire: [
          "Ouvrir une saisie En attente.",
          "Modifier la duree ou le commentaire, puis enregistrer.",
        ],
        attendu:
          "La modification est bien prise en compte. Une saisie deja Validee, en revanche, ne peut plus etre modifiee ni supprimee.",
      },
      {
        id: "m-attach",
        titre: "Joindre un fichier a une saisie",
        aFaire: [
          "Ouvrir une de ses saisies.",
          "Ajouter une piece jointe (une photo ou un document).",
        ],
        attendu:
          "Le fichier apparait dans la liste des pieces jointes de la saisie.",
      },
      {
        id: "m-pdf",
        titre: "Exporter un commentaire en PDF",
        aFaire: [
          "Ouvrir une saisie qui a un commentaire.",
          "Toucher l'action PDF.",
          "Dans la fenetre de partage, choisir Enregistrer (ou Telechargements).",
        ],
        attendu:
          "Un PDF est cree avec le dossier, la date, la duree et le commentaire mis en forme. Il peut etre enregistre sur le telephone ou partage.",
      },
      {
        id: "m-contest",
        titre: "Contester le refus d'une saisie",
        aFaire: [
          "Ouvrir une saisie Rejetee.",
          "Toucher Contester, ecrire un motif, puis envoyer.",
        ],
        attendu:
          "La contestation part au manager et apparait dans Mes contestations.",
      },
      {
        id: "m-dossiers",
        titre: "Voir ses dossiers",
        aFaire: ["Ouvrir la liste des dossiers."],
        attendu:
          "Les dossiers sur lesquels le collaborateur a le droit de saisir s'affichent.",
      },
    ],
  },

  // ---------------------------------------------------------------- Manager
  {
    profil: "manager",
    titre: "Valider et gerer son equipe",
    cas: [
      {
        id: "m-to-validate",
        titre: "Voir les saisies a valider",
        aFaire: [
          "Se connecter avec marie.demo@inov.local.",
          "Ouvrir l'ecran des saisies a valider.",
        ],
        attendu:
          "Les saisies en attente des membres de l'equipe (Alice, Benoit) s'affichent.",
      },
      {
        id: "m-validate",
        titre: "Valider ou refuser une saisie",
        aFaire: [
          "Ouvrir une saisie en attente.",
          "Toucher Valider, ou Refuser en indiquant un motif.",
        ],
        attendu:
          "La saisie passe en Validee (ou Rejetee) et le collaborateur recoit une notification.",
      },
      {
        id: "m-decide-contest",
        titre: "Traiter une contestation",
        aFaire: [
          "Ouvrir une contestation recue d'un collaborateur.",
          "Accepter ou refuser la contestation.",
        ],
        attendu:
          "La decision est enregistree. Si elle est acceptee, la saisie revient En attente.",
      },
      {
        id: "m-dossier-crud",
        titre: "Creer ou modifier un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer un dossier (ou en modifier un), puis enregistrer.",
        ],
        attendu:
          "Le dossier est cree ou mis a jour. Le bouton Creer n'apparait que si le manager a le droit de creer des dossiers.",
      },
      {
        id: "m-dossier-collab",
        titre: "Affecter des collaborateurs a un dossier",
        aFaire: [
          "Ouvrir un dossier.",
          "Ajouter ou retirer des collaborateurs.",
        ],
        attendu:
          "Les collaborateurs affectes peuvent ensuite saisir sur ce dossier.",
      },
    ],
  },

  // ------------------------------------------------------------------ Admin
  {
    profil: "admin",
    titre: "Administration",
    cas: [
      {
        id: "m-admin-home",
        titre: "Voir l'accueil administrateur",
        aFaire: [
          "Se connecter avec diane.demo@inov.local.",
          "Regarder l'ecran d'accueil.",
        ],
        attendu:
          "L'accueil presente une vue d'ensemble du cabinet. L'admin ne valide pas les saisies : il n'y a pas de panneau de validation.",
      },
      {
        id: "m-admin-dossier",
        titre: "Gerer les dossiers",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer ou modifier un dossier.",
        ],
        attendu: "L'admin peut creer et modifier les dossiers.",
      },
      {
        id: "m-admin-consult",
        titre: "Demander a consulter une saisie",
        aFaire: [
          "Ouvrir une saisie d'un collaborateur.",
          "Demander l'acces au commentaire detaille et aux pieces jointes.",
        ],
        attendu:
          "Le contenu detaille (commentaire, pieces jointes) reste masque tant que la demande de consultation n'est pas approuvee : c'est du contenu confidentiel.",
      },
      {
        id: "m-admin-note",
        titre: "Ajouter une note sur un dossier",
        aFaire: [
          "Ouvrir un dossier.",
          "Ajouter une note, puis enregistrer.",
        ],
        attendu:
          "La note s'affiche sur le dossier pour les membres concernes.",
      },
    ],
  },
];
