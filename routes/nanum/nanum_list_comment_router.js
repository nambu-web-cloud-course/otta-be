const express = require('express');
const { Comment } = require('../../models');
const router = express.Router();

router.post('/', async (req, res) => {
	const new_comment = req.body.data;
	console.log('req.body', req.body);
	try {
		
		const result = await Comment.create(new_comment);

		res.send({ success: true, data: result, message: '응답 글 등록 성공' });
	} catch (error) {
		res.send({ success: false, data: '', message: error });
	}
});
      

module.exports = router;
