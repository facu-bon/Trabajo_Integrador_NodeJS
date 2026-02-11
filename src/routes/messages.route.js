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
      const { content, sender } = req.body;
      const { chatId } = req.params;
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
      console.log(content);
      const { id } = req.params;
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