import React, {Component} from 'react';

interface ApiCallProps {
    isLogged?: boolean;
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
            headers: {'Content-Type': 'application/json'},
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
        fetch('https://api.wimc.localhost/couriers', {method: 'GET'})
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
