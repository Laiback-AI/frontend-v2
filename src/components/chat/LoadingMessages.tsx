"use client";

import React, { useEffect, useState } from 'react';

const loadingMessages = ['Llegint licitació...', 'Analitzant pregunta...', 'Obtenint resposta...'];

const LoadingMessages: React.FC = () => {
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    // Effect to change the loading message every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    return <>{loadingMessages[loadingMessageIndex]}</>;
};

export default LoadingMessages;
