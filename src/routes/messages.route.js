import express from "express";
import { createMessage, getMessages, updateMessage, deleteMessage } from "../repository/repository.js";

const messagesRouter = express.Router();

messagesRouter.get("/",
  async (req, res) => {
    const messages = await getMessages();
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
  }
);
messagesRouter.post('/:chatId', 
  async (req, res) => {
    try {
      const { chatId } = req.params;
      const { content, sender } = req.body;
      const user = buscarUsuarioPorId(sender);
      if (!user) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: 'El usuario no existe',
        });
      }
      const chat = buscarChatPorId(chatId);
      if (!chat) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: 'El chat no existe',
        });
      }
      const newMessage = await createMessage(content, sender, chatId);
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Mensaje creado correctamente',
          data: {
            newMessage
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al crear el mensaje',
        error: error.message
      })
    }
  }
)
messagesRouter.put("/:id",
  async (req, res) => {
    try {
      const { content } = req.body;
      const { id } = req.params;
      if (await messageModel.findById(id) === null) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: 'Mensaje no encontrado',
        });
      }
      const updatedMessage = await updateMessage(id, content);
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Mensaje actualizado correctamente',
          data: {
            id,
            updatedMessage
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al actualizar el mensaje',
        error: error.message
      })
    }
  }
);
messagesRouter.delete("/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      if (await messageModel.findById(id) === null) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: 'Mensaje no encontrado',
        });
      }
      const deletedMessage = await deleteMessage(id);
      res.json(
        {
          ok: true,
          status: 200,
          message: 'Mensaje eliminado correctamente',
          data: {
            deletedMessage
          }
        }
      )
    } catch (error) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Error al eliminar el mensaje',
        error: error.message
      })
    }
  }
);


export default messagesRouter;