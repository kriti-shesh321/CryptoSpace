import { useState } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import { TRACKED_COINS } from '../utils/constants';

type TrackedCoin = typeof TRACKED_COINS[number];
import Spinner from '../components/Spinner';

const Watchlist = () => {
    const {
        watchlist,
        isLoading,
        error,
        addCoin,
        isAdding,
        addError,
        removeCoin,
    } = useWatchlist();

    const availableCoins = TRACKED_COINS.filter(
        (coinId) => !watchlist.some((item) => item.coinId === coinId)
    );

    const [selectedCoin, setSelectedCoin] = useState<TrackedCoin | ''>(availableCoins[0] ?? '');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCoin) return;
        addCoin({ coinId: selectedCoin });
    };

    if (isLoading) return (
        <div className="mb-8">
            <div className="pl-[20%] py-20">
                <Spinner loading={isLoading} />
            </div>
        </div>
    );

    if (error) return (
        <p className="text-red-500 text-center mt-10">Failed to load watchlist.</p>
    );

    return (
        <section>
            <h1 className="heading">Watchlist</h1>

            {availableCoins.length > 0 && (
                <form className="flex gap-3 items-center mt-5" onSubmit={handleAdd}>
                    <select
                        className="border rounded py-2 px-3"
                        value={selectedCoin}
                        onChange={(e) => setSelectedCoin(e.target.value as TrackedCoin)}
                    >
                        {availableCoins.map((coinId) => (
                            <option key={coinId} value={coinId}>{coinId}</option>
                        ))}
                    </select>
                    <button
                        className="bg-indigo-700 hover:bg-indigo-900 text-white rounded-md py-2 px-4"
                        type="submit"
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : 'Add to Watchlist'}
                    </button>
                </form>
            )}

            {addError && (
                <p className="text-red-500 text-sm mt-2">Could not add coin to watchlist.</p>
            )}

            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-2 mt-8">
                {watchlist.length === 0 && (
                    <p className="text-gray-500">Your watchlist is empty.</p>
                )}

                {watchlist.map((item) => (
                    <div className="stat-box" key={item.id}>
                        <div className="flex justify-between items-center">
                            <h3 className="md:text-md text-sm font-medium capitalize">{item.coinId}</h3>
                            <button
                                className="text-red-500 hover:underline text-sm"
                                onClick={() => removeCoin(item.coinId)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Watchlist;
