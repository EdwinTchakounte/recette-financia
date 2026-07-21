// SITE WEB (back-office) — cas de test en langage simple.
// Un seul mot de passe pour tous les comptes : Demo2026!
//
// Ne couvre que des fonctionnalites reellement presentes dans le code.

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
          "La liste s'affiche (onglets Toutes et Non lues) et le compteur de la cloche se met a jour.",
      },
      {
        id: "w-profil",
        titre: "Consulter et mettre a jour son profil",
        aFaire: [
          "Ouvrir son profil.",
          "Verifier ses informations (nom, email, role, manager).",
          "Modifier son profil metier, puis enregistrer.",
        ],
        attendu:
          "Les informations du compte sont correctes. La mise a jour du profil metier est enregistree, et les statistiques d'activite recente s'affichent.",
      },
      {
        id: "w-dossier-detail",
        titre: "Consulter le detail d'un dossier",
        aFaire: [
          "Ouvrir la liste des dossiers.",
          "Ouvrir un dossier.",
          "Parcourir les onglets Informations, Equipe et Historique.",
        ],
        attendu:
          "Le dossier s'affiche avec ses informations, son equipe et son historique.",
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
          "La piece est enregistree avec la saisie. En rouvrant la saisie, on peut l'afficher en apercu et la telecharger.",
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
          "Seules les saisies de son equipe apparaissent. La validation ou le refus met a jour le statut et notifie le collaborateur.",
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
      {
        id: "w-dossier-attach",
        titre: "Joindre des fichiers a un dossier",
        aFaire: [
          "Ouvrir un dossier, onglet Pieces jointes.",
          "Deposer un fichier (glisser-deposer ou parcourir).",
          "Ouvrir l'apercu du fichier, puis le supprimer si besoin.",
        ],
        attendu:
          "Le fichier est ajoute au dossier, l'apercu s'affiche et la suppression fonctionne.",
      },
      {
        id: "w-consult-decide",
        titre: "Decider une demande de consultation",
        aFaire: [
          "Ouvrir les Demandes de consultation, onglet A decider.",
          "Ouvrir une demande recue.",
          "Cliquer Approuver ou Refuser.",
        ],
        attendu:
          "La decision est enregistree. Si approuvee, le demandeur obtient l'acces au contenu pour une duree limitee.",
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
          "Une vue d'ensemble du cabinet s'affiche, au-dela d'une seule equipe.",
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
      {
        id: "w-dossier-note",
        titre: "Publier une note sur un dossier",
        aFaire: [
          "Ouvrir un dossier, onglet Notes admin.",
          "Cliquer Publier une note, ecrire la note, puis publier.",
        ],
        attendu:
          "La note est publiee sur le dossier et visible par le manager et les collaborateurs concernes.",
      },
      {
        id: "w-users",
        titre: "Gerer les utilisateurs",
        aFaire: [
          "Ouvrir la liste des utilisateurs.",
          "Creer un utilisateur.",
          "Ouvrir un utilisateur, modifier ses informations, changer son role ou son manager.",
          "Desactiver puis reactiver un utilisateur.",
        ],
        attendu:
          "Les utilisateurs se creent et se modifient. Le changement de role ou de manager est pris en compte. Un utilisateur desactive ne peut plus se connecter.",
      },
      {
        id: "w-permissions",
        titre: "Gerer les droits d'un utilisateur",
        aFaire: [
          "Ouvrir la page des permissions.",
          "Accorder un droit a un utilisateur (choisir la ressource, l'action, l'echeance).",
          "Revoquer un droit accorde.",
        ],
        attendu:
          "Le droit est accorde ou revoque, et l'utilisateur gagne ou perd l'acces correspondant.",
      },
      {
        id: "w-referentiels",
        titre: "Gerer les listes de reference",
        aFaire: [
          "Ouvrir la page des referentiels.",
          "Ajouter une entree (par exemple un type d'activite).",
          "Modifier une entree, puis en desactiver une.",
        ],
        attendu:
          "Les entrees se creent, se modifient et se desactivent. Elles alimentent les listes deroulantes des formulaires.",
      },
    ],
  },
];
