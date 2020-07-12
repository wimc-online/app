import React, {Component} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";

interface ApiCallProps {
    keycloak: KeycloakInstance;
}


class ApiCall extends Component<ApiCallProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            existingCouriersCount: 0,
            couriers: []
        };
        this.getCouriers = this.getCouriers.bind(this);
        this.addCourier = this.addCourier.bind(this);
    };

    addCourier() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + keycloak.token
            },
            body: JSON.stringify({})
        };
        fetch('https://api.wimc.localhost/couriers', requestOptions)
            .then(results => {
                return results.json();
            }).then((data) => {
            this.getCouriers();
        });
    }

    getCouriers() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + keycloak.token,
            }
        };
        fetch('https://api.wimc.localhost/couriers', requestOptions)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({existingCouriersCount: data['hydra:totalItems'], couriers: data['hydra:member']});
        })
    }

    componentDidMount() {
        this.getCouriers();
    };

    render() {
        return (
            <div>
                <ul>
                {this.state.couriers.map((courier:any, i:number) => {
                    return (<li key={i}>{courier.id}</li>)
                })}
                </ul>
                <button type="button" onClick={this.addCourier}>
                    Add Courier
                </button>
            </div>
        )
    };
}

export default ApiCall;
