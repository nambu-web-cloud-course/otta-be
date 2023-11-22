const express = require('express');
const Post = require('../models/Post');
const PostImage = require('../models/PostImage');
const isAuth = require('./auth/authorization');

const router = express.Router();

router.post('/', isAuth, async (req, res) => {
	const new_post = req.body;
	try {
		new_post.user_id = req.user_id;
		new_post.status = 1;

		const result = await Post.create(new_post);
		const response = { post_id: result.id };
		res.status(201).send({ success: true, data: response, message: '게시글 작성 성공' });
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.post('/image', isAuth, async (req, res) => {
	const { post_id, image_url_list } = req.body;

	try {
		image_url_list.forEach(async (ele, idx) => {
			const new_post_image = { post_id: post_id, url: ele, order: idx + 1 };
			await PostImage.create(new_post_image);
		});

		res.status(201).send({ success: true, data: '', message: '이미지 업로드 성공' });
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.delete('/', isAuth, async (req, res) => {
	const { post_id } = req.body;
	const options = { where: { id: post_id } };
	try {
		const result = await Post.destroy(options);
		res.status(200).send({ success: true, data: result, message: '포스트 작성 취소 성공' });
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
