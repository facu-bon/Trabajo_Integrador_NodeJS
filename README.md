# API de Chat en Tiempo Real

API REST desarrollada con Node.js, Express y MongoDB para un sistema de mensajería privada entre usuarios.

## 📋 Tabla de Contenidos

- [Ambiente de Producción](#ambiente-de-producción-vercel)
- [Descripción de Endpoints](#descripción-de-endpoints)
- [Ejemplos de Requests y Responses](#ejemplos-de-requests-y-responses)
- [Conexión con Frontend](#conexión-con-frontend)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Variables de Entorno](#variables-de-entorno)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Notas Importantes](#notas-importantes)

---

## 🌐 Ambiente de Producción (Vercel)

El proyecto está desplegado en Vercel y accessible en:

**URL Base:**
```
https://trabajo-integrador-node-js.vercel.app/api
```

**Dashboard de Vercel:**
```
https://vercel.com/facu-bons-projects/trabajo-integrador-node-js
```

---

## 📡 Descripción de Endpoints

### Base URL

```
https://trabajo-integrador-node-js.vercel.app/api
```

### 1️⃣ Autenticación (`/auth`)

#### Registro de Usuario
- **Endpoint:** `POST /auth/register`
- **Descripción:** Crea un nuevo usuario con email y contraseña
- **Body:**
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña123"
  }
  ```
- **Response (201):**
  ```json
  {
    "ok": true,
    "status": 201,
    "message": "Usuario creado correctamente",
    "data": {
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "email": "usuario@example.com",
        "password": "hash_bcrypted",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    }
  }
  ```

#### Login de Usuario
- **Endpoint:** `POST /auth/login`
- **Descripción:** Autentica un usuario y devuelve un token JWT
- **Body:**
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña123"
  }
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Login exitoso",
    "data": {
      "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "userId": "507f1f77bcf86cd799439011"
    }
  }
  ```

---

### 2️⃣ Usuarios (`/users`)

#### Listar Todos los Usuarios
- **Endpoint:** `GET /users/`
- **Descripción:** Obtiene la lista de todos los usuarios registrados
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "email": "usuario1@example.com",
        "createdAt": "2024-01-10T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "email": "usuario2@example.com",
        "createdAt": "2024-01-12T15:45:00.000Z"
      }
    ]
  }
  ```

#### Obtener Detalles de un Usuario
- **Endpoint:** `GET /users/:userId`
- **Descripción:** Obtiene la información de un usuario específico
- **Parámetros:**
  ```
  userId: ID del usuario (ObjectId de MongoDB)
  ```
- **Response (200):**
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com",
    "createdAt": "2024-01-10T10:30:00.000Z"
  }
  ```

#### Eliminar Usuario
- **Endpoint:** `DELETE /users/:userId`
- **Descripción:** Elimina un usuario del sistema
- **Parámetros:**
  ```
  userId: ID del usuario
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Usuario eliminado correctamente"
  }
  ```

---

### 3️⃣ Chats (`/chats`)

#### Crear un Chat
- **Endpoint:** `POST /chats/`
- **Descripción:** Crea un chat privado entre dos usuarios
- **Body:**
  ```json
  {
    "user_id_1": "507f1f77bcf86cd799439011",
    "user_id_2": "507f1f77bcf86cd799439012"
  }
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Chat creado correctamente",
    "data": {
      "newChat": {
        "_id": "507f1f77bcf86cd799439020",
        "user_id_1": "507f1f77bcf86cd799439011",
        "user_id_2": "507f1f77bcf86cd799439012",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    }
  }
  ```

#### Obtener Mensajes de un Chat
- **Endpoint:** `GET /chats/:chatId`
- **Descripción:** Obtiene todos los mensajes de un chat específico
- **Parámetros:**
  ```
  chatId: ID del chat
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Mensajes obtenidos correctamente",
    "data": {
      "messages": [
        {
          "_id": "507f1f77bcf86cd799439030",
          "content": "Hola, ¿cómo estás?",
          "sender": "507f1f77bcf86cd799439011",
          "chatId": "507f1f77bcf86cd799439020",
          "createdAt": "2024-01-15T10:35:00.000Z"
        },
        {
          "_id": "507f1f77bcf86cd799439031",
          "content": "Bien, gracias por preguntar",
          "sender": "507f1f77bcf86cd799439012",
          "chatId": "507f1f77bcf86cd799439020",
          "createdAt": "2024-01-15T10:36:00.000Z"
        }
      ]
    }
  }
  ```

#### Eliminar un Chat
- **Endpoint:** `DELETE /chats/:chatId`
- **Descripción:** Elimina un chat y todos sus mensajes asociados
- **Parámetros:**
  ```
  chatId: ID del chat
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Chat eliminado correctamente",
    "data": {
      "chatId": "507f1f77bcf86cd799439020"
    }
  }
  ```

---

### 4️⃣ Mensajes (`/messages`)

