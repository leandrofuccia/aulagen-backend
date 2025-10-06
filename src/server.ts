import { app } from './app';
import { initializeDatabase } from './lib/typeorm/typeorm';
import { env } from './env'; 
async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database initialized.');

    const port = env.PORT || 3001;
    const host = "0.0.0.0"; 

    app.listen({ host: host, port: port }, (err, address) => {
      if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
      }
      console.log(`Server is running on ${address}`);
    });
  } catch (error) {
    console.error('Error initializing the server:', error);
    process.exit(1);
  }
}

startServer();
