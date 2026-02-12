import ENVIRONMENT from "../config/environment.js";
import { buscarUsuarioPorEmail, createUser} from "../repository/repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(req, res) {
	try {
		const { email, password } = req.body;
		const existingUser = await buscarUsuarioPorEmail(email);
		if (existingUser) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: 'El usuario ya existe',
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser(email, hashedPassword);
		return res.status(201).json({
			ok: true,
			status: 201,
			message: 'Usuario creado correctamente',
			data: {
				user
			}
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			message: 'Error al crear el usuario',
			error: error.message
		});
	}

}

export async function loginUser(req, res) {
	const { email, password } = req.body;
	const user_found = await buscarUsuarioPorEmail(email);
	if (!user_found) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: 'Usuario no encontrado',
		});
	}
	const passwordMatch = await bcrypt.compare(password, user_found.password);
	if (!passwordMatch) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: 'Contraseña incorrecta',
		});
	}
	const authToken = jwt.sign({
		email,
		userId: user_found._id,
		createdAt: user_found.createdAt
	},
		ENVIRONMENT.JWT_SECRET);
	return res.status(200).json({
		ok: true,
		status: 200,
		message: 'Login exitoso',
		data: {
			authToken,
			userId: user_found._id
		}
	});



}


