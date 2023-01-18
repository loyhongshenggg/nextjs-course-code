import React from 'react';
import {useRouter} from "next/router";

function BlogPostsPage(props) {
    const router = useRouter()
    console.log(router.query)
    return(
    <div>
        <h1>The blog posts</h1>
        <h2>In this case we let the placeholder file be dynamic (accepts anything) so links such as these will work: http://localhost:3000/blog/lala/hehe/1</h2>
        <h3>Lets you catch all routes</h3>
    </div>
)
;
}

export default BlogPostsPage;