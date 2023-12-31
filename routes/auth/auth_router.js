const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const saltRound = 10;

const emoji = [
	'shorts',
	'blouse',
	'gown',
	'safevest',
	'jumpsuit',
	'bikini',
	'onepiece',
	'jacket',
	'swimsuit',
	'briefs',
	'tshirt',
	'jeans',
	'necktie',
	'sleeveless',
	'dress',
];

router.post('/sign_in', async (req, res) => {
	const { email, password } = req.body;
	const options = {
		attributes: ['id', 'password', 'nick_name'],
		where: [{ email: email }],
	};
	const result = await User.findOne(options);
	if (result) {
		if (await bcrypt.compare(password, result.password)) {
			const token = jwt.sign({ user_id: result.id }, secret, { expiresIn: 60 * 60 * 24 });
			res.send({
				success: true,
				nick_name: result.nick_name,
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
	const result = await User.findOne(options);
	if (result) {
		return res.send({ success: false, data: result, message: '사용중인 email입니다' });
	} else {
		const hashed = await bcrypt.hash(new_user.password, saltRound);
		new_user.password = hashed;
		new_user.emoji = emoji[Math.floor(Math.random() * 15)];

		try {
			const result = await User.create(new_user);

			res.send({ success: true, data: result, message: '회원 가입 성공' });
		} catch (error) {
			res.send({ success: false, data: new_user, message: '회원 가입에 실패하였습니다' });
		}
	}
});

module.exports = router;
