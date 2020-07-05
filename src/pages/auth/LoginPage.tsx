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
                            <LoginForm/>
                            <Link to="/page/Inbox">
                                <IonButton expand="full">Go to panel</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;