import app from './app.js';
import env from './config/env.js';

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 ProjectPulse REST API Backend Server Running`);
  console.log(`📡 Port: http://localhost:${PORT}`);
  console.log(`📖 Swagger Docs: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
