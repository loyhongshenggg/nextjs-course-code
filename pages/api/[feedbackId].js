//dynamic API routes
// Use case -- when you want to have like button for each item to show more details of that item
// so an api url will look like /api/feedback/something where something is [feedbackId]
import {buildFeedbackPath, extractFeedback} from './feedback'


function handler(req, res) {
    // req.method -- type of request, req.body -- access submitted data, req.query -- access to query parameters and regular parameters
    if (req.method === 'DELETE') {
        //execute whatever you want //dynamic request works for all methods too!
    }
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackId); //look for feedback id that matches
    res.status(200).json({feedback: selectedFeedback});
}

export default handler;