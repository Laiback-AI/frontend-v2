// src/app/page.tsx
import { redirect } from 'next/navigation';

// Main page component
export default function Home() {
    // Redirect to the login page when the root is accessed
    redirect('/login');
}
