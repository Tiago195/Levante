const app = require("./app");
const http = require("http").createServer(app);
require("dotenv").config();

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000", // url aceita pelo cors
    methods: ["GET", "POST"], // Métodos aceitos pela url
  },
});

io.on("connection", (socket) => {
  socket.on("requestReservation", () => {
    console.log(`🔥🔥🔥🔥 Client Id: ${socket.id} deseja fazer uma reserva`);
    io.emit("newReservation");
  });
});

const PORT = process.env.PORT ?? "3001";

http.listen(PORT, () => console.log(`Ouvindo na porta: ${PORT} 🦆`));