import React, {useState} from "react";
import {KeycloakInstance} from "keycloak-js";
import {addCourier} from "../../helpers/CourierHelper";
import {IonButton, IonItem, IonLabel, IonInput, IonRouterOutlet} from "@ionic/react";
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
    const subtaskSubmit = (evt) => {
        evt.preventDefault();
        addCourier(keycloak, abortController.signal, {
            email: email,
            firstName: firstName,
            lastName: lastName
        }).then(response => {
            console.log(response);
        });
        history.go(0);
    };

    return (
        <div>
            <form onSubmit={subtaskSubmit}>
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
        </div>
    )
}

export default AddCourierForm;