import React from 'react';
import './ExploreContainer.scss';
import {KeycloakInstance} from "keycloak-js";

interface ContainerProps {
    name: string;
    authenticated: boolean;
    keycloak: KeycloakInstance;
}

const ExploreContainer: React.FC<ContainerProps> = ({name, authenticated, keycloak}) => {
    return (
        <div className="container">
            <div>
                {`User is ${!authenticated ? 'NOT ' : ''}authenticated`}
            </div>
            {authenticated
                ? <button type="button" onClick={() => keycloak.logout()}>Logout</button>
                : <button type="button" onClick={() => keycloak.login()}>Login</button>}

            <strong>{name}</strong>
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI
                Components</a></p>
        </div>
    );
};

export default ExploreContainer;
