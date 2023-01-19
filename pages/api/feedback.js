import fs from 'fs'; //filesystem
import path from 'path'; //these are node js modules


function buildFeedbackPath() { //gives file path to save json
    return path.join(process.cwd(), 'data', 'feedback.json'); //creates the absolute path to where we wanna put our data
}

function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

function handler(req, res) {
    //nextjs will execute this file for incoming requests directed to /api/feedback
    // allows us to execute any server side code (CODE HERE WILL NEVER TOUCH CLIENT SIDE CODE) anything here is server side code
    // which is also a reason why clients will never be able to see the code here
    // req means request, res means response

    if (req.method === 'POST') { //if the request has been made using POST (ie we want to post data to backend)
        const email = req.body.email; // body will be the already parsed body (contains data sent with http)
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(), //dummy ID, but its best to have other providers that give unique id
            email: email,
            text: feedbackText
        }

        // store in database and in a file
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback); // push into the array that is currently in json file
        fs.writeFileSync(filePath, JSON.stringify(data)); //writes the data to the disk
        res.status(201).json({message: 'Success!', feedback: newFeedback}); //once data is sent, this message (in json) will be sent back to signify success
    } else {
         //setting response
        //set a success status code //also send back json data as part of response for incoming requests
        // Note: typically for exchange data with api is done through json files

        // LOOK HERE!
        // How do we handle incoming get request?
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({feedback: data}); // the data you want to give back
    }

}

export default handler;