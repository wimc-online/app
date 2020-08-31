import React, {useEffect, useState} from 'react';
import {IonButton, IonCol, IonGrid, IonIcon, IonLoading, IonModal, IonRow} from "@ionic/react";
import {
    airplaneOutline
} from 'ionicons/icons';

const AssignCourierTutorialModal: React.FC = () => {
    const [initModal, setInitModal] = useState<boolean>(false);
    const [dismissed, setDismissed] = useState<boolean>(false);
    const ls = require('local-storage');

    useEffect(() => {
        if (!initModal && !dismissed && (ls.get('AssignCourierTutorialModalDismissed') === null || ls.get('AssignCourierTutorialModalDismissed') === false)) {
            setInitModal(true);
        }
        return () => {

        }
    }, [initModal]);

    const InitModal = () => {
        return (
            <IonModal isOpen={initModal} cssClass='my-custom-class'>
                <IonGrid>
                    <IonRow className="ion-text-center">
                        <IonCol size="12" class="ion-align-self-start">
                            <h2 className="ion-padding-end">
                                Welcome to the delivery showcase page!
                            </h2>
                        </IonCol>
                        <IonCol size="12">
                            <h4>
                                You can browse through current and open deliveries here.
                            </h4>
                            <h4>
                                Also this is the place where you assign couriers to open deliveries.
                            </h4>
                            <h4>
                                Pick the one you want assign and select available courier from dropdown list.
                            </h4>
                            <h4>
                                That'a all for now!
                            </h4>
                        </IonCol>
                        <IonCol size="12">
                            <IonIcon md={airplaneOutline} className="icon-big"/>
                        </IonCol>
                        <IonCol size="12" class="ion-align-self-end">
                            <IonButton onClick={() => {
                                ls.set('AssignCourierTutorialModalDismissed', true);
                                setInitModal(false);
                                setDismissed(true);
                            }} expand="full">All clear!</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonModal>
        )
    }
    return (
        <div>
            {initModal ? <InitModal/> : <></>}
        </div>
    )
};

export default AssignCourierTutorialModal;
