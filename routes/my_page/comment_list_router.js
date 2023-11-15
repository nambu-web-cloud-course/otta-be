/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../../models');

const generateMockData = n => {
	const data = [];
	for (let i = 0; i < n; i++) {
		let comment = {
			post_id: i,
			post_created_at: '2023-11-15 17:45:10',
			post_title: '레이스 달린 커튼이나 옷 구합니다',
			post_status: Math.ceil(Math.random() * 3),
			comment_is_picked: Math.round(Math.random()) === 0,
			comment_content:
				'저에게 꼭 필요한 코트입니다.\n제가 가지고 있는 옷과 딱 매치가 될 것 같아요.\n추워지는 날씨에 맞춰 제가 새 주인이 되어 보고 싶습니다.\n예쁘게 입으신 옷 저도 잘 관리하며 입을게요',
			comment_phone: '01012345678',
			comment_addr: '서울특별시 금천구 독산로50길 23',
			comment_detail_addr: '본관 1층',
		};
		data.push(comment);
	}
	return data;
};

router.get('/', async (req, res) => {
	//TODO: authorization
	req.user_id = '1';

	let result = [];

	try {
		const options = {
			attributes: ['is_picked', 'content', 'phone', 'addr', 'addr_detail'],
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

	try {
		const options = post_id => {
			return {
				attributes: ['created_at', 'title', 'status'],
				where: { id: post_id },
			};
		};

		const result_with_post_info = (result = result.map(async ele => {
			const { post_id } = ele;
			const { created_at, title, status } = await Post.findOne(options(post_id));
			return { ...ele, post_created_at: created_at, post_title: title, post_status: status };
		}));
		res.status(200).send({ success: true, data: result_with_post_info, message: '조회 성공' });
		res.status(200).send({ success: true, data: generateMockData(10), message: '조회 성공' });
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
