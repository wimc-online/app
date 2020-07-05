import React from 'react';
import './ExploreContainer.scss';

interface ContainerProps {
    name?: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({name}) => {
    return (
        <div className="container">
            <div>
                Hello {name}
            </div>

            <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI
                Components</a></p>
        </div>
    );
};

export default ExploreContainer;
