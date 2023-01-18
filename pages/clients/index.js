import React from 'react';
import Link from 'next/link'

function ClientsPage(props) {
    const clients = [
        {id: "max", name:"Maxlion"},
        {id: "mel", name:"Mel"}
    ]
    return (
        <div>
            <h1>The page of a given client</h1>
            <ul>
                {clients.map((clients) => {
                    return <li key={clients.id}>
                        <Link href={`/clients/${clients.id}`}>{clients.name}</Link>
                    </li>
                    {/*<li>
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: {id: client.id}
                        }}></Link>
                    </li> Alternative way of setting link hrefs*/}
                })}

            </ul>
        </div>
    );
}

export default ClientsPage;