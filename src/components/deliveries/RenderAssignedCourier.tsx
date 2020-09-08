import React, {useState} from "react";
import {getUserDetailedData} from "../../helpers/KeycloakHelper";
import {
    IonCardSubtitle,
} from '@ionic/react';


const RenderAssignedCourier: React.FC<{ courierId: any, deliveryId: string }> = ({courierId, deliveryId}) => {
    const [courierName, setCourierName] = useState<string>("");

    getUserDetailedData(courierId)
        .then(data => {
                setCourierName(data.firstName + " " + data.lastName);
            }
        );
    return (
        <>
            <IonCardSubtitle>Currently assigned courier: <strong>{courierName}</strong></IonCardSubtitle>
        </>
    )
}
export default RenderAssignedCourier