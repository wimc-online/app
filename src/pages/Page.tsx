import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.scss';
import {useKeycloak} from "@react-keycloak/web";
import {KeycloakProfile} from "keycloak-js";

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();

    const [keycloak, initialized] = useKeycloak();
    const [profileLoaded, setProfileLoaded] = useState(0);
    const [profile, setProfile] = useState<KeycloakProfile>();
    const [time, setTime] = useState<string>();


    useEffect(() => {
        if (initialized && profileLoaded === 0) {
            setProfileLoaded(1);
            keycloak.loadUserProfile().then(result => {
                setProfile(result);
            });
        }
        const interval = setInterval(() => {
            let date = new Date;
            setTime(date.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval)
    });

    if (initialized && profileLoaded === 1 && typeof profile != "undefined") {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/> {name}
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large" className="ion-text-center">{time}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <ExploreContainer name={profile.username}/>
                </IonContent>
            </IonPage>
        );
    } else {
        return <span>Loading...</span>
    }
};

export default Page;

