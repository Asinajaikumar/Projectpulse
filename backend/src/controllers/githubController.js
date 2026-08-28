import { githubService } from '../services/githubService.js';

export const getGithubActivity = async (req, res, next) => {
  try {
    const { repo } = req.query;
    const data = await githubService.getRepoActivity(repo);
    return res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const syncGithub = async (req, res, next) => {
  try {
    const { repo } = req.body;
    const result = await githubService.syncWebhook(repo);
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
