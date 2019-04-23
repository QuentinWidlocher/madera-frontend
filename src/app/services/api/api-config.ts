export class ApiConfig {
    // public static BASE_URL = 'http://lazard.sytes.net:3000';
    public static BASE_URL = 'http://127.0.0.1:5000';
    public static BASE_API = ApiConfig.BASE_URL + '/api';

    public static CLIENT = ApiConfig.BASE_API + '/clients';
    public static CLIENT_UNIQUE = ApiConfig.CLIENT + '/:id';
    public static CLIENT_EXISTS = ApiConfig.CLIENT_UNIQUE + '/exists';
    public static CLIENT_COUNT = ApiConfig.CLIENT + '/count';

    public static PROJET = ApiConfig.BASE_API + '/projets';
    public static PROJET_UNIQUE = ApiConfig.PROJET + '/:id';
    public static PROJET_EXISTS = ApiConfig.PROJET_UNIQUE + '/exists';
    public static PROJET_COUNT = ApiConfig.PROJET + '/count';

    public static DOSSIER_TECHNIQUE = ApiConfig.BASE_API + '/dossier-techniques';
    public static DOSSIER_TECHNIQUE_UNIQUE = ApiConfig.DOSSIER_TECHNIQUE + '/:id';
    public static DOSSIER_TECHNIQUE_EXISTS = ApiConfig.DOSSIER_TECHNIQUE_UNIQUE + '/exists';
    public static DOSSIER_TECHNIQUE_COUNT = ApiConfig.DOSSIER_TECHNIQUE + '/count';

    public static DEVIS = ApiConfig.BASE_API + '/devis';
    public static DEVIS_UNIQUE = ApiConfig.DEVIS + '/:id';
    public static DEVIS_EXISTS = ApiConfig.DEVIS_UNIQUE + '/exists';
    public static DEVIS_COUNT = ApiConfig.DEVIS + '/count';

    public static LIGNE = ApiConfig.BASE_API + '/lignes';
    public static LIGNE_UNIQUE = ApiConfig.LIGNE + '/:id';
    public static LIGNE_EXISTS = ApiConfig.LIGNE_UNIQUE + '/exists';
    public static LIGNE_COUNT = ApiConfig.LIGNE + '/count';

    public static UTILISATEUR = ApiConfig.BASE_API + '/utilisateurs';
    public static UTILISATEUR_UNIQUE = ApiConfig.UTILISATEUR + '/:id';
    public static UTILISATEUR_EXISTS = ApiConfig.UTILISATEUR_UNIQUE + '/exists';
    public static UTILISATEUR_COUNT = ApiConfig.UTILISATEUR + '/count';
    public static UTILISATEUR_LOGIN = ApiConfig.UTILISATEUR + '/login';

    public static ROLE = ApiConfig.BASE_API + '/roles';
    public static ROLE_UNIQUE = ApiConfig.ROLE + '/:id';
    public static ROLE_EXISTS = ApiConfig.ROLE_UNIQUE + '/exists';
    public static ROLE_COUNT = ApiConfig.ROLE + '/count';

    public static PLAN = ApiConfig.BASE_API + '/plans';
    public static PLAN_UNIQUE = ApiConfig.PLAN + '/:id';
    public static PLAN_EXISTS = ApiConfig.PLAN_UNIQUE + '/exists';
    public static PLAN_COUNT = ApiConfig.PLAN + '/count';

    public static MODELE = ApiConfig.BASE_API + '/modeles';
    public static MODELE_UNIQUE = ApiConfig.MODELE + '/:id';
    public static MODELE_EXISTS = ApiConfig.MODELE_UNIQUE + '/exists';
    public static MODELE_COUNT = ApiConfig.MODELE + '/count';

    public static PRODUIT = ApiConfig.BASE_API + '/produits';
    public static PRODUIT_UNIQUE = ApiConfig.PRODUIT + '/:id';
    public static PRODUIT_EXISTS = ApiConfig.PRODUIT_UNIQUE + '/exists';
    public static PRODUIT_COUNT = ApiConfig.PRODUIT + '/count';

    public static CCTP = ApiConfig.BASE_API + '/cctps';
    public static CCTP_UNIQUE = ApiConfig.CCTP + '/:id';
    public static CCTP_EXISTS = ApiConfig.CCTP_UNIQUE + '/exists';
    public static CCTP_COUNT = ApiConfig.CCTP + '/count';

    public static GAMME = ApiConfig.BASE_API + '/gammes';
    public static GAMME_UNIQUE = ApiConfig.GAMME + '/:id';
    public static GAMME_EXISTS = ApiConfig.GAMME_UNIQUE + '/exists';
    public static GAMME_COUNT = ApiConfig.GAMME + '/count';

    public static FAMILLE_GAMME = ApiConfig.BASE_API + '/famille-gammes';
    public static FAMILLE_GAMME_UNIQUE = ApiConfig.FAMILLE_GAMME + '/:id';
    public static FAMILLE_GAMME_EXISTS = ApiConfig.FAMILLE_GAMME_UNIQUE + '/exists';
    public static FAMILLE_GAMME_COUNT = ApiConfig.FAMILLE_GAMME + '/count';

    public static MODULE = ApiConfig.BASE_API + '/modules';
    public static MODULE_UNIQUE = ApiConfig.MODULE + '/:id';
    public static MODULE_EXISTS = ApiConfig.MODULE_UNIQUE + '/exists';
    public static MODULE_COUNT = ApiConfig.MODULE + '/count';

    public static CARACTERISTIQUE = ApiConfig.BASE_API + '/caracteristiques';
    public static CARACTERISTIQUE_UNIQUE = ApiConfig.CARACTERISTIQUE + '/:id';
    public static CARACTERISTIQUE_EXISTS = ApiConfig.CARACTERISTIQUE_UNIQUE + '/exists';
    public static CARACTERISTIQUE_COUNT = ApiConfig.CARACTERISTIQUE + '/count';

    public static UNITE = ApiConfig.BASE_API + '/unites';
    public static UNITE_UNIQUE = ApiConfig.UNITE + '/:id';
    public static UNITE_EXISTS = ApiConfig.UNITE_UNIQUE + '/exists';
    public static UNITE_COUNT = ApiConfig.UNITE + '/count';

    public static COUPE_DE_PRINCIPE = ApiConfig.BASE_API + '/coupe-de-principes';
    public static COUPE_DE_PRINCIPE_UNIQUE = ApiConfig.COUPE_DE_PRINCIPE + '/:id';
    public static COUPE_DE_PRINCIPE_EXISTS = ApiConfig.COUPE_DE_PRINCIPE_UNIQUE + '/exists';
    public static COUPE_DE_PRINCIPE_COUNT = ApiConfig.COUPE_DE_PRINCIPE + '/count';

    public static COMPOSANT = ApiConfig.BASE_API + '/composants';
    public static COMPOSANT_UNIQUE = ApiConfig.COMPOSANT + '/:id';
    public static COMPOSANT_EXISTS = ApiConfig.COMPOSANT_UNIQUE + '/exists';
    public static COMPOSANT_COUNT = ApiConfig.COMPOSANT + '/count';

    public static FAMILLE_COMPOSANT = ApiConfig.BASE_API + '/famille-composants';
    public static FAMILLE_COMPOSANT_UNIQUE = ApiConfig.FAMILLE_COMPOSANT + '/:id';
    public static FAMILLE_COMPOSANT_EXISTS = ApiConfig.FAMILLE_COMPOSANT_UNIQUE + '/exists';
    public static FAMILLE_COMPOSANT_COUNT = ApiConfig.FAMILLE_COMPOSANT + '/count';

    public static GAMME_COMPOSANT = ApiConfig.BASE_API + '/gamme-composants';
    public static GAMME_COMPOSANT_UNIQUE = ApiConfig.GAMME_COMPOSANT + '/:id';
    public static GAMME_COMPOSANT_EXISTS = ApiConfig.GAMME_COMPOSANT_UNIQUE + '/exists';
    public static GAMME_COMPOSANT_COUNT = ApiConfig.GAMME_COMPOSANT + '/count';

    public static PING = ApiConfig.CARACTERISTIQUE;
}
