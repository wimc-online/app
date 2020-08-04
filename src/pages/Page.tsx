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
import ExploreContainer from '../components/ExploreContainer';
import './Page.scss';
import {useKeycloak} from "@react-keycloak/web";
import {KeycloakProfile} from "keycloak-js";
import CourierComponents from '../components/CourierComponents';
import Clock from '../components/Clock';
import CoordinatorComponents from '../components/CoordinatorComponents';

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();

    const [keycloak, initialized] = useKeycloak();
    const [profileLoaded, setProfileLoaded] = useState(0);
    const [profile, setProfile] = useState<KeycloakProfile>();

    useEffect(() => {
        if (initialized && profileLoaded === 0) {
            setProfileLoaded(1);
            keycloak.loadUserProfile().then(result => {
                setProfile(result);
                // @ts-ignore
                // console.log(result["attributes"]["courierId"]);
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
                    <ExploreContainer name={profile.username}/>
                    {keycloak.hasRealmRole('courier')
                        ? <CourierComponents page={name}/>
                        : <CoordinatorComponents keycloak={keycloak} page={name}/>}
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

