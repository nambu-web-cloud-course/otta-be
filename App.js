const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const sync = require('./models/sync.js');
sync();

const port = process.env.PORT || 3000;
const app = express();

const find_clothing_box_router = require('./routes/find_clothing_box_router.js');
const my_page_user_info_edit_router = require('./routes/my_page/user_info_router.js');
const my_page_post_list_router = require('./routes/my_page/post_list_router.js');
const my_page_comment_list_router = require('./routes/my_page/comment_list_router.js');
const nanum_create_post_router = require('./routes/nanum_create_post_router.js');
const nanum_post_router = require('./routes/nanum_post_router.js');
const nanum_list_router = require('./routes/nanum/nanum_list_router.js');
const nanum_post_detail_router = require('./routes/nanum/nanum_post_detail_router.js');
const nanum_list_comment_router = require('./routes/nanum/nanum_list_comment_router.js');
const auth_router = require('./routes/auth/auth_router.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/find-clothing-box', find_clothing_box_router);
app.use('/my-page/edit', my_page_user_info_edit_router);
app.use('/my-page/post-list', my_page_post_list_router);
app.use('/my-page/comment-list', my_page_comment_list_router);
app.use('/nanum-create-post', nanum_create_post_router);
app.use('/nanum-post', nanum_post_router);
app.use('/nanum/list', nanum_list_router);
app.use('/nanum/post/detail', nanum_post_detail_router);
app.use('/nanum/list/comment', nanum_list_comment_router);
app.use('/auth', auth_router);

app.listen(port, () => {
	console.log('Express server listening on port ' + port);
});
