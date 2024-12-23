import { getAuthSession } from '@/lib/auth';
import React from 'react';

const Watchlist = async () => {
    const session = await getAuthSession();
    if (!session) {
        return <p>You need to be signed in to view your watchlist.</p>;
    }

    return (
        <section>
            <h1>Watchlist</h1>
            {session.user.name}

            <p>This is the watchlist page.</p>
        </section>
    );
};

const WatchlistPage: React.FC = () => {
    
    return (
        <section>
            <h1>Watchlist</h1>
            <Watchlist />

            <p>This is the watchlist page.</p>
        </section>
    );
};

export default WatchlistPage;