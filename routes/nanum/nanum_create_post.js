const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
// const { Comment } = require('../../models');
const router = express.Router();

app.use(cors());
// router.post('/', async (req, res) => {
// 	const new_comment = req.body;
// 	try {
// 		// new_post.post_id = req.query.post_id;
// 		const result = await Comment.create(new_comment);
// 		res.send({ success: true, data: { comment_id: result.id }, message: '응답 글 등록 성공' });
// 	} catch (error) {
// 		res.send({ success: false, data: '', message: error });
// 	}
// });

// 파일 업로드를 처리하기 위한 Multer 설정
const storage = multer.diskStorage({
	destination: './uploads',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

// 이미지를 포함한 게시물을 업로드하는 POST 요청 처리
router.post('/', upload.array('files'), (req, res) => {
	const { title, content } = req.body;
	const files = req.files.map(file => file.filename);

	// 여기서는 간단히 받은 데이터를 로그에 출력합니다.
	console.log('받은 게시물:', { title, content, files });

	res.status(200).send('게시물이 성공적으로 업로드되었습니다!');
});

module.exports = router;
