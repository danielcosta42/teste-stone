import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token not provided' });

  const token = authHeader;

  try {
    const decoded = await promisify(jwt.verify)(token, 'mySecret');

    const user = decoded.dataValues;

    if (!user.name == 'admin') {
      return res.status(401).json({ error: 'Token invalid' });
    }

    req.user = decoded.dataValues;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
