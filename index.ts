import { startServer } from './serverLauncher';

const PORT = 3000; // Set the port number as needed

startServer(PORT)
    .catch((error) => {
        console.error('Error starting the server:', error);
    });


