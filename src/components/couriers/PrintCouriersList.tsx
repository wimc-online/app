import React, {useEffect, useState} from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonList,
    IonItem, IonLabel, IonListHeader
} from "@ionic/react";
import {getUserDetailedData} from "../../helpers/KeycloakHelper";

interface ContainerProps {
    couriers: []
}

const PrintCouriersList: React.FC<ContainerProps> = ({couriers}) => {
    const [couriersData, setCouriersData] = useState<any>([]);
    const [couriersInitialized, setCouriersInitialized] = useState<boolean>(false);

    interface Courier {
        firstName: string,
        lastName: string,
        id: string
    }

    useEffect(() => {
        {
            if (couriersData.length !== couriers.length) {
                const promiseArray = couriers.map((courier: any, i: number) => {
                    return getUserDetailedData(courier.id).then(result => {
                        return result
                    });
                })
                Promise.all(promiseArray).then(function (data) {
                    setCouriersData(data);
                    setCouriersInitialized(true);
                })
            }
        }
    }, [couriersData]);

    const CourierDetailedData: React.FC<{ courier: Courier }> = ({courier}) => {
        return (
            <div>
                <h2>
                    {courier.firstName + ' ' + courier.lastName}
                </h2>
            </div>
        )
    }

    if (couriersInitialized) {
        return (
            <>
                {couriers.map((courier: any, i: number) => {
                    return (
                        <IonItem key={i}>
                            <IonLabel>
                                {couriersData !== undefined && couriersData.filter((e: any) => e.id === courier.id)[0] !== undefined
                                    ?
                                    <>
                                        <CourierDetailedData
                                            courier={couriersData.filter((e: any) => e.id === courier.id)[0]}/>
                                    </>

                                    : <></>
                                }
                                <p>{courier.id}</p>
                                {courier.lastPosition !== false
                                    ?
                                    <>
                                        <p>Last known
                                            location: {courier.lastPosition.lat} {courier.lastPosition.lng}</p>
                                        <p>At: {courier.lastPosition.tmstp}</p>
                                    </>
                                    : <p>No location data.</p>
                                }
                            </IonLabel>
                        </IonItem>
                    )
                })}
            </>
        )
    } else {
        return (<></>);
    }
};

export default PrintCouriersList;
