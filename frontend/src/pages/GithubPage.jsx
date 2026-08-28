import React, { useState, useEffect } from 'react';
import GithubActivityFeed from '../components/github/GithubActivityFeed';
import githubApi from '../api/githubApi';

export const GithubPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGithub = async () => {
    setLoading(true);
    try {
      const ghData = await githubApi.getActivity();
      setData(ghData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithub();
  }, []);

  const handleSync = async () => {
    await githubApi.syncGithub('cloud-migration-backend');
    fetchGithub();
  };

  if (loading || !data) {
    return <div className="p-8 text-center text-slate-400">Loading GitHub activity feed...</div>;
  }

  return (
    <GithubActivityFeed data={data} onSync={handleSync} />
  );
};

export default GithubPage;
