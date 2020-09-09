import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle} from "@ionic/react";
import {getUserDetailedData} from "../../helpers/KeycloakHelper";

interface ContainerProps {
    couriers: []
}

const PrintCouriers: React.FC<ContainerProps> = ({couriers}) => {
    const [couriersData, setCouriersData] = useState<any>({});
    const [couriersInitialized, setCouriersInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (!couriersInitialized) {
            {
                couriers.map((courier: any, i: number) => {
                    getUserDetailedData(courier.id).then(result => {
                        setCouriersData({[`${courier.id}`]: result});
                    });
                })
                setCouriersInitialized(true);
            }
        }
    }, [couriersInitialized]);

    const CourierDetailedData: React.FC<{ courierId: string }> = ({courierId}) => {
        return (
            <>
                <IonCardTitle>
                    {couriersData[courierId].firstName + ' ' + couriersData[courierId].lastName}
                </IonCardTitle>
            </>
        )
    }

    if (couriersInitialized) {
        return (
            <div>
                {couriers.map((courier: any, i: number) => {
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardSubtitle>{courier.type}</IonCardSubtitle>
                                {couriersData !== undefined && couriersData[courier.id] !== undefined
                                    ? <CourierDetailedData courierId={courier.id}/>
                                    : <></>
                                }
                                <IonCardSubtitle>{courier.id}</IonCardSubtitle>
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
