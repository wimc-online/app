import Menu from './components/Menu';
import Page from './pages/Page';
import LoginPage from './pages/auth/LoginPage';
import React, {useEffect} from 'react';
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Route} from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import './theme/global.scss';

import {KeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak"

const App: React.FC = () => {
    return (
        <KeycloakProvider keycloak={keycloak} initConfig={{onLoad: 'login-required', checkLoginIframe: false}}>
            <IonApp>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu/>
                        <IonRouterOutlet id="main">
                            <Route path="/page/:name" component={Page}/>
                            <Route path="/" component={LoginPage}/>
                            {/*<Redirect from="/" to="/page/Inbox"/>*/}
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </IonApp>
        </KeycloakProvider>
    );
};

export default App;
