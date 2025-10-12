import express from 'express';
import {sendConnectionRequest , acceptConnectionRequest, fetchConnectionRequests, rejectConnectionRequest, sendConnectionRequestByUsername, fetchAllrequestsByUsername, fetchAcceptedConnections} from '../controllers/connectioncontroller.js'; // Adjust the path as needed

const router = express.Router();

router.post('/sendrequest/:clerkid', sendConnectionRequest);

router.post('/acceptrequest/:userclerkid', acceptConnectionRequest);

router.post('/rejectrequest/:senderid', rejectConnectionRequest);

router.post('/sendname/:receiverUsername', sendConnectionRequestByUsername); 

router.get('/fetchrequests/:clerkid', fetchConnectionRequests);

router.get('/fetchrequestsbyname/:username', fetchAllrequestsByUsername); 

router.get('/getAcceptedConnections/:userclerkid', fetchAcceptedConnections);

export default router;