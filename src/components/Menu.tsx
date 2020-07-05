import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
    bookmarkOutline,
    heartOutline,
    heartSharp,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp
} from 'ionicons/icons';
import './Menu.scss';
import {useKeycloak} from "@react-keycloak/web";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Inbox',
        url: '/page/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Outbox',
        url: '/page/Outbox',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Login',
        url: '/auth/LoginPage',
        iosIcon: heartOutline,
        mdIcon: heartSharp
    }
];


const Menu: React.FC = () => {
    const location = useLocation();
    const [keycloak, initialized] = useKeycloak();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();

    useEffect(() => {
        if (initialized) {
            keycloak.loadUserProfile().then(result => {
                setEmail(result.email);
                setName(result.username);
            })
        }
    });

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>{name}</IonListHeader>
                    <IonNote>{email}</IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                                         routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonList id="account-list">
                    <IonListHeader>Account</IonListHeader>
                    <IonItem lines="none" key={1} onClick={() => {
                        keycloak.logout()
                    }}>
                        <IonIcon slot="start" icon={bookmarkOutline}/>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
