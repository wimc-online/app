import React from 'react';
import ApiCall from "./ApiCall";
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import AddTask from "./orders/AddTask";
import GetTasks from "./orders/GetTasks";


interface ContainerProps {
    keycloak: KeycloakInstance,
    page: string
}

function renderSwitch({page}: { page: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    <ApiCall keycloak={keycloak} />
                </div>
            );
        case 'Orders':
            return (
                <div>
                    <GetTasks keycloak={keycloak}/>
                    <AddTask keycloak={keycloak} />
                </div>
            );
        default:
            return 'default';
    }
}

const CoordinatorComponents: React.FC<ContainerProps> = ({keycloak, page}) => {
    return (
        <div>
            {renderSwitch({page: page})}
        </div>
    )
};

export default CoordinatorComponents;
