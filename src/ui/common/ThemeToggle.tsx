'use client';

import { Switch } from '@nextui-org/react';
import { useThemeStore } from '@/state/stores/themeStore';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, setTheme]);

    return (
        <Switch
            defaultSelected={isDarkMode}
            size="lg"
            color="secondary"
            onChange={toggleTheme}
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
        />
    );
};
