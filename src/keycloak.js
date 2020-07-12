import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://auth.wimc.online/auth',
    realm: 'wimc.localhost',
    clientId: 'app.wimc.localhost'
};
const keycloak = new Keycloak(keycloakConfig);
export default keycloak