function UserIdPage(props) {
    return <h1>{props.id}</h1>
}

export default UserIdPage;

//if we use getServerSideProps, we don't need and can't use getStaticProps

export async function getServerSideProps(context) { //unlike getStaticProps! There's no pre-generation!

    const {params} = context;
    const userId = params.uid;

    return {
        props: {
            id: 'userid-' + userId
        }
    }
}