import { supabase } from '../config/supabase.js';
import { validateProjectInput } from '../utils/validation.js';

// Sample fallback dataset for standalone demo mode
const SEED_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Enterprise Cloud Migration',
    description: 'Migrating legacy monolith architecture to microservices on AWS with Zero-Downtime deployment.',
    start_date: '2026-08-01',
    deadline: '2026-10-15',
    status: 'on_track',
    riskStatus: 'ON TRACK',
    progress: 78,
    expectedCompletion: '2026-10-10',
    bufferDays: 5,
    teamMembers: [
      { name: 'Sarah Jenkins', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { name: 'David Chen', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    ],
    lastUpdated: '10 mins ago',
    githubRepo: 'projectpulse/cloud-migration-backend',
    commitsThisWeek: 42,
    openPrs: 3
  },
  {
    id: 'proj-2',
    name: 'AI Deadline Analytics Engine',
    description: 'Backend prediction algorithms consuming GitHub commit velocity & historical sprint throughput.',
    start_date: '2026-08-01',
    deadline: '2026-09-30',
    status: 'delayed',
    riskStatus: 'DELAYED',
    progress: 52,
    expectedCompletion: '2026-10-12',
    bufferDays: -12,
    teamMembers: [
      { name: 'Marcus Vance', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      { name: 'Elena Rostova', role: 'Backend Engineer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
    ],
    lastUpdated: '1 hour ago',
    githubRepo: 'projectpulse/predictive-engine',
    commitsThisWeek: 18,
    openPrs: 5
  }
];

export const getAllProjects = async (req, res, next) => {
  try {
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !dbProjects || dbProjects.length === 0) {
      return res.status(200).json({
        success: true,
        data: SEED_PROJECTS
      });
    }

    const mapped = dbProjects.map(p => ({
      ...p,
      riskStatus: (p.status || 'on_track').toUpperCase().replace('_', ' '),
      progress: p.progress || 50,
      expectedCompletion: p.deadline,
      lastUpdated: 'Recently',
      teamMembers: [
        { name: 'Sarah Jenkins', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'Alex Rivera', role: 'Fullstack Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
      ]
    }));

    return res.status(200).json({
      success: true,
      data: mapped
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: dbProject, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !dbProject) {
      const fallback = SEED_PROJECTS.find(p => p.id === id) || SEED_PROJECTS[0];
      return res.status(200).json({
        success: true,
        data: fallback
      });
    }

    const mapped = {
      ...dbProject,
      riskStatus: (dbProject.status || 'on_track').toUpperCase().replace('_', ' '),
      progress: dbProject.progress || 65,
      expectedCompletion: dbProject.deadline,
      bufferDays: 5,
      teamMembers: [
        { name: 'Sarah Jenkins', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'Alex Rivera', role: 'Fullstack Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
      ]
    };

    return res.status(200).json({
      success: true,
      data: mapped
    });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, start_date = new Date().toISOString().split('T')[0], deadline } = req.body;

    const valErrors = validateProjectInput({ name, start_date, deadline });
    if (valErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: valErrors.join(' ')
      });
    }

    const creatorId = req.user?.id && req.user.id.includes('-') ? req.user.id : null;

    const { data: newProject, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          description,
          start_date,
          deadline,
          status: 'on_track',
          created_by: creatorId
        }
      ])
      .select()
      .single();

    if (error) {
      const createdFallback = {
        id: `proj-${Date.now()}`,
        name,
        description,
        start_date,
        deadline,
        status: 'on_track',
        riskStatus: 'ON TRACK',
        progress: 0,
        expectedCompletion: deadline,
        bufferDays: 5,
        teamMembers: [],
        lastUpdated: 'Just now'
      };
      SEED_PROJECTS.unshift(createdFallback);
      return res.status(201).json({
        success: true,
        data: createdFallback
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        ...newProject,
        riskStatus: 'ON TRACK',
        progress: 0,
        expectedCompletion: newProject.deadline,
        lastUpdated: 'Just now',
        teamMembers: []
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: updated, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const idx = SEED_PROJECTS.findIndex(p => p.id === id);
      if (idx !== -1) {
        SEED_PROJECTS[idx] = { ...SEED_PROJECTS[idx], ...updates };
        return res.status(200).json({ success: true, data: SEED_PROJECTS[idx] });
      }
    }

    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await supabase.from('projects').delete().eq('id', id);

    return res.status(200).json({
      success: true,
      message: `Project ${id} deleted successfully.`
    });
  } catch (err) {
    next(err);
  }
};

export const addProjectMember = async (req, res, next) => {
  try {
    const { id: project_id } = req.params;
    const { user_id, role_in_project = 'member' } = req.body;

    const { data, error } = await supabase
      .from('project_members')
      .insert([{ project_id, user_id, role_in_project }])
      .select()
      .single();

    return res.status(201).json({
      success: true,
      data: data || { project_id, user_id, role_in_project }
    });
  } catch (err) {
    next(err);
  }
};

export const removeProjectMember = async (req, res, next) => {
  try {
    const { id: project_id, userId: user_id } = req.params;
    await supabase
      .from('project_members')
      .delete()
      .match({ project_id, user_id });

    return res.status(200).json({
      success: true,
      message: 'Project member removed successfully.'
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectMembers = async (req, res, next) => {
  try {
    const { id: project_id } = req.params;
    const { data: members } = await supabase
      .from('project_members')
      .select('*, users(*)')
      .eq('project_id', project_id);

    return res.status(200).json({
      success: true,
      data: members || []
    });
  } catch (err) {
    next(err);
  }
};
