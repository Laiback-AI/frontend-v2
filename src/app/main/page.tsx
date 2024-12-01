"use client"; // Ensure this component runs on the client side

import { useEffect } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/react"; // Importing NextUI components
import { useAuthStore } from "../../state/stores/authStore"; // Zustand store for authentication
import { useTenderStore } from "../../state/stores/tenderStore"; // Zustand store for tenders

// Main page component
const MainPage = () => {
    const { logout } = useAuthStore(); // Get the logout function from the authentication store
    const { tenders, loading, fetchTenders } = useTenderStore(); // Get tender data and loading state

    // Fetch tenders when the component mounts
    useEffect(() => {
        if (tenders.length === 0) { // Avoid redundant fetch if tenders are already loaded
            fetchTenders();
        }
    }, [fetchTenders, tenders.length]); // Ensure the function is stable to avoid infinite re-renders

    return (
        <div style={{ padding: '20px' }}>
            <Card shadow="md" radius="lg">
                HELLO HACKERS!
            </Card>
        </div>
    );
};

export default MainPage;
