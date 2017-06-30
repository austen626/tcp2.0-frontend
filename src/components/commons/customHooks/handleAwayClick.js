import { useEffect } from 'react';

export default function HandleAwayclick( ref, cb ) {

    useEffect(() => {

        function handleClickOutside( evt ) {

            if(ref.current && !ref.current.contains( evt.target ) && cb ) {

                cb();
            }
        }

        document.addEventListener( 'mousedown', handleClickOutside );

        return () => {

            document.removeEventListener( 'mousedown', handleClickOutside );
        };

    }, [ ref ]);

}