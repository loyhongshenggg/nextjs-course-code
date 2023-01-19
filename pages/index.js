import fs from 'fs/promises';
import path from 'path'
import Link from 'next/link'

function HomePage(props) {

    const {products} = props;

  return (
    <ul>
        {products.map((product) => (
            <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
        ))}
    </ul>
  );
}

export async function getStaticProps(context) {
    // always need to return an object with props key
    // what this function does is it always prepares the props for your components
    // So nextjs will first execute getStaticProps, then execute the main function above (function Homepage)
    // It forces fetching of data (if you put inside this function) to be done in server side, not client side.

    // you can use fs here! But not in client side codes, we can use fs to access dummy backend json file

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    console.log("Re-generating!")
    //gives you the current working directory of this code file -- so is the overall project folder ie nextjs-course-code folder
    // then choose in the arguments the directory for the backend json
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData); // converts json to a regular javascript object

    if (data.products.length === 0) { //using the notFound key to ensure unless data is retrieved, we will give 404.
        return {
            notFound: true
        }
    }

    if (!data) { // redirects to page if there is no data!
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    return { //there are many different keys for getStaticProps! read more but props must be included.
        props: {
         products: data.products
        },
        revalidate: 10, // ISR page regeneration every X seconds but only works for production (ie. after deployment)

    };


    //A closer look at getStaticProps

}

export default HomePage;
