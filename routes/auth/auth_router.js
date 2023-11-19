const express = require('express');
const router = express.Router();
const { User } = require('../../models');

const emoji = ['🩳','👚','🥼','🦺','👘','👙','🥻','🧥','🩱','🩲','👕','👖','👔','🎽','👗'] ;

router.post('/sign_in', async (req, res) => {
	const { email, password } = req.body;
	const options = {
		attributes: ['email', 'password'],
		where: [{ email: email }, { password: password }],
	};
	const result = await User.findOne(options);

	if (result) {
		res.send({
			success: true,
			data: '',
			message: '로그인 성공',
		});
	} else {
		res.send({ success: false, data: '', message: '사용자가 없거나 비번이 잘못되었습니다' });
	}
});

router.post('/sign_up', async (req, res) => {
	
	let new_user = req.body.data;
	const r = Math.floor (( Math.random() * 15 ));
	new_user.emoji=emoji[r];
	console.log('new_user', new_user);

	try {
		let result = await User.create(new_user);

		res.send({ success: true, data: result, message: '회원 가입 성공' });
	} catch (error) {
		res.send({ success: false, data: '', message: error });
	}
});

module.exports = router;
