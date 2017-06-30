import { useEffect, useRef } from 'react';

export default function previousProps(value) {

    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;

}