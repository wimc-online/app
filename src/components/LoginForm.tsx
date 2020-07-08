import React, {useState} from 'react';
import './LoginForm.scss';
import {IonButton, IonInput, IonItem, IonLabel} from "@ionic/react";


interface ContainerProps {
}

const LoginForm: React.FC<ContainerProps> = () => {
    return (
        <div className="loginForm ion-text-center">
            <img src="/assets/logos/logo-wimc-gray.png" alt=""/>
        </div>
    )
};

export default LoginForm;
