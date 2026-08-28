// Centralized realistic mock dataset for ProjectPulse standalone mode

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Enterprise Cloud Migration',
    description: 'Migrating legacy monolith architecture to microservices on AWS with Zero-Downtime deployment.',
    progress: 78,
    deadline: '2026-10-15',
    expectedCompletion: '2026-10-10',
    riskStatus: 'ON TRACK',
    bufferDays: 5,
    teamMembers: [
      { name: 'Sarah Jenkins', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { name: 'David Chen', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { name: 'Alex Rivera', role: 'Fullstack Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
    ],
    lastUpdated: '10 mins ago',
    githubRepo: 'projectpulse/cloud-migration-backend',
    commitsThisWeek: 42,
    openPrs: 3,
    blockedTasks: 0
  },
  {
    id: 'proj-2',
    name: 'AI Deadline Analytics Engine',
    description: 'Backend prediction algorithms consuming GitHub commit velocity & historical sprint throughput.',
    progress: 52,
    deadline: '2026-09-30',
    expectedCompletion: '2026-10-12',
    riskStatus: 'DELAYED',
    bufferDays: -12,
    teamMembers: [
      { name: 'Marcus Vance', role: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      { name: 'Elena Rostova', role: 'Backend Engineer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
    ],
    lastUpdated: '1 hour ago',
    githubRepo: 'projectpulse/predictive-engine',
    commitsThisWeek: 18,
    openPrs: 5,
    blockedTasks: 2
  },
  {
    id: 'proj-3',
    name: 'Mobile SDK & Cross-Platform Portal',
    description: 'React Native companion app for field engineering updates and push deadline alerts.',
    progress: 65,
    deadline: '2026-11-01',
    expectedCompletion: '2026-11-04',
    riskStatus: 'AT RISK',
    bufferDays: -3,
    teamMembers: [
      { name: 'Jessica Alba', role: 'UI/UX Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
      { name: 'Tom Hardy', role: 'Mobile Dev', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' }
    ],
    lastUpdated: '3 hours ago',
    githubRepo: 'projectpulse/mobile-client',
    commitsThisWeek: 29,
    openPrs: 2,
    blockedTasks: 1
  },
  {
    id: 'proj-4',
    name: 'Security Audit & OAuth2 Integration',
    description: 'SOC2 Compliance hardening, RBAC permissions, and SSO SAML authentication setup.',
    progress: 92,
    deadline: '2026-09-10',
    expectedCompletion: '2026-09-08',
    riskStatus: 'ON TRACK',
    bufferDays: 2,
    teamMembers: [
      { name: 'David Chen', role: 'Security Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    ],
    lastUpdated: 'Yesterday',
    githubRepo: 'projectpulse/auth-service',
    commitsThisWeek: 14,
    openPrs: 1,
    blockedTasks: 0
  }
];

export const MOCK_TASKS = [
  {
    id: 'task-101',
    title: 'Configure Automated CI/CD Pipeline on GitHub Actions',
    description: 'Build workflow triggers on main branch push to run test suites and deploys to Staging.',
    projectId: 'proj-1',
    projectName: 'Enterprise Cloud Migration',
    assignedTo: 'David Chen',
    assignedAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    status: 'COMPLETED',
    progress: 100,
    priority: 'High',
    plannedStart: '2026-08-01',
    plannedEnd: '2026-08-10',
    dependencies: [],
    commentsCount: 4
  },
  {
    id: 'task-102',
    title: 'Train Historical Deadline Prediction Model',
    description: 'Train XGBoost regression model using historical pull request review duration and task story points.',
    projectId: 'proj-2',
    projectName: 'AI Deadline Analytics Engine',
    assignedTo: 'Marcus Vance',
    assignedAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    status: 'BLOCKED',
    progress: 40,
    priority: 'High',
    plannedStart: '2026-08-12',
    plannedEnd: '2026-09-05',
    dependencies: ['Waiting on clean dataset export from PostgreSQL'],
    commentsCount: 7
  },
  {
    id: 'task-103',
    title: 'Design Dark Mode Dashboard UI Wireframes',
    description: 'Figma prototypes for role-based views (Admin, Team Leader, Employee) with dark theme.',
    projectId: 'proj-3',
    projectName: 'Mobile SDK & Cross-Platform Portal',
    assignedTo: 'Jessica Alba',
    assignedAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    status: 'IN PROGRESS',
    progress: 75,
    priority: 'Medium',
    plannedStart: '2026-08-15',
    plannedEnd: '2026-09-01',
    dependencies: [],
    commentsCount: 2
  },
  {
    id: 'task-104',
    title: 'Implement What-If Scenario Simulation Engine',
    description: 'Frontend comparison controls allowing managers to adjust team size and recalculate deadline impact.',
    projectId: 'proj-2',
    projectName: 'AI Deadline Analytics Engine',
    assignedTo: 'Elena Rostova',
    assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    status: 'IN PROGRESS',
    progress: 60,
    priority: 'High',
    plannedStart: '2026-08-20',
    plannedEnd: '2026-09-12',
    dependencies: ['task-102'],
    commentsCount: 5
  },
  {
    id: 'task-105',
    title: 'PostgreSQL Database Indexing Optimization',
    description: 'Add composite indexes on project_id and timestamp columns to improve analytics queries.',
    projectId: 'proj-1',
    projectName: 'Enterprise Cloud Migration',
    assignedTo: 'Alex Rivera',
    assignedAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    status: 'NOT STARTED',
    progress: 0,
    priority: 'Low',
    plannedStart: '2026-09-01',
    plannedEnd: '2026-09-10',
    dependencies: [],
    commentsCount: 0
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'Risk Change',
    title: 'Risk Status Updated',
    message: 'AI Deadline Analytics Engine risk status changed from AT RISK to DELAYED by backend predictor.',
    timestamp: '15 minutes ago',
    read: false,
    projectId: 'proj-2'
  },
  {
    id: 'notif-2',
    type: 'Blocker',
    title: 'New Task Blocker Reported',
    message: 'Marcus Vance marked "Train Historical Model" as BLOCKED: Waiting on DB dump.',
    timestamp: '1 hour ago',
    read: false,
    projectId: 'proj-2'
  },
  {
    id: 'notif-3',
    type: 'Assignment',
    title: 'New Task Assigned',
    message: 'You were assigned to "PostgreSQL Database Indexing Optimization".',
    timestamp: '3 hours ago',
    read: true,
    projectId: 'proj-1'
  },
  {
    id: 'notif-4',
    type: 'Deadline Reminder',
    title: 'Upcoming Sprint Deadline',
    message: 'Enterprise Cloud Migration milestone is due in 10 days.',
    timestamp: '1 day ago',
    read: true,
    projectId: 'proj-1'
  }
];

export const MOCK_PREDICTIONS = {
  projectId: 'proj-2',
  projectName: 'AI Deadline Analytics Engine',
  targetDeadline: '2026-09-30',
  expectedCompletion: '2026-10-12',
  riskStatus: 'DELAYED',
  currentProgress: 52,
  remainingWork: 48,
  confidenceScore: 89,
  reasons: [
    { title: 'Blocker Delay Impact', desc: 'Task #102 "Train Historical Model" is blocked, creating a +7 day downstream bottleneck.', severity: 'High' },
    { title: 'Velocity Slowdown', desc: 'GitHub commit rate dropped 28% below historical sprint baseline over the last 14 days.', severity: 'Medium' },
    { title: 'Resource Allocation', desc: 'Only 2 engineers assigned compared to 4 planned for the core modeling sprint phase.', severity: 'High' }
  ],
  historicalTrend: [
    { date: 'Aug 01', deadline: 30, expected: 28 },
    { date: 'Aug 07', deadline: 30, expected: 29 },
    { date: 'Aug 14', deadline: 30, expected: 31 },
    { date: 'Aug 21', deadline: 30, expected: 35 },
    { date: 'Aug 27', deadline: 30, expected: 42 }
  ]
};

export const MOCK_GITHUB_ACTIVITY = {
  syncStatus: 'SYNCHRONIZED',
  lastSyncTime: '5 minutes ago',
  totalCommits: 312,
  totalPRs: 24,
  openIssues: 8,
  activeContributors: 6,
  recentCommits: [
    { id: 'c101', message: 'fix(prediction): optimize regression risk calculation query', author: 'Elena Rostova', time: '12 mins ago', hash: '8f92a11', repo: 'predictive-engine' },
    { id: 'c102', message: 'feat(github-sync): add webhook listener for PR merge events', author: 'Alex Rivera', time: '45 mins ago', hash: '3e41b90', repo: 'cloud-migration-backend' },
    { id: 'c103', message: 'docs(api): update Swagger definitions for what-if endpoint', author: 'Sarah Jenkins', time: '2 hours ago', hash: '7c12d44', repo: 'cloud-migration-backend' },
    { id: 'c104', message: 'refactor(ui): update Framer Motion page transition variants', author: 'Jessica Alba', time: '4 hours ago', hash: '1a98c23', repo: 'mobile-client' }
  ],
  weeklyTrends: [
    { day: 'Mon', commits: 14, prs: 2 },
    { day: 'Tue', commits: 22, prs: 4 },
    { day: 'Wed', commits: 35, prs: 6 },
    { day: 'Thu', commits: 28, prs: 3 },
    { day: 'Fri', commits: 19, prs: 5 },
    { day: 'Sat', commits: 6, prs: 0 },
    { day: 'Sun', commits: 4, prs: 1 }
  ]
};
