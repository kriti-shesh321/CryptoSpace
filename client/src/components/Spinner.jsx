import PropagateLoader from 'react-spinners/PropagateLoader';

const override = {
    display: 'block',
    speedMultiplier: 0.5
}

const Spinner = ({ loading }) => {
    return (
        <PropagateLoader
            color='green'
            loading={loading}
            cssOverride={override}
            size={20}
        />
    )
}

export default Spinner;