#### Listar Todos los Mensajes
- **Endpoint:** `GET /messages/`
- **Descripción:** Obtiene todos los mensajes del sistema
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Mensajes obtenidos correctamente",
    "data": {
      "messages": [
        {
          "_id": "507f1f77bcf86cd799439030",
          "content": "Hola, ¿cómo estás?",
          "sender": "507f1f77bcf86cd799439011",
          "chatId": "507f1f77bcf86cd799439020",
          "createdAt": "2024-01-15T10:35:00.000Z"
        }
      ]
    }
  }
  ```

#### Crear un Mensaje
- **Endpoint:** `POST /messages/:chatId`
- **Descripción:** Crea un nuevo mensaje en un chat específico
- **Parámetros:**
  ```
  chatId: ID del chat
  ```
- **Body:**
  ```json
  {
    "content": "Este es mi mensaje",
    "sender": "507f1f77bcf86cd799439011",
    "chatId": "507f1f77bcf86cd799439020"
  }
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Mensaje creado correctamente",
    "data": {
      "newMessage": {
        "_id": "507f1f77bcf86cd799439032",
        "content": "Este es mi mensaje",
        "sender": "507f1f77bcf86cd799439011",
        "chatId": "507f1f77bcf86cd799439020",
        "createdAt": "2024-01-15T10:40:00.000Z"
      }
    }
  }
  ```

#### Actualizar un Mensaje
- **Endpoint:** `PUT /messages/:id`
- **Descripción:** Actualiza el contenido de un mensaje existente
- **Parámetros:**
  ```
  id: ID del mensaje
  ```
- **Body:**
  ```json
  {
    "content": "Mensaje actualizado"
  }
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Mensaje actualizado correctamente",
    "data": {
      "id": "507f1f77bcf86cd799439032",
      "updatedMessage": {
        "_id": "507f1f77bcf86cd799439032",
        "content": "Mensaje actualizado",
        "sender": "507f1f77bcf86cd799439011",
        "chatId": "507f1f77bcf86cd799439020",
        "createdAt": "2024-01-15T10:40:00.000Z",
        "updatedAt": "2024-01-15T10:45:00.000Z"
      }
    }
  }
  ```

#### Eliminar un Mensaje
- **Endpoint:** `DELETE /messages/:id`
- **Descripción:** Elimina un mensaje de un chat
- **Parámetros:**
  ```
  id: ID del mensaje
  ```
- **Response (200):**
  ```json
  {
    "ok": true,
    "status": 200,
    "message": "Mensaje eliminado correctamente",
    "data": {
      "deletedMessage": {
        "_id": "507f1f77bcf86cd799439032"
      }
    }
  }
  ```

---

## 💬 Ejemplos de Requests y Responses

### Flujo Completo de Ejemplo

#### 1. Registrar un usuario

**Request:**
```bash
curl -X POST https://trabajo-integrador-node-js.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "password456"
  }'
```

---

#### 2. Login de Usuario

**Request:**
```bash
curl -X POST https://trabajo-integrador-node-js.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

---

#### 3. Crear un Chat

**Request:**
```bash
curl -X POST https://trabajo-integrador-node-js.vercel.app/api/chats \
  -H "Content-Type: application/json" \
  -d '{
    "user_id_1": "65a5e7f8c1234567890abcde",
    "user_id_2": "65a5e7f8c1234567890abcdf"
  }'
```

---

#### 4. Crear un Mensaje

**Request:**
```bash
curl -X POST https://trabajo-integrador-node-js.vercel.app/api/messages/65a5e800c1234567890abce0 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "¡Hola! ¿Cómo estás?",
    "sender": "65a5e7f8c1234567890abcde",
    "chatId": "65a5e800c1234567890abce0"
  }'
```

---

#### 5. Obtener Mensajes del Chat

**Request:**
```bash
curl -X GET https://trabajo-integrador-node-js.vercel.app/api/chats/65a5e800c1234567890abce0 \
  -H "Content-Type: application/json"
```

---

## 🌐 Conexión con Frontend

### Configuración Base de la API

Crear un archivo de configuración para las llamadas a la API:

**archivo: `src/services/api.js` (ejemplo para React)**

