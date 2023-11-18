const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../../models');
const User = require('../../models/User');

router.get('/', async (req, res) => {
	//TODO: authorization
	req.user_id = 1;

	let result = [];

	try {
		const options = {
			attributes: ['is_picked', 'content', 'phone', 'addr', 'addr_detail', 'post_id'],
			where: { user_id: req.user_id },
		};

		result = await Comment.findAll(options);
		result = result.map(ele => {
			const { is_picked, content, phone, addr, addr_detail, post_id } = ele;
			return {
				post_id,
				comment_is_picked: is_picked,
				comment_content: content,
				comment_phone: phone,
				comment_addr: addr,
				comment_detail_addr: addr_detail,
			};
		});

		if (!result || result.length === 0) {
			return res.status(404).send({
				success: true,
				data: [],
				message: `${req.user_id}가 작성한 응답글이 존재하지 않습니다.`,
			});
		}
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}

	const post_options = post_id => {
		return {
			attributes: ['createdAt', 'title', 'status', 'user_id'],
			where: { id: post_id },
		};
	};

	const user_options = user_id => {
		return {
			attributes: ['nick_name'],
			where: { id: user_id },
		};
	};

	const result_with_post_info = await Promise.all(
		result.map(async ele => {
			try {
				const { post_id } = ele;
				const { createdAt, title, status, user_id } = await Post.findOne(post_options(post_id));
				const { nick_name } = await User.findOne(user_options(user_id));
				return {
					...ele,
					post_created_at: createdAt,
					post_title: title,
					post_status: status,
					post_author: nick_name,
				};
			} catch (err) {
				res.status(500).send({ success: false, data: '', message: err.message });
			}
		}),
	);
	res.status(200).send({ success: true, data: result_with_post_info, message: '조회 성공' });
});

module.exports = router;
