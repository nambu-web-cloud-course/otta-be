const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const saltRound = 10;

// const emoji = [
// 	'🩳',
// 	'👚',
// 	'🥼',
// 	'🦺',
// 	'👘',
// 	'👙',
// 	'🥻',
// 	'🧥',
// 	'🩱',
// 	'🩲',
// 	'👕',
// 	'👖',
// 	'👔',
// 	'🎽',
// 	'👗',
// ];

router.post('/sign_in', async (req, res) => {
	console.log('start');
	const { email, password } = req.body;
	console.log(req.body);
	const options = {
		attributes: ['email', 'password'],
		where: [{ email: email }],
	};
	const result = await User.findOne(options);
	if (result) {
		if (await bcrypt.compare(password, result.password)) {
			const token = jwt.sign({ email: email, lvl: 3, rol: 'admin' }, secret, { expiresIn: 10000 });
			console.log(`token ===== ${token}`);
			res.send({
				success: true,
				email: email,
				token: token,
				message: '로그인 성공',
			});
		} else {
			res.send({ success: false, data: '', message: '비밀번호가 잘못되었습니다' });
		}
	} else {
		res.send({ success: false, data: '', message: '없는 사용자입니다' });
	}
});

router.post('/sign_up', async (req, res) => {
	const new_user = req.body;

	let options = {
		attributes: ['email'],
		where: [{ email: new_user.email }],
	};
	console.log(new_user.email);
	const result = await User.findOne(options);
	console.log(result);
	if (result) {
		return res.send({ success: false, data: 'email', message: '사용중인 email입니다' });
	} else {
		const hashed = await bcrypt.hash(new_user.password, saltRound);
		console.log(hashed);
		new_user.password = hashed;
		new_user.emoji = Math.floor(Math.random() * 15);
		console.log('new_user', new_user);

		try {
			const result = await User.create(new_user);

			res.send({ success: true, data: result, message: '회원 가입 성공' });
		} catch (error) {
			res.send({ success: false, data: new_user, message: error });
		}
	}
});

module.exports = router;
