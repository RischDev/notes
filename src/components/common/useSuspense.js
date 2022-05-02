/** @format */

import { useMemo } from 'react';

// Converts a promise into something that works with React Suspense.
function createSuspenseResource(promise) {
    let status = 'pending';
    let result;
    let suspender = promise.then(
        (r) => {
            status = 'success';
            result = r;
        },
        (e) => {
            status = 'error';
            result = e;
        },
    );
    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        },
    };
}

export default function useSuspenseResource(promiseCallback, deps) {
    return useMemo(
        () => createSuspenseResource(promiseCallback()),
        // Dynamic deps array because it's passed in from the caller.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}
