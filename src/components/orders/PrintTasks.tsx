import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";


interface ContainerProps {
    tasks?: never[]
}

const PrintTasks: React.FC<ContainerProps> = ({tasks}) => {
    if (typeof tasks != "undefined") {
        return (
            <div>
                {tasks.map((task: any, i: number) => {
                    return (
                        <IonCard key={i}>
                             <IonCardHeader>
                                 <IonCardTitle>
                                     Task id: {task.id}
                                 </IonCardTitle>
                             </IonCardHeader>
                             <IonCardContent>
                                 Courier: {task.courier.id} <br/>
                                 Is processing?:
                                 {task.isProcessing
                                 ? <IonIcon slot="start" icon={checkmarkOutline}/>
                                 : <IonIcon icon={closeOutline}/>}
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

export default PrintTasks;
