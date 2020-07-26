import React from 'react';
import Geolocation from "./Geolocation";
import ApiCall from "./ApiCall";
import keycloak from "../keycloak";
import GetTasks from "./orders/GetTasks";
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
                    <Geolocation />
                </div>
            );
        case 'Orders':
            return (
                <div>
                    <GetTasks keycloak={keycloak}/>
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
