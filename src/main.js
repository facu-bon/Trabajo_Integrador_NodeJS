import connectDB from "./config/connectionDB.js";
import express from "express";
import ENVIRONMENT from "./config/environment.js";
import chatsRouter from "./routes/chats.route.js";
import messagesRouter from "./routes/messages.route.js";
import authRouter from "./routes/auth.route.js";
import authorizationMiddleware from "./middlewares/authorizationMiddleware.js";
import userRouter from "./routes/user.route.js";
import { messageMiddleware } from "./middlewares/messageMiddleware.js";

connectDB();

const app = express();

app.use(express.json());

app.use('/api/chats', chatsRouter)
app.use('/api/messages', messageMiddleware, messagesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get("/test", authorizationMiddleware, (req, res) => {
  res.json(
    {
      ok: true,
      status: 200,
      message: 'Servidor funcionando correctamente',
      user: req.user
    }
  )
})


app.listen(ENVIRONMENT.PORT, () => console.log("Servidor escuchando en el puerto " + ENVIRONMENT.PORT))




//Endpoint de usuarios

//relacionar mensajes con chats y usuarios