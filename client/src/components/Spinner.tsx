import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

interface SpinnerProps {
    loading: boolean;
}

const override: React.CSSProperties = {
    display: 'block'
};

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
    return (
        <PropagateLoader
            color="green"
            loading={loading}
            cssOverride={override}
            size={20}
            speedMultiplier={0.5}
        />
    );
};

export default Spinner;