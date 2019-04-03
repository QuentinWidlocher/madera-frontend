export class ApiConfig {
    public static BASE_URL = 'http://lazard.sytes.net:3000/';
    public static BASE_API = ApiConfig.BASE_URL + 'api/';

    public static CLIENT = ApiConfig.BASE_API + 'client/';
    public static CLIENT_UNIQUE = ApiConfig.CLIENT + ':id/';
    public static CLIENT_EXISTS = ApiConfig.CLIENT_UNIQUE + 'exists/';
    public static CLIENT_COUNT = ApiConfig.CLIENT + 'count/';

    public static PROJET = ApiConfig.BASE_API + 'projet/';
    public static PROJET_UNIQUE = ApiConfig.PROJET + ':id/';
    public static PROJET_EXISTS = ApiConfig.PROJET_UNIQUE + 'exists/';
    public static PROJET_COUNT = ApiConfig.PROJET + 'count/';

    public static DOSSIER_TECHNIQUE = ApiConfig.BASE_API + 'dossier-technique/';
    public static DOSSIER_TECHNIQUE_UNIQUE = ApiConfig.DOSSIER_TECHNIQUE + ':id/';
    public static DOSSIER_TECHNIQUE_EXISTS = ApiConfig.DOSSIER_TECHNIQUE_UNIQUE + 'exists/';
    public static DOSSIER_TECHNIQUE_COUNT = ApiConfig.DOSSIER_TECHNIQUE + 'count/';

    public static DEVIS = ApiConfig.BASE_API + 'devis/';
    public static DEVIS_UNIQUE = ApiConfig.DEVIS + ':id/';
    public static DEVIS_EXISTS = ApiConfig.DEVIS_UNIQUE + 'exists/';
    public static DEVIS_COUNT = ApiConfig.DEVIS + 'count/';

    public static LIGNE = ApiConfig.BASE_API + 'ligne/';
    public static LIGNE_UNIQUE = ApiConfig.LIGNE + ':id/';
    public static LIGNE_EXISTS = ApiConfig.LIGNE_UNIQUE + 'exists/';
    public static LIGNE_COUNT = ApiConfig.LIGNE + 'count/';

    public static UTILISATEUR = ApiConfig.BASE_API + 'utilisateur/';
    public static UTILISATEUR_UNIQUE = ApiConfig.UTILISATEUR + ':id/';
    public static UTILISATEUR_EXISTS = ApiConfig.UTILISATEUR_UNIQUE + 'exists/';
    public static UTILISATEUR_COUNT = ApiConfig.UTILISATEUR + 'count/';

    public static ROLE = ApiConfig.BASE_API + 'role/';
    public static ROLE_UNIQUE = ApiConfig.ROLE + ':id/';
    public static ROLE_EXISTS = ApiConfig.ROLE_UNIQUE + 'exists/';
    public static ROLE_COUNT = ApiConfig.ROLE + 'count/';

    public static PLAN = ApiConfig.BASE_API + 'plan/';
    public static PLAN_UNIQUE = ApiConfig.PLAN + ':id/';
    public static PLAN_EXISTS = ApiConfig.PLAN_UNIQUE + 'exists/';
    public static PLAN_COUNT = ApiConfig.PLAN + 'count/';

    public static MODELE = ApiConfig.BASE_API + 'modele/';
    public static MODELE_UNIQUE = ApiConfig.MODELE + ':id/';
    public static MODELE_EXISTS = ApiConfig.MODELE_UNIQUE + 'exists/';
    public static MODELE_COUNT = ApiConfig.MODELE + 'count/';

    public static PRODUIT = ApiConfig.BASE_API + 'produit/';
    public static PRODUIT_UNIQUE = ApiConfig.PRODUIT + ':id/';
    public static PRODUIT_EXISTS = ApiConfig.PRODUIT_UNIQUE + 'exists/';
    public static PRODUIT_COUNT = ApiConfig.PRODUIT + 'count/';

    public static CCTP = ApiConfig.BASE_API + 'cctp/';
    public static CCTP_UNIQUE = ApiConfig.CCTP + ':id/';
    public static CCTP_EXISTS = ApiConfig.CCTP_UNIQUE + 'exists/';
    public static CCTP_COUNT = ApiConfig.CCTP + 'count/';

    public static GAMME = ApiConfig.BASE_API + 'gamme/';
    public static GAMME_UNIQUE = ApiConfig.GAMME + ':id/';
    public static GAMME_EXISTS = ApiConfig.GAMME_UNIQUE + 'exists/';
    public static GAMME_COUNT = ApiConfig.GAMME + 'count/';

    public static FAMILLE_GAMME = ApiConfig.BASE_API + 'famille-gamme/';
    public static FAMILLE_GAMME_UNIQUE = ApiConfig.FAMILLE_GAMME + ':id/';
    public static FAMILLE_GAMME_EXISTS = ApiConfig.FAMILLE_GAMME_UNIQUE + 'exists/';
    public static FAMILLE_GAMME_COUNT = ApiConfig.FAMILLE_GAMME + 'count/';

    public static XMYSQL_VERSION = ApiConfig.BASE_URL + '_version/';
}
