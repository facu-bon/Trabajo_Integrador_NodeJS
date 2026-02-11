import { buscarUsuarioPorId, buscarChatPorId } from "../repository/repository.js";


export function messageMiddleware(req, res, next) {
  try {
    const { content, sender, chatId } = req.body;

    if (!content || !sender || !chatId) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: 'Los campos content, sender y chatId son obligatorios',
      });
    }
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
        message: 'El Id es obligatorio',
      });
    }
    next();

  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error en el servidor',
      error: error.message
    });
  }
}