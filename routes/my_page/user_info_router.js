/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const isAuth = require('../auth/authorization');

const mock_response = {
	email: 'tony@email.com',
	nick_name: '기부천사',
	phone: '01012345678',
	addr: '서울특별시 금천구 독산로50길 23',
	detail_addr: '본관 1층',
};

router.get('/user-info', isAuth, async (req, res) => {
	try {
		const options = {
			attributes: ['id', 'email', 'nick_name', 'phone', 'addr', 'addr_detail', 'emoji'],
			where: { id: req.user_id },
		};

		const result = await User.findOne(options);

		if (!result) {
			return res.status(404).send({
				success: true,
				data: '',
				message: `${req.user_id}에 일치하는 사용자가 존재하지 않습니다.`,
			});
		}
		return res.status(200).send({
			success: true,
			data: result,
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.put('/user-info', isAuth, async (req, res) => {
	try {
		const options = { where: { id: req.user_id } };

		const result = await User.update(req.body, options);
		req.body.password = null;

		if (!result) {
			return res.status(404).send({
				success: false,
				data: '',
				message: `${req.user_id}에 일치하는 사용자가 존재하지 않습니다.`,
			});
		}
		return res.status(200).send({
			success: true,
			data: req.body,
			message: '수정 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
