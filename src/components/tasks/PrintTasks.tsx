import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonAlert} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";


interface ContainerProps {
    tasks?: never[]
}

const PrintTasks: React.FC<ContainerProps> = ({tasks}) => {
    if (typeof tasks != "undefined" && tasks.length > 0) {
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
        return (
            <IonAlert
                isOpen={true}
                cssClass='my-custom-class'
                header={'There\'s nothing yet :('}
                message={'There are no active tasks at this moment'}
                buttons={['Copy that']}
            />
        );
    }
};

export default PrintTasks;
