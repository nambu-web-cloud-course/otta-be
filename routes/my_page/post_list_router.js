const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../../models');

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
			data: result,
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.get('/comment-list', async (req, res) => {
	//TODO: authorization
	req.user_id = 1;

	const { post_id } = req.query;

	let user_options = { attributes: ['nick_name'] };
	let result = [];

	try {
		const options = {
			attributes: [
				'id',
				'title',
				'user_id',
				'created_at',
				'content',
				'phone',
				'addr',
				'addr_detail',
				'is_picked',
			],
			where: { post_id: post_id },
		};

		result = await Comment.findAll(options);
		result = JSON.parse(JSON.stringify(result));

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

	const result_with_nick_name = await Promise.all(
		result.map(async ele => {
			try {
				const { user_id } = ele;
				user_options = { ...user_options, where: { id: user_id } };
				const { nick_name } = await User.findOne(user_options);
				return { ...ele, user_nick_name: nick_name };
			} catch (err) {
				res.status(500).send({ success: false, data: '', message: err.message });
			}
		}),
	);

	res.status(200).send({ success: true, data: result_with_nick_name, message: '조회 성공' });
});

router.put('/check', async (req, res) => {
	//TODO: authorization
	req.user_id = 1;

	const { comment_id, post_id } = req.query;
	console.log('post_id: ', post_id);
	console.log('comment_id: ', comment_id);

	const post_options = { where: { id: post_id } };
	const options = { where: { id: comment_id } };

	Post.findOne(post_options)
		.then(data => {
			if (data.status === 3) {
				throw Error('이미 응답 확인된 나눔글입니다.');
			}
		})
		.then(() => {
			Post.update({ status: 3 }, post_options);
		})
		.then(() => {
			Comment.update({ is_picked: 1 }, options);
		})
		.then(() => {
			res.status(200).send({ success: true, data: '', message: '응답 요청 성공' });
		})
		.catch(err => {
			res.status(500).send({ success: false, data: '', message: err.message });
		});
	//TODO: alert 처리
});

module.exports = router;
