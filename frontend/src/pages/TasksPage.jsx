import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/tasks/KanbanBoard';
import GlassCard from '../components/ui/GlassCard';
import FireArrowButton from '../components/ui/FireArrowButton';
import taskApi from '../api/taskApi';
import { CheckSquare, Plus, Search, Filter } from 'lucide-react';

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Task state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAssigned, setNewAssigned] = useState('Alex Rivera');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await taskApi.getTasks();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus, newProgress) => {
    const updated = await taskApi.updateTaskStatus(taskId, newStatus, newProgress);
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus, progress: newProgress } : t));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const created = await taskApi.createTask({
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      assignedTo: newAssigned,
      status: 'NOT STARTED',
      progress: 0,
      projectName: 'Enterprise Cloud Migration'
    });

    setTasks([created, ...tasks]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-pulse-orange" />
            <span>Sprint Task Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Kanban board workflow & blocker tracking</p>
        </div>

        <FireArrowButton onClick={() => setShowCreateModal(true)} size="md">
          Create Task
        </FireArrowButton>
      </div>

      {/* Filter Bar */}
      <GlassCard className="p-4 flex items-center gap-4">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search task title, assignee or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </GlassCard>

      {/* Kanban Board */}
      {loading ? (
        <div className="p-8 text-center text-slate-400">Loading Kanban tasks...</div>
      ) : (
        <KanbanBoard tasks={filteredTasks} onStatusChange={handleStatusChange} />
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-5">
            <h3 className="text-xl font-bold text-white">Create New Sprint Task</h3>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Webhook secret validation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-pulse-orange/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Task scope details..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-pulse-orange/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Assign To</label>
                  <input
                    type="text"
                    value={newAssigned}
                    onChange={(e) => setNewAssigned(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-navy-900 border border-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <FireArrowButton type="submit" size="md">
                  Save Task
                </FireArrowButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
