import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonButton
} from '@ionic/react';
import React from 'react';
import LoginForm from '../../components/LoginForm';
import './LoginPage.scss';
import {Link} from "react-router-dom";

const LoginPage: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-align-self-center">
                            {/*<LoginForm/>*/}
                            <div className="loginForm ion-text-center">
                                <img src="/assets/logos/logo-wimc-gray.png" alt=""/>
                            </div>
                            <div className="divider"></div>
                            <Link to="/page/Dashboard">
                                <IonButton expand="block" no-lines>Go to panel</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;