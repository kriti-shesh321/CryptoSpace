import { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';
import { TRACKED_COINS } from '../utils/constants';
import { CreatableAlertOperator } from '../types/alert.types';
import Spinner from '../components/Spinner';

type TrackedCoin = typeof TRACKED_COINS[number];

const AlertPage = () => {
    const {
        alerts,
        isLoading,
        error,
        createAlert,
        isCreating,
        createError,
        updateAlert,
        deleteAlert,
    } = useAlerts();

    const [coinId, setCoinId] = useState<TrackedCoin>(TRACKED_COINS[0]);
    const [operator, setOperator] = useState<CreatableAlertOperator>('>');
    const [value, setValue] = useState('');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedValue = Number(value);
        if (!parsedValue || parsedValue <= 0) return;

        createAlert({
            coinId,
            type: 'price_threshold',
            operator,
            value: parsedValue,
        });
        setValue('');
    };

    if (isLoading) return (
        <div className="mb-8">
            <div className="pl-[20%] py-20">
                <Spinner loading={isLoading} />
            </div>
        </div>
    );

    if (error) return (
        <p className="text-red-500 text-center mt-10">Failed to load alerts.</p>
    );

    return (
        <section>
            <h1 className="heading">Price Alerts</h1>

            <form className="flex flex-wrap gap-3 items-center mt-5" onSubmit={handleCreate}>
                <select
                    className="border rounded py-2 px-3"
                    value={coinId}
                    onChange={(e) => setCoinId(e.target.value as TrackedCoin)}
                >
                    {TRACKED_COINS.map((coin) => (
                        <option key={coin} value={coin}>{coin}</option>
                    ))}
                </select>

                <select
                    className="border rounded py-2 px-3"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value as CreatableAlertOperator)}
                >
                    <option value=">">Price above</option>
                    <option value="<">Price below</option>
                </select>

                <input
                    className="border rounded py-2 px-3 w-32"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="USD value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />

                <button
                    className="bg-indigo-700 hover:bg-indigo-900 text-white rounded-md py-2 px-4"
                    type="submit"
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Alert'}
                </button>
            </form>

            {createError && (
                <p className="text-red-500 text-sm mt-2">Could not create alert.</p>
            )}

            <div className="grid md:grid-cols-2 gap-3 mt-8">
                {alerts.length === 0 && (
                    <p className="text-gray-500">You have no alerts yet.</p>
                )}

                {alerts.map((alert) => (
                    <div className="stat-box flex justify-between items-center" key={alert.id}>
                        <div>
                            <h3 className="md:text-md text-sm font-medium capitalize">
                                {alert.coinId} {alert.operator} ${alert.value}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {alert.isActive ? 'Active' : 'Paused'} · cooldown {alert.cooldownSeconds}s
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="text-indigo-600 hover:underline text-sm"
                                onClick={() => updateAlert({ id: alert.id, data: { isActive: !alert.isActive } })}
                            >
                                {alert.isActive ? 'Pause' : 'Resume'}
                            </button>
                            <button
                                className="text-red-500 hover:underline text-sm"
                                onClick={() => deleteAlert(alert.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AlertPage;
