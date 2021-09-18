import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({pathname: nextPathname}) => {
                const {pathname} = history.location;
                if (pathname !== nextPathname) {
                    console.log('child is navigating', nextPathname)
                    history.push(nextPathname);
                    console.log('Marketing location after', history.location)
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);


    return <div ref={ref}> </div>
}