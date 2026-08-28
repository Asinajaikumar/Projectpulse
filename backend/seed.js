import { supabase } from './src/config/supabase.js';
import env from './src/config/env.js';

async function seedDatabase() {
  console.log('=================================================');
  console.log('🌱 ProjectPulse Database Seeding Tool');
  console.log(`📡 Connecting to Supabase URL: "${env.SUPABASE_URL}"`);
  console.log('=================================================');

  if (env.SUPABASE_URL.includes('demo-projectpulse') || env.SUPABASE_URL.includes('your-supabase-project')) {
    console.log('⚠️ NOTICE: You are currently using placeholder Supabase credentials in backend/.env.');
    console.log('👉 Please replace SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in backend/.env with your real keys from https://supabase.com (Project Settings -> API).');
    console.log('=================================================');
    return;
  }

  try {
    // 1. Seed Users
    const users = [
      { id: 'a1b2c3d4-0001-4000-8000-000000000001', full_name: 'Alex Rivera', email: 'alex.rivera@projectpulse.io', role: 'admin' },
      { id: 'a1b2c3d4-0002-4000-8000-000000000002', full_name: 'Sarah Jenkins', email: 'sarah.j@projectpulse.io', role: 'team_leader' },
      { id: 'a1b2c3d4-0003-4000-8000-000000000003', full_name: 'David Chen', email: 'david.c@projectpulse.io', role: 'employee' }
    ];

    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'email' });

    if (userError) {
      console.error('❌ Users Table Seed Error:', userError.message || userError);
      if (userError.details) console.error('Details:', userError.details);
      if (userError.hint) console.error('Hint:', userError.hint);
    } else {
      console.log('✅ Users table seeded successfully (3 test accounts created).');
    }

    // 2. Seed Projects
    const projects = [
      {
        id: 'b1b2c3d4-0001-4000-8000-000000000001',
        name: 'Enterprise Cloud Migration',
        description: 'Migrating legacy monolith architecture to microservices on AWS with Zero-Downtime deployment.',
        start_date: '2026-08-01',
        deadline: '2026-10-15',
        status: 'on_track',
        created_by: users[0].id
      },
      {
        id: 'b1b2c3d4-0002-4000-8000-000000000002',
        name: 'AI Deadline Analytics Engine',
        description: 'Backend prediction algorithms consuming GitHub commit velocity & historical sprint throughput.',
        start_date: '2026-08-01',
        deadline: '2026-09-30',
        status: 'delayed',
        created_by: users[0].id
      }
    ];

    const { data: projData, error: projError } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });

    if (projError) {
      console.error('❌ Projects Table Seed Error:', projError.message || projError);
    } else {
      console.log('✅ Projects table seeded successfully (2 active project sprints created).');
    }

    // 3. Seed Tasks
    const tasks = [
      {
        id: 'c1b2c3d4-0001-4000-8000-000000000001',
        project_id: projects[0].id,
        title: 'Configure Automated CI/CD Pipeline on GitHub Actions',
        description: 'Build workflow triggers on main branch push to run test suites and deploys to Staging.',
        assigned_to: users[2].id,
        status: 'completed',
        progress_percent: 100,
        priority: 'high',
        planned_start: '2026-08-01',
        planned_end: '2026-08-10'
      },
      {
        id: 'c1b2c3d4-0002-4000-8000-000000000002',
        project_id: projects[1].id,
        title: 'Train Historical Deadline Prediction Model',
        description: 'Train XGBoost regression model using historical pull request review duration and task story points.',
        assigned_to: users[1].id,
        status: 'blocked',
        progress_percent: 40,
        priority: 'high',
        planned_start: '2026-08-12',
        planned_end: '2026-09-05'
      }
    ];

    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .upsert(tasks, { onConflict: 'id' });

    if (taskError) {
      console.error('❌ Tasks Table Seed Error:', taskError.message || taskError);
    } else {
      console.log('✅ Tasks table seeded successfully.');
    }

    console.log('=================================================');
    console.log('🎉 Seed execution finished!');
    console.log('=================================================');
  } catch (err) {
    console.error('Unexpected Seed Error:', err);
  }
}

seedDatabase();
