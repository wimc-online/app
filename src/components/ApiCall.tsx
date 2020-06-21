import React, {Component} from 'react';

class ApiCall extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        fetch('https://api.wimc.localhost/couriers')
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
        })
    };

    render() {
        return (
            <div className="test">
                test
            </div>
        )
    };
}

export default ApiCall;
