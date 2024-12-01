// Import necessary components and hooks
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Define the props structure for the LogoutButton component
interface Props {
    logout: () => void; // Function to handle user logout
}

// Logout button component
const LogoutButton = ({ logout }: Props) => {
    const router = useRouter(); // Get Next.js router for navigation

    // Handle user logout and navigate to login page
    const handleLogout = () => {
        logout(); // Execute the logout function passed as prop
        router.push("/login"); // Redirect the user to the login page
    };

    return (
        // Render a button that triggers logout and navigation
        <Button color="danger" onPress={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
