import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './config/queryClient';
import HomePage from './ui/pages/Home';

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HomePage />
        </QueryClientProvider>
    );
};

export default App;
