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
			const email = decoded.email;
			const role = decoded.rol;
			req.email = email;
			req.role = role;
			console.log('req', req);
			next();
		}
	});
};

module.exports = isAuth;
