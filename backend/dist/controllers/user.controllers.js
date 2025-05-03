import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginSchema, SignupSchema } from '../schemas/userSchemas';
import ValidationError from '../models/ValidationError';
import userModel from '../models/user.model';
import { welcomeEmail } from '../emails/welcomeEmail';
import HttpError from '../models/HttpError';
async function signup(req, res) {
    const user = req.body;
    // Validamos usuario
    const { success, data: newUser, error } = SignupSchema.safeParse(user);
    if (!success) {
        throw new ValidationError(error);
    }
    // Como sabemos que ha ido bien, ahora ya podemos encriptar la contraseña
    const saltNumber = 10;
    const encriptedPassword = await bcrypt.hash(newUser.password, saltNumber);
    // cambiar contraseña plana por encriptada
    newUser.password = encriptedPassword;
    // Antes de guardar genero un código de validación para verificar el email
    const validationCode = crypto.randomUUID();
    const userWithValidationCode = { ...newUser, validationCode };
    const userDB = await userModel.addOneUser(userWithValidationCode);
    //* Enviar un email de bienvenida
    await welcomeEmail(userWithValidationCode);
    res.status(201).send(userDB);
}
async function login(req, res) {
    const user = req.body;
    // Validamos usuario
    const { success, data: loggedUser, error } = LoginSchema.safeParse(user);
    if (!success) {
        throw new ValidationError(error);
    }
    const userDB = await userModel.getUserByEmail(loggedUser.email);
    if (!userDB) {
        throw new HttpError(404, 'Email or password incorrect');
    }
    // Ya sabemos quue el usuario existe ahora hay que comprobar que la contraseña que me pases sea correcta
    const isPasswordCorrect = await bcrypt.compare(loggedUser.password, userDB.password);
    if (!isPasswordCorrect) {
        throw new HttpError(404, 'Email or password incorrect');
    }
    const userToSend = {
        id: userDB.id,
        name: userDB.name,
        role: userDB.role,
    };
    const token = jwt.sign(userToSend, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
    });
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
    });
    res.send(userToSend);
}
async function confirmToken(req, res) {
    res.send(req.user);
}
const userController = {
    signup,
    login,
    confirmToken,
};
export default userController;
