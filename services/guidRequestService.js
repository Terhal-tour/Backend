import GuideRequest from '../models/GuideRequest.js';
import User from '../models/User.js';

export const createGuideRequestService = async (guideId, userId, data) => {
    const { message, date, duration } = data;

    const loggedInUser = await User.findById(userId);
    console.log('Logged in user:', loggedInUser);

    const userEmail = loggedInUser.email;
    const userName = loggedInUser.name;
    console.log(`Creating guide request for user: ${userName} (${userEmail})`);
    

    if (!userName || !userEmail || !message || !date || !duration) {
        throw new Error('Missing required fields');
    }

    const request = new GuideRequest({
        ...data,
        userEmail,
        userName,
        user: userId,
        guide: guideId
    });
console.log(request);

    return await request.save();
};

export const cancelGuideRequestService = async (requestId, userId) => {
    const request = await GuideRequest.findById(requestId);
    if (!request) throw new Error('Request not found');
    if (!request.user.equals(userId)) {
        throw new Error('Not authorized to cancel this request');
    }
    await GuideRequest.findByIdAndDelete(requestId);
};

export const editGuideRequestService = async (requestId, userId, updatedData) => {
    const request = await GuideRequest.findById(requestId);
    if (!request) throw new Error('Request not found');
    if (!request.user.equals(userId)) {
        throw new Error('Not authorized to edit this request');
    }

    Object.assign(request, updatedData);
    return await request.save();
};

export const getRequestsByUserService = async (userId) => {
    return await GuideRequest.find({ user: userId }).sort({ createdAt: -1 });
};
export const getRequestsByGuideService = async (guideId) => {
    return await GuideRequest.find({ guide: guideId }).sort({ createdAt: -1 });
};

export const confirmRequestStatusService = async (requestId, guideId, status) => {
  const request = await GuideRequest.findOne({ _id: requestId, guideId });

  if (!request) {
    throw new Error("Request not found or unauthorized");
  }

  if (request.status === "confirmed") {
    throw new Error("Request already confirmed");
  }

  request.status = status || "confirmed";
  await request.save();

  return request;
};

// Reject request status
export const rejectRequestStatusService = async (requestId, guideId, status) => {
  const request = await GuideRequest.findOne({ _id: requestId, guideId });

  if (!request) {
    throw new Error("Request not found or unauthorized");
  }

  if (request.status === "rejected") {
    throw new Error("Request already rejected");
  }

  request.status = status || "rejected";
  await request.save();

  return request;
};
