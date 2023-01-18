import React from 'react';
import {useRouter} from 'next/router';

function PortfolioProjectPage(props) {

    const router = useRouter();

    console.log(router.pathname)
    console.log(router.query)
    // send a request to some backend server to fetch data wit hid  of router.query.projectid



    return(
    <div>
        <h1>Portfolio project page</h1>
        <h3>The [] thing is just a placeholder, so in the url whatever value you type will be the value for the placeholder.</h3>
        <h3>Note that the filename can be anything that is inside [] cuz its also just a placeholder</h3>
    </div>
)
;
}

export default PortfolioProjectPage;