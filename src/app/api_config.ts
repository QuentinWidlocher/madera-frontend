export class ApiConfig {
    // public static BASE_URL          = 'http://lazard.sytes.net:3000/';
    // public static BASE_URL          = 'http://192.168.255.105:3000/';
    public static BASE_URL          = 'http://192.168.42.206:3000/';
    // public static BASE_URL          = 'http://127.0.0.1:3000/';
    public static BASE_API          = ApiConfig.BASE_URL + 'api/';

    public static CONTACT           = ApiConfig.BASE_API + 'contacts/';
    public static CONTACT_UNIQUE    = ApiConfig.CONTACT + ':id/';
    public static CONTACT_EXISTS    = ApiConfig.CONTACT_UNIQUE + 'exists/';
    public static CONTACT_COUNT     = ApiConfig.CONTACT + 'count/';

    public static XMYSQL_VERSION    = ApiConfig.BASE_URL + '_version/';
}
