import express from "express"
import { createChat, deleteMessagesbychatId, getChats, getMessagesByChatId } from "../repository/repository.js";


const chatsRouter = express.Router();

chatsRouter.post(
  '/',
  async (req, res) => {
    try {
      const { user_id_1, user_id_2 } = req.body;
      const newChat = await createChat(user_id_1, user_id_2);
      
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Chat creado correctamente',
          data: {
            newChat
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al crear el chat',
        error: error.message
      })
    }
  }
)

chatsRouter.delete(
  '/:chatId',
  async (req, res) => {
    try {
      const { chatId } = req.params;
      await deleteMessagesbychatId(chatId);
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Chat eliminado correctamente',
          data: {
            chatId
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al eliminar el chat',
        error: error.message
      })
    }
  }
)
//obtener todo los chats
chatsRouter.get(
  '/',
  async (req, res) => {
    try {
      const chats = await getChats();
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Chats obtenidos correctamente',
          data: {
            chats
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al obtener los chats',
        error: error.message
      })
    }
  }
)

chatsRouter.get(
  '/:chatid',
  async (req, res) => {
    try {
      const { chatid } = req.params;
      const messages = await getMessagesByChatId(chatid);
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Mensajes obtenidos correctamente',
          data: {
            messages
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al obtener los mensajes',
        error: error.message
      })
    }
  }
)

export default chatsRouter;