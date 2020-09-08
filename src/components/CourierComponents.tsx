import React from 'react';
import Geolocation from "./Geolocation";
import TaskApprovalPopup from "./tasks/TaskApprovalPopup";
import keycloak from "../keycloak";
import LocationWatch from "./locations/LocationWatch";

interface ContainerProps {
    page: string
}

function renderSwitch({page}: { page: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    <TaskApprovalPopup keycloak={keycloak}/>
                    <Geolocation keycloak={keycloak} />
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
            <LocationWatch keycloak={keycloak}/>
            {renderSwitch({page: page})}
        </div>
    )
};

export default CourierComponents;
