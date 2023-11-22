const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

const isAuth = async (req, res, next) => {
	const auth = req.get('Authorization');
	if (!(auth && auth.startsWith('Bearer'))) {
		return res.send({ message: 'Auth error' });
	}

	const token = auth.split(' ')[1];
	jwt.verify(token, secret, (error, decoded) => {
		if (error) {
			return res.send({ message: 'Auth error' });
		} else {
			const user_id = decoded.user_id;
			req.user_id = user_id;
			next();
		}
	});
};

module.exports = isAuth;
