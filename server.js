 import app from './app.js'
import { connectDb , pool } from './src/config/db.js'
import http from 'http'
import { initSocket } from './src/config/socket.js'



const PORT = process.env.PORT || 5000
connectDb()

const server = http.createServer(app)


// initialize socket
initSocket(server)


server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
})