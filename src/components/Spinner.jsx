import React from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

const override = {
    display: 'block',
    margin: '25% 30%',
    speedMultiplier: 2,
}

const Spinner = ({ loading }) => {
    return (
        <RiseLoader
            color='green'
            loading={loading}
            cssOverride={override}
            size={30}
        />
    )
}

export default Spinner;