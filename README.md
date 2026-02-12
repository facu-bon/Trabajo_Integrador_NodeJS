# API de Chat en Tiempo Real

API REST desarrollada con Node.js, Express y MongoDB para un sistema de mensajería privada entre usuarios.

## 📋 Tabla de Contenidos

- [Ambiente de Producción](#ambiente-de-producción-vercel)
- [Descripción de Endpoints](#descripción-de-endpoints)
- [Ejemplos de Requests y Responses](#ejemplos-de-requests-y-responses)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Variables de Entorno](#variables-de-entorno)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 🌐 Ambiente de Producción (Vercel)

El proyecto está desplegado en Vercel y accessible en:

**URL Base de la API:**
```
https://trabajo-integrador-node-js.vercel.app/api
```

**Dashboard de Vercel:**
```
https://vercel.com/facu-bons-projects/trabajo-integrador-node-js
```


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
