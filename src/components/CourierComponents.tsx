import React from 'react';
import Geolocation from "./Geolocation";
import TaskApprovalPopup from "./orders/TaskApprovalPopup";
import CourierCenter from "./couriers/CourierCenter";
import keycloak from "../keycloak";
import AddTask from "./orders/AddTask";
import {KeycloakInstance} from "keycloak-js";

interface ContainerProps {
    page: string
}

function renderSwitch({page}: { page: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    <TaskApprovalPopup keycloak={keycloak}/>
                    <Geolocation />
                </div>
            );
        case 'Orders':
            return (
                <div>
                    {/*<GetTasks keycloak={keycloak}/>*/}
                </div>
            );
        default:
            return 'default';
    }
}

const CourierComponents: React.FC<ContainerProps> = ({page}) => {
    return (
        <div>
            {renderSwitch({page: page})}
        </div>
    )
};

export default CourierComponents;
