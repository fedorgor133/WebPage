import jwt from 'jsonwebtoken';
import HttpError from '../models/HttpError.js';
function userAuth(req, res, next) {
    const { access_token } = req.cookies;
    if (!access_token) {
        throw new HttpError(401, 'Access token not found');
    }
    try {
        const payload = jwt.verify(access_token, process.env.TOKEN_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        res.clearCookie('access_token');
        throw new HttpError(403, 'Invalid access token');
    }
}
export default userAuth;
