import {Fragment, useState} from 'react';
import {buildFeedbackPath, extractFeedback} from '../api/feedback'

function FeedbackPage(props) {

    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) { //we need to know which id to load feedback // uses dynamic api route
        fetch(`/api/${id}`) // we are fetching data from this api url
            .then(response => response.json())
            .then(data => {
                setFeedbackData(data.feedback);
            });// /api/some-feedback-id
    }

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>{item.text}<button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
                        {/* bind -- javascript method to preconfigure the value for loadFeedbackHandler for future execution*/}
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export async function getStaticProps(context) { // never use fetch() for getStaticProps or getServerProps
    // now we want data to be fetched from backend and pre generate it. (Get data during deployment)
    // you should write code meant for nodejs directly here -- ie code inside feedback.js
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return ({ //this is defining what your props have. That's why you do props.feedbackItems.map...
        props: {
            feedbackItems: data,
        }
    })
}

export default FeedbackPage;