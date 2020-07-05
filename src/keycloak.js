import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://auth.wimc.online/auth',
    realm: 'wimc localhost',
    clientId: 'wimclocalhost'
};
const keycloak = new Keycloak(keycloakConfig);
export default keycloak