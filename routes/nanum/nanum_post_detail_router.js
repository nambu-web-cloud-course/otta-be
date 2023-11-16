/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

const mock_response = {
	title: '눈 오는 날 입으면 딱 좋은 패딩입니다',
	content:
		'추위를 많이 타서 따뜻하게 입으려고 구입한 패팅입니다.  요즘 정장을 많이 입어서 잘 안입게 되어 새 주인을 찾아주려 합니다.   사이즈는 55, 기본 블랙입니다.  무광에 충전재는 오리털이구요 160cm 키에 입으면 무릎 살짝 덮습니다.',
	status: 2,
	nick_name: '멋쟁이 호랑이',
	image_url: [
		{ order: 1, url: 'https://picsum.photos/200/300' },
		{ order: 2, url: 'https://picsum.photos/200/300' },
		{ order: 3, url: 'https://picsum.photos/200/300' },
		{ order: 4, url: 'https://picsum.photos/200/300' },
		{ order: 5, url: 'https://picsum.photos/200/300' },
	],
};

router.get('/', async (req, res) => {
	// req.params.post_id = '1';

	try {
		const options = {
			attributes: ['title', 'content', 'created_at', 'status', 'user_id'],
			where: { id: req.query.post_id },
		};

		let result = await Post.findOne(options);

		// if (!result) {
		// 	result = mock_response;
		// 	return res.status(404).send({
		// 		success: true,
		// 		data: '',
		// 		message: `${req.query.post_id}에 일치하는 게시물이 존재하지 않습니다.`,
		// 	});
		// }
		result = mock_response;
		return res.status(200).send({
			success: true,
			data: result,
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
