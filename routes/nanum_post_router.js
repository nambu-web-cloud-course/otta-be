const express = require('express');
const router = express.Router();
const { Post, PostImage, User } = require('../models');

router.get('/detail', (req, res) => {
	//TODO: authorization
	req.user_id = 1;
	const { post_id } = req.query;

	let response = {};

	const post_options = {
		attributes: ['title', 'content', 'status', 'user_id', 'createdAt'],
		where: { id: post_id },
	};
	const post_image_options = { attributes: ['url', 'order'], where: { post_id: post_id } };
	const user_options = user_id => {
		return { attributes: ['nick_name'], where: { id: user_id } };
	};

	PostImage.findAll(post_image_options).then(data => (response.image_url = data));

	Post.findOne(post_options)
		.then(data => {
			const { title, content, status, user_id, createdAt } = data;
			response = {
				...response,
				title,
				content,
				status,
				createdAt,
				is_my_post: req.user_id === user_id,
			};
			return User.findOne(user_options(user_id));
		})
		.then(data => {
			response.nick_name = data.nick_name;
			res.status(200).send({ success: true, data: response, message: '조회 성공' });
		})
		.catch(err => {
			res.status(500).send({ success: false, data: '', message: err.message });
		});
});

router.get('/list', async (req, res) => {
	//TODO: authorization
	req.user_id = 1;

	const options = { attributes: ['id', 'title', 'content', 'status', 'user_id', 'createdAt'] };
	const post_image_options = post_id => {
		return { attributes: ['url'], where: { post_id: post_id, order: 1 } };
	};
	const user_options = user_id => {
		return { attributes: ['nick_name'], where: { id: user_id } };
	};

	Post.findAll(options)
		.then(async data => {
			return await Promise.all(
				data.map(async ele => {
					const { id, title, content, status, user_id, createdAt } = ele;
					console.log('id: ', id);
					const { url } = await PostImage.findOne(post_image_options(id));
					const { nick_name } = await User.findOne(user_options(user_id));
					return {
						id,
						title,
						content,
						status,
						nick_name,
						createdAt,
						thumbnail_url: url,
						is_my_post: req.user_id === user_id,
					};
				}),
			);
		})
		.then(response => {
			res.status(200).send({ success: true, data: response, message: '나눔글 리스트 조회 성공' });
		})
		.catch(err => {
			res.status(500).send({ success: false, data: '', message: err.message });
		});
});

module.exports = router;
