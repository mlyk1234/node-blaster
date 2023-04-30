const { spawn } = require('child_process');

const NUM_INSTANCES = 10; // change this to the desired number of instances
const BASE_PORT = 3001; // change this to the starting port number

for (let i = 0; i < NUM_INSTANCES; i++) {
  const port = BASE_PORT + i;
  const instance = spawn('node', ['index.js', '--port', port]);
  
  instance.stdout.on('data', (data) => {
    console.log(`Instance ${i} on port ${port}: ${data}`);
  });

  instance.stderr.on('data', (data) => {
    console.error(`Instance ${i} on port ${port}: ${data}`);
  });

  instance.on('close', (code) => {
    console.log(`Instance ${i} on port ${port} exited with code ${code}`);
  });
}
