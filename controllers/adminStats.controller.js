// controllers/adminStats.controller.js
import {
  getOverviewStatsService,
  getNationalitiesStatsService,
  getTopRatedPlacesService,
  getReviewsAnalysisService
} from '../services/adminStats.service.js';

export const getOverviewStats = async (req, res) => {
  try {
    const data = await getOverviewStatsService();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const getNationalitiesStats = async (req, res) => {
  try {
    const data = await getNationalitiesStatsService();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const getTopRatedPlaces = async (req, res) => {
  try {
    const data = await getTopRatedPlacesService();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const getReviewsAnalysis = async (req, res) => {
  try {
    const data = await getReviewsAnalysisService();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
