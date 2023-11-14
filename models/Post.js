const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					unique: true,
				},
				title: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				content: {
					type: Sequelize.STRING(2000),
					allowNull: false,
				},
				status: {
					type: Sequelize.INTEGER(1),
					allowNull: false,
				},
				user_id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'Post',
				tableName: 'Post',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	static associate(db) {
		db.Post.belongsTo(db.User, { foreignKey: 'id' });
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.PostImage);
		db.Post.hasMany(db.Alert);
	}
}

module.exports = Post;
