# Plan de recette Financia

Document destine aux testeurs. Chaque cas indique ce qu'il faut faire, ce qui doit
se passer, et un emplacement reserve pour la capture d'ecran (a ajouter plus tard).

Les captures se rangent dans `captures/web/` et `captures/mobile/`, nommees par
l'identifiant du cas (exemple `captures/web/w-login.png`). Tant que l'image n'existe
pas, l'emplacement affiche sa description.

## Comment tester

Pour chaque cas : suis les etapes, regarde si le resultat correspond a ce qui est
attendu, puis note OK si tout va bien ou Probleme si quelque chose ne marche pas.
En cas de probleme, ecris en une phrase ce qui ne va pas.

## Comptes de test

Mot de passe unique pour tous les comptes : `Demo2026!`

| Email | Role | A quoi il sert |
|---|---|---|
| alice.demo@inov.local | Collaborateur | Saisir des activites, joindre des fichiers, contester un refus |
| benoit.demo@inov.local | Collaborateur | Deuxieme collaborateur de la meme equipe qu'Alice (tests a deux) |
| marie.demo@inov.local | Manager | Valider ou refuser les saisies de son equipe (Alice, Benoit), gerer les dossiers |
| mathieu.demo@inov.local | Manager | Manager d'une autre equipe (Camille) |
| diane.demo@inov.local | Administrateur | Vue d'ensemble du cabinet, gestion des dossiers, demandes de consultation |
| camille.demo@inov.local | Collaborateur | Collaboratrice de l'equipe de Mathieu |


# Site web (back-office)

## Tout le monde

### w-login. Se connecter au site
**A faire :**
1. Ouvrir le site.
2. Se connecter avec un compte de test via l'ecran Keycloak.

**Attendu :** l'accueil s'affiche selon le role (Administrateur ou Manager arrivent
sur le Tableau de bord, Collaborateur sur la liste des saisies). En rechargeant la
page, on reste connecte.

**Capture :** accueil affiche juste apres la connexion.

![Capture a inserer: accueil apres connexion selon le role](captures/web/w-login.png)


### w-notifs. Consulter ses notifications
**A faire :**
1. Ouvrir les notifications depuis la cloche en haut a droite.
2. Cliquer une notification pour la marquer lue, ou utiliser le bouton "Tout marquer lu".

**Attendu :** la liste s'affiche (onglets "Toutes" et "Non lues") et le compteur de la
cloche se met a jour.

**Capture :** liste des notifications avec le compteur de la cloche visible.

![Capture a inserer: liste des notifications et compteur cloche](captures/web/w-notifs.png)


### w-profil. Consulter et mettre a jour son profil
**A faire :**
1. Ouvrir son profil.
2. Verifier ses informations (nom, email, role, manager).
3. Modifier son profil metier, puis enregistrer.

**Attendu :** les informations du compte sont correctes. La mise a jour du profil
metier est enregistree, et les statistiques d'activite recente s'affichent.

**Capture :** ecran du profil avec les informations et les statistiques.

![Capture a inserer: profil utilisateur web](captures/web/w-profil.png)


### w-dossier-detail. Consulter le detail d'un dossier
**A faire :**
1. Ouvrir la liste des dossiers.
2. Ouvrir un dossier.
3. Parcourir les onglets Informations, Equipe et Historique.

**Attendu :** le dossier s'affiche avec ses informations, son equipe et son historique.

**Capture :** detail d'un dossier avec ses onglets.

