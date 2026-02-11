// aca va el CRUD
import { messageModel } from "../models/message.model.js";
import { chatModel } from "../models/chat.model.js";
import { userModel } from "../models/user.model.js";

//Mensajes
export async function createMessage(content, sender, chatId) {
  try {
    const newMessage = await messageModel.create({ content, sender, chat: chatId });
    await chatModel.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });
    return newMessage;
  } catch (error) {
    console.error("Error al crear el mensaje", error.message);
    throw error;
  }
}

export async function getMessages() {
  try {
    const messages = await messageModel.find();
    return messages;
  } catch (error) {
    console.log("Error al obtener los mensajes", error);
  }
}

export async function updateMessage(id, content) {
  try {
    const updatedMessage = await messageModel.findByIdAndUpdate(id, { content: content }, { new: true });
    
    return updatedMessage;
  } catch (error) {
    console.log("Error al actualizar el mensaje", error);
  }
  
  
}

export async function deleteMessage(id) {
  try {
    await messageModel.findByIdAndDelete(id);
    return "Mensaje eliminado";
  } catch (error) {
    console.log("Error al eliminar el mensaje", error);
  }
}

//Chats
export async function createChat(name, members) {
  try {
    const newChat = await chatModel.create({ name, members });
    return newChat;
  } catch (error) {
    console.error("Error al crear el chat", error.message);
    throw error;
  }
}

export async function getMessagesByChatId(chatId) {
  try {
    const messages = await messageModel.find({ chat: chatId });
    return messages;
  } catch (error) {
    console.log("Error al obtener los mensajes por chatId", error);
  }
}

export async function deleteMessagesbychatId(chatId) {
  try {
    await messageModel.deleteMany({ chat: chatId });
    await chatModel.findByIdAndDelete(chatId);
    return "Mensajes eliminados";
  } catch (error) {
    console.log("Error al eliminar los mensajes por chatId", error);
  }
}

//Usuarios

export async function createUser(email, password) {
  const user = await userModel.create({ email, password });
  return user;
}

export async function buscarUsuarioPorEmail(email) {
  const user = await userModel.findOne({ email });
  return user;
}

export async function buscarUsuarioPorId(id) {
  const user = await userModel.findById(id);
  return user;
}