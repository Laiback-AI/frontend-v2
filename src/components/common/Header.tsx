"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link,
    Button,
} from "@nextui-org/react";
import { ThemeToggle } from "./ThemeToggle";

const menuItems = [
    "Projects",
    "Documentation",
    "Contact Us",
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar
            classNames={{
                base: "bg-background/60 dark:bg-background/60",
                wrapper: "w-full justify-center",
                item: "hidden md:flex",
            }}
            height="60px"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarBrand>
                <Link href="/main" className="font-bold text-inherit">
                    LAIBACK
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/projects">
                        Projects
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="gap-4">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="/login" variant="flat">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}