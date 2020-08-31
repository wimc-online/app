import React, {useEffect, useState} from 'react';
import {IonButton, IonCol, IonGrid, IonIcon, IonModal, IonRow} from "@ionic/react";
import {
    carOutline
} from 'ionicons/icons';

const AddDeliveryTutorialModal: React.FC = () => {
    const [initModal, setInitModal] = useState<boolean>(false);
    const [dismissed, setDismissed] = useState<boolean>(false);
    const ls = require('local-storage');

    useEffect(() => {
        if (!initModal && !dismissed && (ls.get('AddDeliveryTutorialModalDismissed') === null || ls.get('AddDeliveryTutorialModalDismissed') === false)) {
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
                                Welcome to the delivery add page!
                            </h2>
                        </IonCol>
                        <IonCol size="12">
                            <h4>
                                To add new delivery simply type adress in search window on the right top of the screen.
                            </h4>
                            <h4>
                                Then click 'confirm address'.
                            </h4>
                            <h4>
                                That'a all for now!
                            </h4>
                        </IonCol>
                        <IonCol size="12">
                            <IonIcon md={carOutline} className="icon-big"/>
                        </IonCol>
                        <IonCol size="12" class="ion-align-self-end">
                            <IonButton onClick={() => {
                                ls.set('AddDeliveryTutorialModalDismissed', true);
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

export default AddDeliveryTutorialModal;
