/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../../models');

const mock_post_list_response = [
	{
		id: 1,
		title: '따뜻한 모직 코트 나눔 1',
	},
	{
		id: 2,
		title: '따뜻한 모직 코트 나눔 2',
	},
	{
		id: 3,
		title: '따뜻한 모직 코트 나눔 3',
	},
	{
		id: 4,
		title: '따뜻한 모직 코트 나눔 4',
	},
];

router.get('/', async (req, res) => {
	//TODO: authorization
	req.user_id = '1';
	try {
		const options = {
			attributes: ['id', 'title'],
			where: { user_id: req.user_id },
		};

		const result = await Post.findAll(options);

		if (result.length === 0) {
			return res.status(404).send({
				success: true,
				data: [],
				message: `${req.user_id}가 작성한 나눔글이 존재하지 않습니다.`,
			});
		}
		return res.status(200).send({
			success: true,
			data: mock_post_list_response && result,
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

const generateMockData = (n, post_id) => {
	const data = [];
	for (let i = 0; i < n; i++) {
		let post = {
			id: i,
			post_id: +post_id,
			title: '저에게 꼭 필요한 수건이에요',
			user_id: i + 5,
			user_nick_name: `Tony ${i + 5}`,
			created_at: '2023-11-15 16:41:10',
			content:
				'저에게 코트를 주세요 제발요~!  저에게 코트를 주세요 제발요~! 저에게 코트를 주세요 제발요~! ',
			phone: '01012345678',
			addr: '서울특별시 금천구 독산로50길 23',
			addr_detail: '본관 1층',
			is_picked: i === 0,
		};
		data.push(post);
	}
	return data;
};

router.get('/comment-list', async (req, res) => {
	//TODO: authorization
	req.user_id = '1';

	const { post_id } = req.query;

	let user_options = { attributes: ['nick_name'] };
	let result = [];

	try {
		const options = {
			attributes: [
				'id',
				'post_id',
				'title',
				'user_id',
				'created_at',
				'content',
				'phone',
				'addr',
				'addr_detail',
				'is_picked',
			],
			where: { user_id: req.user_id },
		};

		result = await Comment.findAll(options);

		if (!result || result.length === 0) {
			return res.status(404).send({
				success: true,
				data: [],
				message: `${post_id}에 대하여 작성한 응답글이 존재하지 않습니다.`,
			});
		}
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}

	try {
		const result_with_nick_name = result.map(async ele => {
			const { user_id } = ele;
			user_options = { ...user_options, where: { user_id: user_id } };
			const { nick_name } = await User.findOne(user_options);
			return { ...ele, user_nick_name: nick_name };
		});

		res.status(200).send({
			success: true,
			// data: result_with_nick_name,
			data: generateMockData(10, post_id),
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.put('/check', async (req, res) => {
	//TODO: authorization
	req.user_id = '1';

	const { comment_id } = req.query;

	try {
		const options = { where: { id: comment_id } };
		const result = await Comment.update({ is_picked: true }, options);

		//TODO: alert 처리

		res.status(200).send({ success: true, data: result, message: '응답 요청 성공' });
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
