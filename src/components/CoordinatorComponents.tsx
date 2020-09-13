import React from 'react';
import CourierCenter from "./couriers/CourierCenter";
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import TaskCenter from "./tasks/TaskCenter";
import DeliveryCenter from "./deliveries/DeliveryCenter";
import {IonButton, IonGrid, IonRow, IonCol, CreateAnimation} from '@ionic/react';
import AddDelivery from "./deliveries/AddDelivery";
import AssignCourierTutorialModal from "./tutorials/AssignCourierTutorialModal";
import AddCourierForm from "./couriers/AddCourierForm";
import CourierPositionsMap from "./locations/CourierPositionsMap";


interface ContainerProps {
    keycloak: KeycloakInstance,
    page: string,
    crud?: string
}

function renderSwitch({page, crud}: { page: string, crud?: string, keycloak?: KeycloakInstance }) {
    switch (page) {
        case 'Dashboard':
            return (
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <img src="/assets/logos/logo-wimc-gray.png" alt=""
                                 className="ion-margin-bottom ion-margin-top"/>
                            <CreateAnimation
                                duration={700}
                                iterations={1}
                                fromTo={[
                                    {property: 'transform', fromValue: 'translateX(100px)', toValue: 'translateX(0)'},
                                    {property: 'opacity', fromValue: '0', toValue: '1'}
                                ]}
                                play={true}
                            >
                                <h2>
                                    Oh... Hi{keycloak.profile !== undefined
                                    ? ' ' + keycloak.profile.firstName + '!'
                                    : '!'}
                                </h2>
                                <p>
                                    What are we doing today?
                                </p>
                            </CreateAnimation>
                        </IonCol>
                        <IonCol size="12" sizeXl="4">
                            <CreateAnimation
                                duration={700}
                                delay={1500}
                                iterations={1}
                                fromTo={[
                                    {property: 'transform', fromValue: 'translateX(100px)', toValue: 'translateX(0)'},
                                    {property: 'opacity', fromValue: '0', toValue: '1'}
                                ]}
                                play={true}
                            >
                                <IonButton routerLink='/page/Deliveries' expand="full">Show deliveries</IonButton>
                            </CreateAnimation>
                        </IonCol>
                        <IonCol size="12" sizeXl="4">
                            <CreateAnimation
                                duration={700}
                                delay={1700}
                                iterations={1}
                                fromTo={[
                                    {property: 'transform', fromValue: 'translateX(100px)', toValue: 'translateX(0)'},
                                    {property: 'opacity', fromValue: '0', toValue: '1'}
                                ]}
                                play={true}
                            >
                                <IonButton routerLink='/page/Orders' expand="full">Check orders</IonButton>
                            </CreateAnimation>
                        </IonCol>
                        <IonCol size="12" sizeXl="4">
                            <CreateAnimation
                                duration={700}
                                delay={1900}
                                iterations={1}
                                fromTo={[
                                    {property: 'transform', fromValue: 'translateX(100px)', toValue: 'translateX(0)'},
                                    {property: 'opacity', fromValue: '0', toValue: '1'}
                                ]}
                                play={true}
                            >
                                <IonButton routerLink='/page/Couriers' expand="full">Show couriers</IonButton>
                            </CreateAnimation>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        case 'Deliveries':
            if (crud === "add") {
                return (
                    <div>
                        <AddDelivery keycloak={keycloak}/>
                    </div>
                );
            } else {
                return (
                    <IonGrid>
                        <IonRow>
                            <AssignCourierTutorialModal/>
                            <IonCol size="12">
                                <IonButton routerLink='/page/Deliveries/add' expand="full">Add</IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <DeliveryCenter keycloak={keycloak}/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                );
            }
        case 'Orders':
            return (
                <div>
                    <TaskCenter keycloak={keycloak}/>
                </div>
            );
        case 'CouriersMap':
            return (
                <div>
                    <CourierPositionsMap keycloak={keycloak}/>
                </div>
            );
        case 'Couriers':
            if (crud === "add") {
                return (
                    <div>
                        <AddCourierForm keycloak={keycloak}/>
                    </div>
                );
            } else {
                return (
                    <div>
                        <CourierCenter keycloak={keycloak}/>
                    </div>
                );
            }
        default:
            return 'default';
    }
}

const CoordinatorComponents: React.FC<ContainerProps> = ({keycloak, page, crud}) => {
    if (page !== undefined) {
        return (
            <div>
                {renderSwitch({page: page, crud: crud, keycloak: keycloak})}
            </div>
        )
    }
    return (<div></div>);
};

export default CoordinatorComponents;
