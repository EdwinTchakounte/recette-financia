// APPLICATION MOBILE — cas de test en langage simple.
// Un seul mot de passe pour tous les comptes : Demo2026!
//
// Ne couvre que des fonctionnalites reellement presentes dans le code.

import type { Section } from "./recette-types";

export const MOBILE_SECTIONS: Section[] = [
  // Tous
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
          "L'ecran d'accueil s'affiche. Si tu fermes completement l'application puis la rouvres, tu restes connecte sans ressaisir le mot de passe.",
      },
      {
        id: "m-profil",
        titre: "Voir son profil et se deconnecter",
        aFaire: [
          "Ouvrir l'ecran Profil.",
          "Verifier le nom, l'email et le role affiches.",
          "Toucher Se deconnecter et confirmer.",
        ],
        attendu:
          "Les informations du compte sont correctes et le role est le bon. La deconnexion ramene a l'ecran de connexion.",
      },
      {
        id: "m-notifs",
        titre: "Consulter ses notifications",
        aFaire: [
          "Ouvrir l'ecran des notifications (la cloche en haut).",
          "Toucher Tout lire.",
        ],
        attendu:
          "La liste des notifications s'affiche. Le compteur de non lues repasse a zero. Un filtre Non lues est disponible.",
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
          "La saisie est enregistree meme sans internet : elle porte un badge Local. Des que le telephone retrouve internet, elle part toute seule et le badge disparait.",
      },
      {
        id: "m-sync",
        titre: "Synchroniser et gerer la file d'attente",
        aFaire: [
          "Ouvrir la File de synchronisation depuis le profil.",
          "Toucher Synchroniser maintenant.",
          "Le cas echeant, resoudre un conflit ou relancer une operation en echec.",
        ],
        attendu:
          "La file se vide et les saisies en attente partent. En cas de conflit, le choix Garder le serveur ou Reappliquer est propose.",
      },
    ],
  },

  // Collaborateur
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
          "Choisir un Dossier et un Type d'activite.",
          "Indiquer une Duree, ecrire un Commentaire, ajouter une Piece jointe si besoin.",
          "Enregistrer.",
        ],
        attendu:
          "La saisie apparait dans Mes saisies avec le statut En attente.",
      },
      {
        id: "m-saisie-edit",
        titre: "Modifier ou supprimer une de ses saisies",
        aFaire: [
          "Ouvrir une de ses saisies En attente.",
          "Toucher Modifier, changer la duree, la date ou le commentaire, puis enregistrer.",
          "Pour supprimer : ouvrir le menu trois points en haut a droite, puis Supprimer.",
        ],
        attendu:
          "La modification est prise en compte. Une saisie deja Validee ne peut plus etre modifiee ni supprimee : les actions disparaissent et un bandeau Saisie validee s'affiche.",
      },
      {
        id: "m-attach",
        titre: "Ouvrir les pieces jointes d'une saisie",
        aFaire: [
          "Ouvrir une saisie qui a une piece jointe.",
          "Toucher la piece pour l'ouvrir.",
        ],
        attendu:
          "La piece jointe s'ouvre correctement.",
      },
      {
        id: "m-pdf",
        titre: "Exporter un commentaire en PDF",
        aFaire: [
          "Ouvrir une de ses saisies En attente ou Rejetee (dont on est l'auteur).",
          "Passer en edition du commentaire.",
          "Dans la barre de l'editeur, toucher l'action PDF, puis choisir Enregistrer ou Partager.",
        ],
        attendu:
          "Un PDF est cree avec le dossier, la date, la duree et le commentaire mis en forme. Il peut etre enregistre ou partage.",
      },
      {
        id: "m-contest",
        titre: "Contester le refus d'une saisie",
        aFaire: [
          "Ouvrir une saisie concernee (dont on est l'auteur).",
          "Toucher Contester, ecrire un Message, puis Envoyer.",
        ],
        attendu:
          "La contestation part au manager et apparait dans l'onglet Mes contestations.",
      },
      {
        id: "m-dossiers",
        titre: "Voir ses dossiers",
        aFaire: ["Ouvrir la liste des dossiers."],
        attendu:
          "Les dossiers sur lesquels le collaborateur a le droit de saisir s'affichent. Il n'y a pas de bouton de creation pour un collaborateur.",
      },
      {
        id: "m-dossier-detail",
        titre: "Ouvrir le detail d'un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Toucher un dossier.",
        ],
        attendu:
          "Le dossier s'affiche avec ses informations, ses notes et la liste de ses saisies.",
      },
      {
        id: "m-saisie-detail",
        titre: "Ouvrir une saisie et lire ses details",
        aFaire: [
          "Ouvrir une saisie depuis Mes saisies.",
        ],
        attendu:
          "La saisie s'affiche avec le dossier, le type, la duree, la date, le commentaire et les pieces jointes.",
      },
      {
        id: "m-saisie-search",
        titre: "Rechercher et filtrer ses saisies",
        aFaire: [
          "Ouvrir Mes saisies.",
          "Utiliser la recherche, filtrer par statut, changer de mois.",
        ],
        attendu:
          "La liste se met a jour selon la recherche, le statut choisi et le mois affiche.",
      },
    ],
  },

  // Manager
  {
    profil: "manager",
    titre: "Valider et gerer son equipe",
    cas: [
      {
        id: "m-to-validate",
        titre: "Voir les saisies a valider",
        aFaire: [
          "Se connecter avec marie.demo@inov.local.",
          "Ouvrir la carte Saisies a valider.",
        ],
        attendu:
          "Les saisies en attente des membres de l'equipe (Alice, Benoit) s'affichent.",
      },
      {
        id: "m-validate",
        titre: "Valider ou refuser une saisie",
        aFaire: [
          "Ouvrir une saisie en attente.",
          "Toucher Valider, ou Rejeter en choisissant un Motif (obligatoire).",
        ],
        attendu:
          "La saisie passe en Validee ou Rejetee et le collaborateur recoit une notification.",
      },
      {
        id: "m-decide-contest",
        titre: "Traiter une contestation",
        aFaire: [
          "Ouvrir une contestation recue d'un collaborateur (ou l'onglet A decider).",
          "Toucher Examiner et decider, choisir Accepter ou Refuser, puis confirmer.",
        ],
        attendu:
          "La decision est enregistree. Si elle est acceptee, la saisie repasse En attente.",
      },
      {
        id: "m-dossier-crud",
        titre: "Creer ou modifier un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer un dossier avec le bouton +, ou en ouvrir un et toucher Modifier.",
        ],
        attendu:
          "Le dossier est cree ou mis a jour. Le bouton + n'apparait que si le manager a le droit de creer des dossiers.",
      },
      {
        id: "m-dossier-collab",
        titre: "Affecter des collaborateurs a un dossier",
        aFaire: [
          "Ouvrir un dossier, puis l'action Collaborateurs.",
          "Ajouter un collaborateur, ou en retirer un via Retirer.",
        ],
        attendu:
          "Les collaborateurs affectes peuvent ensuite saisir sur ce dossier.",
      },
      {
        id: "m-consult-list",
        titre: "Suivre les demandes de consultation",
        aFaire: [
          "Ouvrir les Demandes de consultation.",
          "Parcourir la file A decider (et, pour un admin, l'onglet Mes demandes).",
        ],
        attendu:
          "Les demandes s'affichent avec leur statut (en attente, active, expiree, refusee).",
      },
    ],
  },

  // Admin
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
          "L'accueil presente une vue d'ensemble du cabinet (indicateurs, activite recente). L'administrateur ne valide pas les saisies : il n'y a pas de panneau de validation.",
      },
      {
        id: "m-admin-dossier",
        titre: "Gerer les dossiers",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Creer ou modifier un dossier.",
        ],
        attendu: "L'administrateur peut creer et modifier les dossiers.",
      },
      {
        id: "m-admin-consult",
        titre: "Demander a consulter une saisie",
        aFaire: [
          "Ouvrir une saisie d'un collaborateur.",
          "Sur l'ecran Acces restreint, toucher Demander acces et justifier.",
        ],
        attendu:
          "Le contenu detaille (commentaire) reste masque derriere Contenu restreint tant que la demande n'est pas approuvee. Une fois approuvee, l'acces est ouvert pour une duree limitee.",
      },
    ],
  },
];