```javascript
const API_BASE_URL = 'https://trabajo-integrador-node-js.vercel.app/api';

// Función para obtener el token del localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Función auxiliar para hacer requests
async function makeRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Agregar token si existe
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error en la solicitud');
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Exportar funciones de la API
export const authAPI = {
  register: (email, password) => 
    makeRequest('/auth/register', 'POST', { email, password }),
  
  login: (email, password) => 
    makeRequest('/auth/login', 'POST', { email, password }),
};

export const usersAPI = {
  listUsers: () => makeRequest('/users'),
  
  getUserDetail: (userId) => makeRequest(`/users/${userId}`),
  
  deleteUser: (userId) => makeRequest(`/users/${userId}`, 'DELETE'),
};

export const chatsAPI = {
  createChat: (user_id_1, user_id_2) => 
    makeRequest('/chats', 'POST', { user_id_1, user_id_2 }),
  
  getMessages: (chatId) => makeRequest(`/chats/${chatId}`),
  
  deleteChat: (chatId) => makeRequest(`/chats/${chatId}`, 'DELETE'),
};

export const messagesAPI = {
  getAllMessages: () => makeRequest('/messages'),
  
  createMessage: (chatId, content, sender) => 
    makeRequest(`/messages/${chatId}`, 'POST', { content, sender, chatId }),
  
  updateMessage: (messageId, content) => 
    makeRequest(`/messages/${messageId}`, 'PUT', { content }),
  
  deleteMessage: (messageId) => 
    makeRequest(`/messages/${messageId}`, 'DELETE'),
};
```

---

### Ejemplo de Uso en un Componente React

**archivo: `src/components/LoginComponent.jsx`**

```javascript
import { useState } from 'react';
import { authAPI } from '../services/api';

export function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);
      
      // Guardar token en localStorage
      localStorage.setItem('authToken', response.data.authToken);
      localStorage.setItem('userId', response.data.userId);
      
      console.log('Login exitoso:', response.data);
      // Redirigir a la página principal
      // navigate('/chats');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
```

---

### Ejemplo de Consumo de Chats y Mensajes

**archivo: `src/components/ChatComponent.jsx`**

```javascript
import { useState, useEffect } from 'react';
import { chatsAPI, messagesAPI } from '../services/api';

export function ChatComponent({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener mensajes al cargar el componente
  useEffect(() => {
    loadMessages();
  }, [chatId]);

  const loadMessages = async () => {
    try {
      const response = await chatsAPI.getMessages(chatId);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await messagesAPI.createMessage(
        chatId,
        newMessage,
        userId
      );
      
      // Agregar el nuevo mensaje a la lista
      setMessages([...messages, response.data.newMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg) => (
          <div key={msg._id} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}:</strong> {msg.content}
            <small> ({new Date(msg.createdAt).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} style={{ marginTop: '10px' }}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          rows="3"
          style={{ width: '100%' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
```

---

### Usar Axios (Alternativa)

Si prefires usar `axios` en lugar de fetch:

```bash
npm install axios
```

**archivo: `src/services/axiosClient.js`**

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://trabajo-integrador-node-js.vercel.app/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en cada solicitud
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
```

**Uso:**
```javascript
import axiosClient from '../services/axiosClient';

// Login
const login = async (email, password) => {
  const response = await axiosClient.post('/auth/login', { email, password });
  return response.data;
};

// Obtener chats
const getChat = async (chatId) => {
  const response = await axiosClient.get(`/chats/${chatId}`);
  return response.data;
};
```

---

## � Despliegue en Vercel

### Configuración en Vercel

1. **Conectar repositorio**
   - Ir a [Vercel](https://vercel.com)
   - Seleccionar el repositorio de GitHub
   - Importar el proyecto

2. **Configurar variables de entorno en Vercel**
   - En el dashboard de Vercel, ir a **Settings → Environment Variables**
   - Agregar las siguientes variables:
     ```
     MONGO_DB_CONNECTION_STRING=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-db
     JWT_SECRET=tu_secreto_muy_seguro_y_largo_aqui
     ```

3. **Despliegue automático**
   - Vercel automáticamente desplegará cada push a la rama main
   - El proyecto estará disponible en: `https://trabajo-integrador-node-js.vercel.app`

### URL del Proyecto en Vercel
```
https://trabajo-integrador-node-js.vercel.app
```

### Testing en Producción

Una vez desplegado, prueba los endpoints con:

```bash
# Test del servidor
curl https://trabajo-integrador-node-js.vercel.app/test

# Login
curl -X POST https://trabajo-integrador-node-js.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"password123"}'
```

---

## 📝 Variables de Entorno

Las variables de entorno se configuran en el dashboard de Vercel bajo:
**Settings → Environment Variables**

```env
# Base de Datos
MONGO_DB_CONNECTION_STRING=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-db

# JWT Secret (usa una cadena segura)
JWT_SECRET=tu_secreto_muy_seguro_y_largo_aqui
```

---

## �🛠 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación con tokens
- **bcrypt**: Encriptación de contraseñas
- **dotenv**: Gestión de variables de entorno

---


## 🤝 Notas Importantes

- **Autenticación**: La mayoría de los endpoints requieren autenticación con JWT en el header `Authorization: Bearer <token>`
- **CORS**: Si usas un frontend en un dominio diferente, asegúrate de configurar CORS en Express
- **Validación**: Implementa validación adicional en el frontend para inputs de usuarios
- **Errores**: Todos los endpoints devuelven un objeto con propiedades `ok`, `status`, `message` y `data`

---

## 📞 Soporte

Para preguntas o problemas, revisa la documentación de las tecnologías utilizadas:
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
