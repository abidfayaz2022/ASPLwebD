'use client';
import { useEffect } from 'react';

export default function BootstrapClient({ children }) {
    useEffect(() => {
        // dynamically load the JS on mount
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return <>{children}</>;
}
