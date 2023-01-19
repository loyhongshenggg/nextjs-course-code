import {useRef, useState} from 'react';



function HomePage() {

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();
    const [feedbackItems, setFeedbackItems] = useState([]);

    const submitFormHandler = (event) => { // event object for standard react
        event.preventDefault(); //prevents page to be reloaded (since browser will automatically send a req)

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value; // we can get their values

        const reqBody = {email : enteredEmail, text: enteredFeedback};

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: { // the headers is like your html header, content-type is like meta data, in this case it tells backend what type of data we are sending
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => console.log(data));  //we will be sending a post request to backend //lets send a javascript object { email: 'test@test.com', text: 'some feedback text'}
    }

    const loadFeedbackHandler = () => {
        fetch('/api/feedback')//BY DEFAULT you do this you are sending a GET request to this url
            .then((response) => response.json())
            .then((data) => setFeedbackItems(data.feedback));  //we will do somehting with the data we get from the GET request
    }

  return (
    <div>
      <h1>The Home Page</h1>
        <form onClick={submitFormHandler}>
            <div>
                <label htmlFor={'email'}>Email:</label>
                <input type={'email'} id={'email'} ref={emailInputRef} />
            </div>
            <div>
                <label htmlFor={'feedback'}>Feedback:</label>
                <textarea id={'feedback'} rows={5} ref={feedbackInputRef}></textarea>
            </div>
            <button>Send Feedback</button>
            <button onClick={loadFeedbackHandler}>Load Feedback</button>
        </form>
        <ul>
            {feedbackItems.map((items) => (<li key={items.id}>{items.text}</li>))}
        </ul>
    </div>
  );
}

export default HomePage;
