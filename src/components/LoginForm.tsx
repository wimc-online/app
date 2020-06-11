import React from 'react';
import './LoginForm.scss';
import {IonButton} from "@ionic/react";

interface ContainerProps {
}

const LoginForm: React.FC<ContainerProps> = () => {
    return (
        <div className="loginForm ion-text-center">
            <h2>LOGIN FORM HERE</h2>
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI
                Components</a></p>
            <IonButton>LOGIN</IonButton>
        </div>
    )
};

export default LoginForm;
