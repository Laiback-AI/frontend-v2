// Import necessary components and types
import { Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Navigation hook from Next.js
import { Tender } from "../../types/tenderTypes"; // Import the Tender type

// Define the props for the TenderItem component
interface Props {
    tender: Tender;  // Tender object passed as a prop
}

// Component to display each tender item
const TenderItem = ({ tender }: Props) => {
    const router = useRouter(); // Next.js router for navigation

    // Function to handle click on tender item
    const handleTenderClick = () => {
        router.push(`/tender/${tender.id}`); // Navigate to the tender detail page using the tender id
    };

    return (
        <li style={{ width: '100%' }}>
            {/* Button to display the tender title and info link */}
            <Button
                color="primary"
                className="w-full mb-2 rounded-ls" // TailwindCSS classes for full-width button and margin
                onPress={handleTenderClick} // Navigate to tender details on click
            >
                {tender.title} - +info
            </Button>

            {/* Spacer to create space between list items */}
            <Spacer y={1} />
        </li>
    );
};

export default TenderItem;
