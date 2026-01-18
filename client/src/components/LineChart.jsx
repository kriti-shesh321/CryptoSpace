import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import CryptoContext from "../context/cryptoCoinContext";
import Spinner from "./Spinner";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ coinId, timePeriod }) => {
    const { getPriceHistory } = useContext(CryptoContext);
    const [loading, setLoading] = useState(true);
    const [timeList, setTimeList] = useState([]);
    const [priceList, setPriceList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const data = await getPriceHistory(coinId, timePeriod);
                const price = data?.history.map((item) => item.price);
                const time = data?.history.map((item) => item.timestamp);
                setTimeList(time);
                setPriceList(price);
            } catch (error) {
                console.log(error);
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        };
        fetchPriceHistory();

    }, [coinId, timePeriod]);

    const chartData = {
        labels: timeList.map((timestamp) =>
            new Date(timestamp).toLocaleDateString()
        ),
        datasets: [
            {
                label: 'Price',
                data: priceList,
                borderColor: 'blue',
                backgroundColor: 'blue',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                },
                beginAtZero: false,
            },
        },
    };

    if (loading) return (
        <div className="mb-8">
            <div className="pl-[20%] py-32">
                <Spinner />
            </div>
        </div>
    );

    return <Line data={chartData} options={chartOptions} />;
};
export default LineChart;