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
    paperPlaneSharp,
    cubeOutline,
    folderOpenOutline,
    logOutOutline,
    carOutline
} from 'ionicons/icons';
import './Menu.scss';
import {useKeycloak} from "@react-keycloak/web";
import keycloak from "../keycloak";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Dashboard',
        url: '/page/Dashboard',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    }
];

const courierPages: AppPage[] = [
    {
        title: 'Orders',
        url: '/page/Orders',
        iosIcon: cubeOutline,
        mdIcon: cubeOutline
    },
    {
        title: 'History',
        url: '/page/History',
        iosIcon: folderOpenOutline,
        mdIcon: folderOpenOutline
    }
];

const coordinatorPages: AppPage[] = [
    {
        title: 'Orders',
        url: '/page/Orders',
        iosIcon: cubeOutline,
        mdIcon: cubeOutline
    },
    {
        title: 'Couriers',
        url: '/page/Couriers',
        iosIcon: carOutline,
        mdIcon: carOutline
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

    const RenderMenuByRole = ({}) => {
        if (keycloak.hasRealmRole('courier')) {
            return (
                <div>
                    {courierPages.map((appPage, index) => {
                        index = index + appPages.length;
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
                </div>
            );
        } else if (keycloak.hasRealmRole('coordinator')) {
            return (
                <div>
                    {coordinatorPages.map((appPage, index) => {
                        index = index + appPages.length;
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
                </div>
            );
        }
        return (<div></div>);
    };
    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>username: {name}</IonListHeader>
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
                    <RenderMenuByRole/>
                </IonList>

                <IonList id="account-list">
                    <IonListHeader>Account</IonListHeader>
                    <IonItem lines="none" key={1} onClick={() => {
                        keycloak.logout({redirectUri: window.location.origin})
                    }}>
                        <IonIcon slot="start" icon={logOutOutline}/>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
