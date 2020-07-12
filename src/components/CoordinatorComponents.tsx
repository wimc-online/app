import React from 'react';
import ApiCall from "./ApiCall";
import {KeycloakInstance} from "keycloak-js";


interface ContainerProps {
    keycloak: KeycloakInstance;
}

const CoordinatorComponents: React.FC<ContainerProps> = ({keycloak}) => {
    return (
        <div>
            <ApiCall keycloak={keycloak}/>
        </div>
    )
};

export default CoordinatorComponents;
