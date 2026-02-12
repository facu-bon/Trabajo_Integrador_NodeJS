import { buscarUsuarioPorId, buscarChatPorId } from "../repository/repository.js";


function messageMiddleware(req, res, next) {
  try {
    const { sender, chatId } = req.body;

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

export default messageMiddleware;