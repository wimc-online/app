import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {Component, Props} from 'react';
import Keycloak from "keycloak-js";
import {useParams} from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import ApiCall from '../components/ApiCall';
import './Page.scss';


class Page extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {keycloak: null, authenticated: false, params: null};
    }

    componentDidMount() {
        const keycloak: Keycloak.KeycloakInstance = Keycloak();
        //TU SIE PSUJE edit: JUŻ TYLKO CZASAMI
        //check-sso
        //login-required
        keycloak.init({onLoad: 'check-sso', checkLoginIframe: false}).then(authenticated => {
            keycloak.authenticated = authenticated;
            //nie wiem czy to potrzebne jest
            // @ts-ignore
            sessionStorage.setItem('authentication', keycloak.token);
            // @ts-ignore
            sessionStorage.setItem('refreshToken', keycloak.refreshToken);
            const {match: {params}} = this.props;
            this.setState({keycloak: keycloak, authenticated: authenticated, params: params})

        }).catch(function () {
            console.log('failed to initialize');
        });
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        {/*<IonTitle>{params.name}</IonTitle>*/}
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            {/*<IonTitle size="large">{params.name}</IonTitle>*/}
                        </IonToolbar>
                    </IonHeader>
                    <h2>{this.state.authenticated ? 'authenticated' : 'not authenticated'}</h2>
                    <ExploreContainer name="testName"
                                      authenticated={this.state.authenticated}
                                      keycloak={this.state.keycloak}/>
                    <ApiCall/>
                </IonContent>
            </IonPage>
        )
    };
};

export default Page;

