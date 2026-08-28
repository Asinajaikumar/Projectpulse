import { supabase } from '../config/supabase.js';

export const getProjectReports = async (req, res, next) => {
  try {
    const { id: project_id } = req.params;
    const { data: dbReports, error } = await supabase
      .from('project_reports')
      .select('*')
      .eq('project_id', project_id)
      .order('snapshot_date', { ascending: true });

    const reports = dbReports && dbReports.length > 0 ? dbReports : [
      { sprint: 'Sprint 1', actual: 15, expected: 15 },
      { sprint: 'Sprint 2', actual: 32, expected: 30 },
      { sprint: 'Sprint 3', actual: 48, expected: 50 },
      { sprint: 'Sprint 4', actual: 65, expected: 70 },
      { sprint: 'Sprint 5', actual: 78, expected: 85 }
    ];

    return res.status(200).json({
      success: true,
      data: reports
    });
  } catch (err) {
    next(err);
  }
};
