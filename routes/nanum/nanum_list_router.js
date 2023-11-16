/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

const generateMockData = n => {
	const data = [];
	for (let i = 0; i < n; i++) {
		let post = {
			id: i,
			title: '눈 오는 날 입으면 딱 좋은 패딩입니다',
			content:
				'추위를 많이 타서 따뜻하게 입으려고 구입한 패팅입니다.  요즘 정장을 많이 입어서 잘 안입게 되어 새 주인을 찾아주려 합니다.   사이즈는 55, 기본 블랙입니다.  무광에 충전재는 오리털이구요 160cm 키에 입으면 무릎 살짝 덮습니다.  ',
			status: (i % 3) + 1,
			user_id: 3,
			createdAt: '2023-10-25 13:45:10',
			thumbnail_url: 'https://picsum.photos/200/300',
			is_mypost: i % 2,
		};
		data.push(post);
	}
	return data;
};

router.get('/', async (req, res) => {
	req.user_id = '1';
	let result = [];
	try {
		// const options = {
		// 	attributes: ['id', 'title', 'content', 'created_at', 'status', 'user_id'],
		// };

		// result = await Post.findAll(options);

		if (!result || result.length === 0) {
			return res
				.status(200)
				.send({ success: true, data: generateMockData(10), message: '조회 성공' });
		}
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
