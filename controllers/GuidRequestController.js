import {
  cancelGuideRequestService,
  createGuideRequestService,
  editGuideRequestService,
  getRequestsByUserService,
  getRequestsByGuideService,
  updateRequestStatusService
} from '../services/guidRequestService.js';

export const requestGuide = async (req, res) => {
  try {
    const guideId = req.params.guideId; 
    const userId = req.user.id;
    const requestData = req.body;

    console.log(`Requesting guide with ID: ${guideId} for user ID: ${userId}`, requestData);
    console.log('Logged in user:', req.user);

    const result = await createGuideRequestService(guideId, userId, requestData);
    console.log("request result", result);

    if (!result) {
      return res.status(400).json({ message: 'Failed to create guide request' });
    }

    res.status(201).json({ message: 'Guide request sent successfully', request: result });
  } catch (error) {
    console.error('Error requesting guide:', error);
    res.status(500).json({ error: error.message });
  }
};


export const cancelGuideRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.user.id;

    await cancelGuideRequestService(requestId, userId);
    res.status(200).json({ message: 'Guide request cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editGuideRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedRequest = await editGuideRequestService(requestId, userId, updatedData);
    res.status(200).json({ message: 'Guide request updated successfully', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await getRequestsByUserService(userId);
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGuideRequests = async (req, res) => {
  try {
    const guideId = req.user.id;
    const requests = await getRequestsByGuideService(guideId);
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmGuideRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const guideId = req.user.id;
    const updatedRequest = await updateRequestStatusService(requestId, guideId, 'approved');
    res.status(200).json({ message: 'Request confirmed', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectGuideRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const guideId = req.user.id;

    const updatedRequest = await updateRequestStatusService(requestId, guideId, 'rejected');
    res.status(200).json({ message: 'Request rejected', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
