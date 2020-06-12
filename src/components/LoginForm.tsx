import React, {useState} from 'react';
import './LoginForm.scss';
import {IonButton, IonInput, IonItem, IonLabel} from "@ionic/react";


interface ContainerProps {
}

const LoginForm: React.FC<ContainerProps> = () => {
    return (
        <div className="loginForm ion-text-center">
            <img src="/assets/logos/logo-wimc-gray.png" alt=""/>
            <h2>LOGIN FORM HERE</h2>
            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI
                Components</a></p>

        </div>
    )
};

export default LoginForm;
