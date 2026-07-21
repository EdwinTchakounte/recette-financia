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


# Non couvert pour le moment

Fonctionnalites pas encore disponibles dans l'application. Elles sont listees
ici pour memoire : il n'y a rien a tester dessus pour l'instant.

## Site web

### Modifier ou supprimer une saisie
L'edition et la suppression d'une saisie ne sont pas encore disponibles sur le
site web. Elles existent sur l'application mobile (voir m-saisie-edit). Sur le
web, une saisie se consulte mais ne se modifie pas.

### Contester le refus d'une saisie
Le depot d'une contestation se fait sur l'application mobile (voir m-contest).
Le site web permet seulement de suivre ses contestations et, cote manager, de
les traiter.

## Application mobile

### Ajouter une note sur un dossier
L'application mobile affiche les notes d'un dossier mais ne permet pas encore
d'en ajouter. La creation d'une note n'est pas disponible.
