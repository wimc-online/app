import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow
} from '@ionic/react';
import React from 'react';
import LoginForm from '../../components/LoginForm';
import './LoginPage.scss';

const LoginPage: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="ion-align-self-center">
                            <LoginForm />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;