![Capture a inserer: detail d'un dossier web](captures/web/w-dossier-detail.png)


## Collaborateur

### w-saisie-create. Saisir une activite
**A faire :**
1. Se connecter avec alice.demo@inov.local.
2. Cliquer "Nouvelle saisie".
3. Renseigner : Date (par defaut aujourd'hui), Dossier, Type d'activite, Duree en
   minutes (entre 5 et 480), et un Commentaire si besoin.
4. Cliquer "Enregistrer".

**Attendu :** la saisie apparait dans la liste avec le statut "En attente".

**Capture :** liste des saisies avec la nouvelle ligne en statut "En attente".

![Capture a inserer: nouvelle saisie en attente dans la liste](captures/web/w-saisie-create.png)


### w-attach. Joindre un fichier et le telecharger
**A faire :**
1. Dans le formulaire "Nouvelle saisie", ajouter une piece jointe (image ou PDF)
   avant d'enregistrer.
2. Rouvrir la saisie, cliquer "Apercu" sur la piece, puis "Telecharger".

**Attendu :** la piece est bien enregistree avec la saisie. En rouvrant la saisie,
on peut l'afficher en apercu et la telecharger.

**Capture :** apercu d'une piece jointe ouvert depuis le detail de la saisie.

![Capture a inserer: apercu d'une piece jointe](captures/web/w-attach.png)


### w-export. Exporter la liste en CSV et PDF
**A faire :**
1. Ouvrir la liste des saisies, appliquer un filtre si tu veux (statut, dossier, dates).
2. Cliquer "Export CSV", puis "Export PDF".

**Attendu :** deux fichiers se telechargent, correspondant a la liste affichee avec
les filtres et les colonnes visibles en cours.

**Capture :** liste des saisies avec les boutons d'export visibles.

![Capture a inserer: boutons Export CSV et PDF sur la liste](captures/web/w-export.png)


## Manager

### w-validate. Valider ou refuser les saisies de l'equipe
**A faire :**
1. Se connecter avec marie.demo@inov.local.
2. Ouvrir "File de validation" (liste filtree sur les saisies "En attente").
3. Sur une ligne, cliquer "Valider". Sur une autre, cliquer "Rejeter" et choisir un
   Motif de rejet (obligatoire), avec un commentaire optionnel.

**Attendu :** seules les saisies de son equipe apparaissent. La validation ou le refus
met a jour le statut et notifie le collaborateur.

**Capture :** file de validation avec les actions Valider et Rejeter sur une ligne.

![Capture a inserer: file de validation, actions Valider et Rejeter](captures/web/w-validate.png)


### w-decide-contest. Traiter les contestations
**A faire :**
1. Ouvrir les Contestations, onglet "A decider".
2. Cliquer "Decider" sur une contestation, puis choisir "Accepter" ou "Refuser".

**Attendu :** la decision est enregistree. Si acceptee, la saisie repasse "En attente".

**Capture :** formulaire de decision d'une contestation (Accepter / Refuser).

![Capture a inserer: decision d'une contestation](captures/web/w-decide-contest.png)


### w-dossier. Creer ou modifier un dossier
**A faire :**
1. Ouvrir la liste des dossiers.
2. Creer un dossier, ou en ouvrir un et cliquer "Modifier", puis enregistrer.

**Attendu :** le dossier est cree ou mis a jour. Le bouton "Modifier" n'apparait que
si le manager a le droit sur ce dossier.

**Capture :** formulaire de creation ou d'edition d'un dossier.

![Capture a inserer: formulaire dossier (creation ou edition)](captures/web/w-dossier.png)


### w-dossier-collab. Affecter des collaborateurs a un dossier
**A faire :**
1. Ouvrir un dossier, onglet "Equipe".
2. Cliquer "Ajouter un collaborateur", ou retirer un collaborateur via l'icone corbeille.

**Attendu :** les collaborateurs affectes peuvent saisir sur ce dossier.

**Capture :** onglet Equipe d'un dossier avec la liste des collaborateurs.

![Capture a inserer: onglet Equipe du dossier](captures/web/w-dossier-collab.png)


### w-dashboard. Consulter le tableau de bord
**A faire :**
1. Ouvrir le Tableau de bord.

**Attendu :** les indicateurs de l'equipe s'affichent. Le tableau de bord est reserve
aux managers et aux administrateurs : un collaborateur ne le voit pas dans le menu.

**Capture :** tableau de bord manager avec ses indicateurs.

![Capture a inserer: tableau de bord manager](captures/web/w-dashboard.png)


### w-dossier-attach. Joindre des fichiers a un dossier
**A faire :**
1. Ouvrir un dossier, onglet Pieces jointes.
2. Deposer un fichier (glisser-deposer ou parcourir).
3. Ouvrir l'apercu du fichier, puis le supprimer si besoin.

**Attendu :** le fichier est ajoute au dossier, l'apercu s'affiche et la suppression
fonctionne.

**Capture :** onglet Pieces jointes d'un dossier.

![Capture a inserer: pieces jointes d'un dossier web](captures/web/w-dossier-attach.png)


### w-consult-decide. Decider une demande de consultation
**A faire :**
1. Ouvrir les Demandes de consultation, onglet A decider.
2. Ouvrir une demande recue.
3. Cliquer Approuver ou Refuser.

**Attendu :** la decision est enregistree. Si approuvee, le demandeur obtient l'acces
au contenu pour une duree limitee.

**Capture :** decision d'une demande de consultation.

![Capture a inserer: decision d'une demande de consultation](captures/web/w-consult-decide.png)


## Administrateur

### w-admin-dashboard. Voir le tableau de bord a l'echelle du cabinet
**A faire :**
1. Se connecter avec diane.demo@inov.local.
2. Ouvrir le Tableau de bord.

**Attendu :** une vue d'ensemble du cabinet s'affiche, au-dela d'une seule equipe.

**Capture :** tableau de bord vu par l'administrateur.

![Capture a inserer: tableau de bord administrateur](captures/web/w-admin-dashboard.png)


### w-clients. Gerer les clients et exporter leur activite
**A faire :**
1. Ouvrir la liste des clients.
2. Cliquer "Nouveau client", ou "Modifier" un client existant.
3. Sur une ligne client, cliquer l'action "Exporter l'activite en PDF".

**Attendu :** les clients se creent et se modifient. L'export PDF de l'activite d'un
client se telecharge.

**Capture :** liste des clients avec l'action d'export d'activite.

![Capture a inserer: liste des clients et export activite PDF](captures/web/w-clients.png)


### w-audit. Consulter le journal d'audit
**A faire :**
1. Ouvrir le Journal d'audit.
2. Cliquer "Export CSV", puis "Export PDF".

**Attendu :** les evenements s'affichent et l'export se telecharge.

**Capture :** journal d'audit avec les boutons d'export.

![Capture a inserer: journal d'audit et exports](captures/web/w-audit.png)


### w-admin-consult. Demander la consultation d'une saisie
**A faire :**
1. Ouvrir une saisie d'un collaborateur.
2. Cliquer "Faire une demande de consultation" et saisir une justification.

**Attendu :** le contenu detaille (commentaire et pieces jointes) reste masque
derriere un bandeau "Contenu restreint" tant que la demande n'est pas approuvee.

**Capture :** bandeau "Contenu restreint" et bouton de demande de consultation.

![Capture a inserer: contenu restreint et demande de consultation](captures/web/w-admin-consult.png)


### w-dossier-note. Publier une note sur un dossier
**A faire :**
1. Ouvrir un dossier, onglet Notes admin.
2. Cliquer Publier une note, ecrire la note, puis publier.

**Attendu :** la note est publiee sur le dossier et visible par le manager et les
collaborateurs concernes.

**Capture :** note admin publiee sur un dossier.

![Capture a inserer: note admin sur un dossier](captures/web/w-dossier-note.png)


### w-users. Gerer les utilisateurs
**A faire :**
1. Ouvrir la liste des utilisateurs.
2. Creer un utilisateur.
3. Ouvrir un utilisateur, modifier ses informations, changer son role ou son manager.
4. Desactiver puis reactiver un utilisateur.

**Attendu :** les utilisateurs se creent et se modifient. Le changement de role ou de
manager est pris en compte. Un utilisateur desactive ne peut plus se connecter.

**Capture :** gestion des utilisateurs (liste et formulaire).

![Capture a inserer: gestion des utilisateurs](captures/web/w-users.png)


### w-permissions. Gerer les droits d'un utilisateur
**A faire :**
1. Ouvrir la page des permissions.
2. Accorder un droit a un utilisateur (choisir la ressource, l'action, l'echeance).
3. Revoquer un droit accorde.

**Attendu :** le droit est accorde ou revoque, et l'utilisateur gagne ou perd l'acces
correspondant.

**Capture :** page des permissions avec un droit accorde.

![Capture a inserer: gestion des permissions](captures/web/w-permissions.png)


### w-referentiels. Gerer les listes de reference
**A faire :**
1. Ouvrir la page des referentiels.
2. Ajouter une entree (par exemple un type d'activite).
3. Modifier une entree, puis en desactiver une.

**Attendu :** les entrees se creent, se modifient et se desactivent. Elles alimentent
les listes deroulantes des formulaires.

**Capture :** page des referentiels avec une entree.

![Capture a inserer: gestion des referentiels](captures/web/w-referentiels.png)


# Application mobile

## Tout le monde

### m-login. Se connecter a l'application
**A faire :**
1. Ouvrir l'application.
2. Saisir l'email et le mot de passe d'un compte de test.
3. Toucher "Se connecter".

**Attendu :** l'ecran d'accueil s'affiche. Si tu fermes completement l'application
puis la rouvres, tu restes connecte sans ressaisir le mot de passe.

**Capture :** ecran d'accueil affiche apres la connexion.

![Capture a inserer: accueil apres connexion mobile](captures/mobile/m-login.png)


### m-profil. Voir son profil et se deconnecter
**A faire :**
1. Ouvrir l'ecran Profil.
2. Verifier le nom, l'email et le role affiches.
3. Toucher "Se deconnecter" et confirmer.

**Attendu :** les informations du compte sont correctes et le role est le bon. La
deconnexion ramene a l'ecran de connexion.

**Capture :** ecran Profil avec nom, email et role.

![Capture a inserer: ecran profil mobile](captures/mobile/m-profil.png)


### m-notifs. Consulter ses notifications
**A faire :**
1. Ouvrir l'ecran des notifications (la cloche en haut).
2. Toucher "Tout lire".

**Attendu :** la liste des notifications s'affiche. Le compteur de non-lues repasse
a zero. Un filtre "Non lues" est disponible.

**Capture :** liste des notifications avec le bouton "Tout lire".

![Capture a inserer: notifications mobile et bouton Tout lire](captures/mobile/m-notifs.png)


### m-offline. Travailler sans connexion internet
**A faire :**
1. Activer le mode avion sur le telephone.
2. Creer une saisie et l'enregistrer.
3. Desactiver le mode avion et attendre quelques secondes.

**Attendu :** la saisie est enregistree meme sans internet. Elle porte un badge
"Local". Des que le telephone retrouve internet, elle part toute seule et le badge
disparait.

**Capture :** saisie avec le badge "Local" avant synchronisation.

![Capture a inserer: badge Local sur une saisie hors ligne](captures/mobile/m-offline.png)


### m-sync. Synchroniser et gerer la file d'attente
**A faire :**
1. Ouvrir la File de synchronisation depuis le profil.
2. Toucher Synchroniser maintenant.
3. Le cas echeant, resoudre un conflit ou relancer une operation en echec.

**Attendu :** la file se vide et les saisies en attente partent. En cas de conflit, le
choix Garder le serveur ou Reappliquer est propose.

**Capture :** ecran de la file de synchronisation.

![Capture a inserer: file de synchronisation mobile](captures/mobile/m-sync.png)


## Collaborateur

### m-saisie-create. Saisir une activite
**A faire :**
1. Se connecter avec alice.demo@inov.local.
2. Toucher "Nouvelle saisie".
3. Choisir un Dossier et un Type d'activite.
4. Indiquer une Duree, ecrire un Commentaire, ajouter une Piece jointe si besoin.
5. Enregistrer.

**Attendu :** la saisie apparait dans "Mes saisies" avec le statut "En attente".

**Capture :** formulaire de nouvelle saisie mobile.

![Capture a inserer: formulaire nouvelle saisie mobile](captures/mobile/m-saisie-create.png)


### m-saisie-edit. Modifier ou supprimer une de ses saisies
**A faire :**
1. Ouvrir une de ses saisies "En attente".
2. Toucher "Modifier", changer la duree, la date ou le commentaire, puis enregistrer.
3. Pour supprimer : ouvrir le menu trois points en haut a droite, puis "Supprimer".

**Attendu :** la modification est prise en compte. Une saisie deja "Validee" ne peut
plus etre modifiee ni supprimee : les actions disparaissent et un bandeau "Saisie
validee" s'affiche.

**Capture :** detail d'une saisie en attente avec les actions Modifier et Supprimer.

![Capture a inserer: edition d'une saisie mobile](captures/mobile/m-saisie-edit.png)


### m-attach. Ouvrir les pieces jointes d'une saisie
**A faire :**
1. Ouvrir une saisie qui a une piece jointe.
2. Toucher la piece pour l'ouvrir.

**Attendu :** la piece jointe s'ouvre correctement.

**Capture :** liste des pieces jointes d'une saisie et ouverture d'une piece.

![Capture a inserer: pieces jointes d'une saisie mobile](captures/mobile/m-attach.png)


### m-pdf. Exporter un commentaire en PDF
**A faire :**
1. Ouvrir une de ses saisies "En attente" ou "Rejetee" (dont on est l'auteur).
2. Passer en edition du commentaire.
3. Dans la barre de l'editeur, toucher l'action "PDF", puis choisir Enregistrer ou Partager.

**Attendu :** un PDF est cree avec le dossier, la date, la duree et le commentaire mis
en forme. Il peut etre enregistre ou partage.

**Capture :** action PDF dans l'editeur de commentaire.

![Capture a inserer: export PDF du commentaire mobile](captures/mobile/m-pdf.png)


### m-contest. Contester le refus d'une saisie
**A faire :**
1. Ouvrir une saisie concernee (dont on est l'auteur).
2. Toucher "Contester", ecrire un Message, puis "Envoyer".

**Attendu :** la contestation part au manager et apparait dans l'onglet
"Mes contestations".

**Capture :** formulaire de contestation avec le champ Message.

![Capture a inserer: contestation d'une saisie mobile](captures/mobile/m-contest.png)


### m-dossiers. Voir ses dossiers
**A faire :**
1. Ouvrir la liste des dossiers.

**Attendu :** les dossiers sur lesquels le collaborateur a le droit de saisir
s'affichent. Il n'y a pas de bouton de creation pour un collaborateur.

**Capture :** liste des dossiers du collaborateur.

![Capture a inserer: liste des dossiers collaborateur mobile](captures/mobile/m-dossiers.png)


### m-dossier-detail. Ouvrir le detail d'un dossier
**A faire :**
1. Ouvrir la liste des dossiers.
2. Toucher un dossier.

**Attendu :** le dossier s'affiche avec ses informations, ses notes et la liste de ses
saisies.

**Capture :** detail d'un dossier mobile.

![Capture a inserer: detail d'un dossier mobile](captures/mobile/m-dossier-detail.png)


### m-saisie-detail. Ouvrir une saisie et lire ses details
**A faire :**
1. Ouvrir une saisie depuis Mes saisies.

**Attendu :** la saisie s'affiche avec le dossier, le type, la duree, la date, le
commentaire et les pieces jointes.

**Capture :** detail d'une saisie mobile.

![Capture a inserer: detail d'une saisie mobile](captures/mobile/m-saisie-detail.png)


### m-saisie-search. Rechercher et filtrer ses saisies
**A faire :**
1. Ouvrir Mes saisies.
2. Utiliser la recherche, filtrer par statut, changer de mois.

**Attendu :** la liste se met a jour selon la recherche, le statut choisi et le mois
affiche.

**Capture :** recherche et filtres dans Mes saisies.

![Capture a inserer: recherche et filtres des saisies mobile](captures/mobile/m-saisie-search.png)


## Manager

### m-to-validate. Voir les saisies a valider
**A faire :**
1. Se connecter avec marie.demo@inov.local.
2. Ouvrir la carte "Saisies a valider".

**Attendu :** les saisies en attente des membres de l'equipe (Alice, Benoit)
s'affichent.

**Capture :** liste des saisies a valider.

![Capture a inserer: saisies a valider mobile](captures/mobile/m-to-validate.png)


### m-validate. Valider ou refuser une saisie
**A faire :**
1. Ouvrir une saisie en attente.
2. Toucher "Valider", ou "Rejeter" en choisissant un Motif (obligatoire).

**Attendu :** la saisie passe en "Validee" ou "Rejetee" et le collaborateur recoit
une notification.

**Capture :** panneau de validation avec Valider et Rejeter.

![Capture a inserer: panneau de validation mobile](captures/mobile/m-validate.png)


### m-decide-contest. Traiter une contestation
**A faire :**
1. Ouvrir une contestation recue d'un collaborateur (ou l'onglet "A decider").
2. Toucher "Examiner et decider", choisir "Accepter" ou "Refuser", puis confirmer.

**Attendu :** la decision est enregistree. Si elle est acceptee, la saisie repasse
"En attente".

**Capture :** decision d'une contestation cote manager mobile.

![Capture a inserer: decision d'une contestation mobile](captures/mobile/m-decide-contest.png)


### m-dossier-crud. Creer ou modifier un dossier
**A faire :**
1. Ouvrir la liste des dossiers.
2. Creer un dossier avec le bouton "+", ou en ouvrir un et toucher "Modifier".

**Attendu :** le dossier est cree ou mis a jour. Le bouton "+" n'apparait que si le
manager a le droit de creer des dossiers.

**Capture :** liste des dossiers manager avec le bouton de creation.

![Capture a inserer: creation ou edition de dossier mobile](captures/mobile/m-dossier-crud.png)


### m-dossier-collab. Affecter des collaborateurs a un dossier
**A faire :**
1. Ouvrir un dossier, puis l'action "Collaborateurs".
2. Ajouter un collaborateur, ou en retirer un via "Retirer".

**Attendu :** les collaborateurs affectes peuvent ensuite saisir sur ce dossier.

**Capture :** gestion des collaborateurs d'un dossier.

![Capture a inserer: collaborateurs d'un dossier mobile](captures/mobile/m-dossier-collab.png)


### m-consult-list. Suivre les demandes de consultation
**A faire :**
1. Ouvrir les Demandes de consultation.
2. Parcourir la file A decider (et, pour un admin, l'onglet Mes demandes).

**Attendu :** les demandes s'affichent avec leur statut (en attente, active, expiree,
refusee).

**Capture :** liste des demandes de consultation mobile.

![Capture a inserer: demandes de consultation mobile](captures/mobile/m-consult-list.png)


## Administrateur

### m-admin-home. Voir l'accueil administrateur
**A faire :**
1. Se connecter avec diane.demo@inov.local.
2. Regarder l'ecran d'accueil.

**Attendu :** l'accueil presente une vue d'ensemble du cabinet (indicateurs, activite
recente). L'administrateur ne valide pas les saisies : il n'y a pas de panneau de
validation.

**Capture :** accueil administrateur mobile.

![Capture a inserer: accueil administrateur mobile](captures/mobile/m-admin-home.png)


### m-admin-dossier. Gerer les dossiers
**A faire :**
1. Ouvrir la liste des dossiers.
2. Creer ou modifier un dossier.

**Attendu :** l'administrateur peut creer et modifier les dossiers.

**Capture :** gestion des dossiers cote administrateur mobile.

![Capture a inserer: gestion des dossiers administrateur mobile](captures/mobile/m-admin-dossier.png)


### m-admin-consult. Demander a consulter une saisie
**A faire :**
1. Ouvrir une saisie d'un collaborateur.
2. Sur l'ecran "Acces restreint", toucher "Demander acces" et justifier.

**Attendu :** le contenu detaille (commentaire) reste masque derriere "Contenu
restreint" tant que la demande n'est pas approuvee. Une fois approuvee, l'acces est
ouvert pour une duree limitee.

**Capture :** ecran "Acces restreint" avec la demande de consultation.

![Capture a inserer: acces restreint et demande de consultation mobile](captures/mobile/m-admin-consult.png)

