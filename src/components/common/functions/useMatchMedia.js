/** @format */

import { useState, useEffect } from 'react';

/**
 * Example:
 *
 * const isSmallScreen = useMatchMedia('(max-width: 600px)');
 */
export default function useMatchMedia(query) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches,
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const callback = (e) => setMatches(e.matches);

        mediaQueryList.addListener(callback);
        return function cleanup() {
            mediaQueryList.removeListener(callback);
        };
    }, [query, setMatches]);

    return matches;
}
