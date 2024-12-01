// Import necessary components from NextUI
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

// Define the Header component
const Header = () => {
    return (
        // Navbar with border and maximum width of 'lg'
        <Navbar isBordered maxWidth="lg">
            {/* Branding section with the app name */}
            <NavbarBrand>
                <Link href="/main">
                    <span>Fastender</span>
                </Link>
            </NavbarBrand>

            {/* Content section on the right with links */}
            <NavbarContent justify="end">
                <NavbarItem>
                    <span>Home</span>
                </NavbarItem>
                <NavbarItem>
                    <span>About</span>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
