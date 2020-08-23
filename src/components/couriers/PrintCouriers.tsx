import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonCardSubtitle} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";


interface ContainerProps {
    couriers?: never[]
}

const PrintCouriers: React.FC<ContainerProps> = ({couriers}) => {
    if (typeof couriers != "undefined" && couriers.length > 0) {
        return (
            <div>
                {couriers.map((courier: any, i: number) => {
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardSubtitle>{courier.type}</IonCardSubtitle>
                                <IonCardTitle>{courier.id}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Courier tasks:
                                <ul>
                                    {courier.tasks != "undefined" && courier.tasks > 0 
                                        ? courier.tasks.map((taskId: any, j: number) => {
                                              return (
                                                  <li key={j}>
                                                      {taskId}
                                                  </li>
                                              )
                                          })
                                        : <></>
                                    }
                                </ul>
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

export default PrintCouriers;
