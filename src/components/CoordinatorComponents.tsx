import React from 'react';
import CourierCenter from "./couriers/CourierCenter";
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import TaskCenter from "./orders/TaskCenter";


interface ContainerProps {
    keycloak: KeycloakInstance,
    page: string
}

function renderSwitch({page}: { page: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    Dashboard
                </div>
            );
        case 'Orders':
            return (
                <div>
                    <TaskCenter keycloak={keycloak}/>
                </div>
            );
        case 'Couriers':
            return (
                <div>
                    <CourierCenter keycloak={keycloak}/>
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
