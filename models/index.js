const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

const User = require('./User.js');
const Post = require('./Post.js');
const PostImage = require('./PostImage.js');
const Comment = require('./Comment.js');
const Alert = require('./Alert.js');
const ClothingBoxLoc = require('./ClothingBoxLoc.js');
const ClothingBoxLocXY = require('./ClothingBoxLocXY.js');

db.User = User;
db.Post = Post;
db.PostImage = PostImage;
db.Comment = Comment;
db.Alert = Alert;
db.ClothingBoxLoc = ClothingBoxLoc;
db.ClothingBoxLocXY = ClothingBoxLocXY;

User.init(sequelize);
Post.init(sequelize);
PostImage.init(sequelize);
Comment.init(sequelize);
Alert.init(sequelize);
ClothingBoxLoc.init(sequelize);
ClothingBoxLocXY.init(sequelize);

User.associate(db);
Post.associate(db);
PostImage.associate(db);
Comment.associate(db);
Alert.associate(db);
ClothingBoxLoc.associate(db);
ClothingBoxLocXY.associate(db);

module.exports = db;
