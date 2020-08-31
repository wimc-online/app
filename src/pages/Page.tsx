import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLoading
} from '@ionic/react';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import './Page.scss';
import {useKeycloak} from "@react-keycloak/web";
import {KeycloakProfile} from "keycloak-js";
import CourierComponents from '../components/CourierComponents';
import Clock from '../components/Clock';
import CoordinatorComponents from '../components/CoordinatorComponents';

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();
    const {crud} = useParams<{ crud?: string; }>();

    const [keycloak, initialized] = useKeycloak();
    const [profileLoaded, setProfileLoaded] = useState(0);
    const [profile, setProfile] = useState<KeycloakProfile>();


    useEffect(() => {
        if (initialized && profileLoaded === 0) {
            setProfileLoaded(1);
            keycloak.loadUserProfile().then(result => {
                setProfile(result);
            });
        }
    });

    if (initialized && profileLoaded === 1 && typeof profile != "undefined") {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>
                            {name} <Clock/>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {keycloak.hasRealmRole('courier')
                        ? <CourierComponents page={name}/>
                        : <CoordinatorComponents keycloak={keycloak} page={name} crud={crud}/>}
                </IonContent>
            </IonPage>
        );
    } else {
        return (
            <IonLoading
                cssClass='my-custom-class'
                isOpen={true}
                message={'Please wait...'}
                duration={5000}
            />
        );
    }
};

export default Page;

