function UserProfilePage(props) {
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

// Typical usecase for getServerSideProps
// We want to get specific data from server, but we need access to a request object to find out which user sent this request
// we can't pre render this page
// this function runs for every incoming request and never statically pregenerated. Good for highly dynamic data (data gets outdated quickly)
export async function getStaticProps(context) {
    // the props below will be made available to the function above
    // the props will only be accessible for each incoming request for data
    //IMPORTANT: this only executes on the server after deployment while static is pre-generated during deployment

    const {params, req, res} = context;
    //using this function, you will get access to request and response objects
    // res is for you to manipulate the response aside from the default site

    return {
      props: {
          username: 'Max'
      }
    };

}