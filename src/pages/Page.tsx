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


    useEffect(() => {
        if (initialized && profileLoaded === 0) {
            setProfileLoaded(1);
            keycloak.loadUserProfile().then(result => {
                setProfile(result);
            })
        }
    });

    if (!initialized && profileLoaded === 0 && typeof profile === 'undefined') {
        return (<div>bdbam</div>);
    } else {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{name} {profile && profile.username}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <ExploreContainer name={profile && profile.username} />
                </IonContent>
            </IonPage>
        );
    }
};

export default Page;

