import React from 'react';
import CourierCenter from "./couriers/CourierCenter";
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import TaskCenter from "./orders/TaskCenter";
import DeliveryCenter from "./deliveries/DeliveryCenter";
import {IonButton} from '@ionic/react';
import AddDelivery from "./deliveries/AddDelivery";


interface ContainerProps {
    keycloak: KeycloakInstance,
    page: string,
    crud?: string
}

function renderSwitch({page, crud}: { page: string, crud?: string }) {
    switch (page) {
        case 'Dashboard':
            return (
                <div>
                    Dashboard
                </div>
            );
        case 'Deliveries':
            if (crud === "add") {
                return (
                    <div>
                        <AddDelivery keycloak={keycloak} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <IonButton routerLink='/page/Deliveries/add'>Add</IonButton>
                        <DeliveryCenter keycloak={keycloak}/>
                    </div>
                );
            }
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

const CoordinatorComponents: React.FC<ContainerProps> = ({keycloak, page, crud}) => {
    if (page !== undefined) {
        return (
            <div>
                {renderSwitch({page: page, crud: crud})}
            </div>
        )
    }
    return (<div></div>);
};

export default CoordinatorComponents;
