import React from 'react';
import {useRouter} from "next/router";

function SelectedClientsProjectsPage(props) {
    const router = useRouter();
    console.log(router.query); //you can use these values to fetch data for specific client

    return (
        <div>
            <h1>The selected client projects of a given client</h1>
            <h2>So over here you can say like clients/max/project1</h2>
        </div>
    );
}

export default SelectedClientsProjectsPage;