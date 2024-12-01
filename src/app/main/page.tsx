"use client"; // Ensure this component runs on the client side

import { useEffect } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/react"; // Importing NextUI components
import { useAuthStore } from "../../state/stores/authStore"; // Zustand store for authentication
import TenderList from "../../components/tender/TenderList"; // Component to display tenders
import LogoutButton from "../../components/tender/LogoutButton"; // Logout button component
import { useTenderStore } from "../../state/stores/tenderStore"; // Zustand store for tenders

/**
 * MainPage: Displays the main content after user authentication
 * 
 * This component fetches and displays a list of tenders, and provides
 * a logout functionality.
 */
const MainPage = () => {
    // Extract the logout function from the authentication store
    const { logout } = useAuthStore(); // Get the logout function from the authentication store
    // Extract tender-related data and functions from the tender store
    const { tenders, loading, fetchTenders } = useTenderStore(); // Get tender data and loading state

    // Effect hook to fetch tenders when the component mounts
    useEffect(() => {
        // Only fetch tenders if the list is empty to avoid unnecessary API calls
        if (tenders.length === 0) { // Avoid redundant fetch if tenders are already loaded
            fetchTenders();
        }
    }, [fetchTenders, tenders.length]); // Dependencies ensure the effect runs only when necessary

    return (
        <div style={{ padding: '20px' }}>
            <Card shadow="md" radius="lg">
                <CardBody>
                    {/* TenderList component to display the list of tenders */}
                    <TenderList
                        tenders={tenders} // Pass the tenders data
                        loading={loading} // Pass the loading state
                    />
                </CardBody>
                <CardFooter>
                    {/* LogoutButton component for user logout functionality */}
                    <LogoutButton logout={logout} />
                </CardFooter>
            </Card>
        </div>
    );
};

export default MainPage;
