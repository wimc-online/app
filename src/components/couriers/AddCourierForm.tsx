import React, {useState} from "react";
import {KeycloakInstance} from "keycloak-js";
import {addCourier} from "../../helpers/CourierHelper";
import {
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonRouterOutlet,
    IonContent,
    IonRow,
    IonCol,
    IonGrid
} from "@ionic/react";
import {Redirect} from "react-router";
import {IonReactRouter} from "@ionic/react-router";
import {useHistory} from "react-router";

const AddCourierForm: React.FC<{ keycloak: KeycloakInstance }> = ({keycloak}) => {
    const abortController = new AbortController();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const history = useHistory();

    // @ts-ignore
    const newCourierSubmit = (evt) => {
        evt.preventDefault();
        addCourier(keycloak, abortController.signal, {
            email: email,
            firstName: firstName,
            lastName: lastName
        }).then(response => {
            history.push('/page/Couriers');
        });
    };

    return (
        <IonGrid>
            <IonRow>
                <IonCol size={"12"}>
                    <form onSubmit={newCourierSubmit}>
                        <IonItem>
                            <IonLabel>
                                First Name
                            </IonLabel>
                            <IonInput value={firstName} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                Last Name
                            </IonLabel>
                            <IonInput value={lastName} onIonChange={e => setLastName(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                Email
                            </IonLabel>
                            <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonButton expand="full" type="submit">Add Courier</IonButton>
                    </form>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default AddCourierForm;