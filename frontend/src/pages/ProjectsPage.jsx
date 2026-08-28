import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import GlassCard from '../components/ui/GlassCard';
import FireArrowButton from '../components/ui/FireArrowButton';
import { ProjectCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import projectApi from '../api/projectApi';
import { FolderKanban, Plus, Filter, Search } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // New Project Form state
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjDeadline, setNewProjDeadline] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await projectApi.getAllProjects();
        setProjects(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjName) return;

    const created = await projectApi.createProject({
      name: newProjName,
      description: newProjDesc,
      deadline: newProjDeadline || '2026-11-30',
      expectedCompletion: newProjDeadline || '2026-11-25',
    });

    setProjects([created, ...projects]);
    setShowCreateModal(false);
    setNewProjName('');
    setNewProjDesc('');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesRisk = filterRisk === 'ALL' || p.riskStatus === filterRisk;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-pulse-orange" />
            <span>Active Sprints & Projects</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Live tracking and deadline prediction status</p>
        </div>

        <FireArrowButton onClick={() => setShowCreateModal(true)} size="md">
          Create New Project
        </FireArrowButton>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Filter projects by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Risk Pills filter */}
        <div className="flex items-center gap-1 bg-navy-950 p-1 rounded-xl border border-slate-800">
          <span className="px-2 text-[10px] uppercase font-mono text-slate-500 font-bold">Filter:</span>
          {['ALL', 'ON TRACK', 'AT RISK', 'DELAYED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterRisk(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterRisk === status
                  ? 'bg-pulse-orange text-white shadow-glow-orange/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Grid of Projects */}
      {loading ? (
        <ProjectCardSkeleton />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects match filter"
          description="Try selecting another risk status filter or create a new project."
          actionText="Create Project"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-5">
            <h3 className="text-xl font-bold text-white">Initialize New Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Microservices Migration"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-pulse-orange/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Technical scope and goals..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-pulse-orange/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Deadline</label>
                <input
                  type="date"
                  value={newProjDeadline}
                  onChange={(e) => setNewProjDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-pulse-orange/60"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-navy-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <FireArrowButton type="submit" size="md">
                  Create Project
                </FireArrowButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
