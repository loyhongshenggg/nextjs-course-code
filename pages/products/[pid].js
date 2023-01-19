import {Fragment} from 'react';
import fs from 'fs/promises';
import path from 'path'
import {notFound} from "next/navigation";

function ProductDetailPage(props) {
    const {loadedProduct} = props; // this is array destructuring

    if (!loadedProduct) {
        return <h1>Loading...</h1>;
    } //fallback content

    return(
    <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    console.log("Re-generating!")
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticProps(context) { //context parameter: use it to get hold of concrete param values

    //Note that this function gives error. When you have a dynamic page, [pid].js, this kind of pages are not pre-generated hence this function leads to an error since it pre generates
    // reason being since it is dynamic, nextjs does not know how many pages to pre generate thus error.
    // so we shud use pregenerated paths

    const {params} = context; // use params to get access to values in url

    const productId = params.pid; // data used to do prerendering on the server side, get the values from url

    const data = await getData();

    const product = data.products.find(product => product.id === productId);

    if (!product) {
        return {notFound:true};
    } //to handle if don't have data
    // so the loading above is to show that server is loading to get data
    // if server can't find data, this part will kick in to show page 404

    return { // we use this to expose the data that we extracted to the component
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() { // the purpose is to tell nextjs which instances of this dynamic page should be pre-generated.
    const data = await getData();

    const ids = data.products.map((product) => product.id);

    const pathsWithParams = ids.map(id => ({params: {pid: id}})); // for each of the instances of dynamic pages, we set it like below

    return {
      paths: pathsWithParams,
          //tells next js these three values should be pre-generated for the dynamic pages
          //only then we can use params.pid above
          // { params: { pid: 'p1' } }, // each of these are instances of the dynamic page!
          // { params: { pid: 'p2'} },
          // { params: { pid: 'p3'} }
        fallback: true
        // help you if you have alot of pages to be pre-generated for example you wanna not pre-generate least popular pages
        // when set to true, we need to handle above fallback content
        // when set to false. Only pages generated above are visible
        // NOTE: if you use this fallback feature: must be prepared to return a fallback content above!
    };
}

export default ProductDetailPage;