import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://auth.wimc.online/auth',
    realm: 'wimc.localhost',
    clientId: (process.env.NODE_ENV === "development" ? "app.wimc.localhost" : "app.wimc.online")
};
const keycloak = new Keycloak(keycloakConfig);
export default keycloak