import {useEffect} from 'react';


function LastSalesPage() {

    // useEffect(() => {
    //     fetch('https://exampleurl.com/sales.json')
    //         .then(response => response.json())
    // }, []);

    //using nextjs swr hook for data retrieval
    const {data, error} = useSWR('www.example.com/sales.json');

    useEffect(() => {
        if (data) {
            // do whatever you want to do with the data
        }
    }, [data])

    if (error) {
        return <p>Failed to Load.</p>
    }

    if (!data || !sales) {
        return <p>Loading...</p>
    }
    
    return <ul>

    </ul>
}

export default LastSalesPage;