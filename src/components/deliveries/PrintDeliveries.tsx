import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";


interface ContainerProps {
    deliveries?: never[]
}

const PrintDeliveries: React.FC<ContainerProps> = ({deliveries}) => {
    if (typeof deliveries != "undefined") {
        return (
            <div>
                {deliveries.map((delivery: any, i: number) => {
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Task id: {delivery.id}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Address: {delivery.address} <br/>
                            </IonCardContent>
                        </IonCard>
                    )
                })}
            </div>
        )
    } else {
        return (<></>);
    }
};

export default PrintDeliveries;
