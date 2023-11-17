const Sequelize = require('sequelize');
const env = process.env.IS_TEST ? 'test' : process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

const setMainData = () => {
	const User = require('./User.js');
	const Post = require('./Post.js');
	const PostImage = require('./PostImage.js');
	const Comment = require('./Comment.js');
	const Alert = require('./Alert.js');

	db.User = User;
	db.Post = Post;
	db.PostImage = PostImage;
	db.Comment = Comment;
	db.Alert = Alert;

	User.init(sequelize);
	Post.init(sequelize);
	PostImage.init(sequelize);
	Comment.init(sequelize);
	Alert.init(sequelize);

	User.associate(db);
	Post.associate(db);
	PostImage.associate(db);
	Comment.associate(db);
	Alert.associate(db);
};

const setClothingBoxData = () => {
	const ClothingBoxLocation = require('./ClothingBoxLocation.js');

	db.ClothingBoxLocation = ClothingBoxLocation;

	ClothingBoxLocation.init(sequelize);
};

setMainData();
setClothingBoxData();

module.exports = db;
