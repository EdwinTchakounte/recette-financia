// Plan de recette Financia — modele oriente testeur (non technique).
//
// Un testeur voit, pour chaque cas : ce qu'il doit faire, ce qui doit se
// passer, et des boutons pour dire si c'est OK ou s'il y a un probleme.

export type Plateforme = "web" | "mobile";

export type Profil = "tous" | "collaborateur" | "manager" | "admin";

// Etat d'un cas de test, choisi par le testeur.
export type Statut = "a_tester" | "ok" | "probleme";

export type CasTest = {
  id: string;
  titre: string;
  // Etapes concretes, en langage simple.
  aFaire: string[];
  // Ce qui doit se passer si tout va bien.
  attendu: string;
};

export type Section = {
  profil: Profil;
  titre: string;
  cas: CasTest[];
};

// Fonctionnalite pas encore disponible dans l'application : listee a titre
// informatif (pas de test a cocher), pour dire clairement ce qui reste a venir.
export type NonCouvert = {
  id: string;
  titre: string;
  // Pourquoi ce n'est pas encore testable, en une phrase simple.
  detail: string;
};

export type Compte = {
  email: string;
  role: Profil;
  // A quoi sert ce compte, en clair.
  pour: string;
};
