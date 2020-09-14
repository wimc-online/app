import React from 'react';
import Geolocation from "./Geolocation";
import TaskApprovalPopup from "./tasks/TaskApprovalPopup";
import keycloak from "../keycloak";
import LocationWatch from "./locations/LocationWatch";
import PrintTasks from "./tasks/PrintTasks";
import {IonCol, IonGrid, IonRow} from "@ionic/react";

interface ContainerProps {
    page: string
}

function renderSwitch({page}: { page: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    <TaskApprovalPopup keycloak={keycloak}/>
                    <Geolocation keycloak={keycloak}/>
                </div>
            );
        case 'Orders':
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <PrintTasks keycloak={keycloak} active={true} key={1}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        case 'History':
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <PrintTasks keycloak={keycloak} active={false} key={2}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
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
