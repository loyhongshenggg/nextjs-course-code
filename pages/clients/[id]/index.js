import React from 'react';
import {useRouter} from "next/router";

function ClientsProjectsPage(props) {
    const router = useRouter();

    const loadProjectHandler = () => {
        //How to navigate programmatically
        router.push('clients/max/projecta')
        //push allows users to go back. Replace does not
    }
    return (
        <div>
            <h1>The projects of a given client</h1>
            <h2>So over here you can say like clients/mel/project1</h2>
            <button onClick={loadProjectHandler}>Load Project A</button>
        </div>
    );
}

export default ClientsProjectsPage;