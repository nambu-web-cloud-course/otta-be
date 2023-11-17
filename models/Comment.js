const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER(10),
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					unique: true,
				},
				content: {
					type: Sequelize.STRING(1000),
					allowNull: false,
				},
				addr: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				addr_detail: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				phone: {
					type: Sequelize.STRING(11),
					allowNull: false,
				},
				is_picked: {
					type: Sequelize.TINYINT,
					allowNull: false,
				},
				user_id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
				},
				post_id: {
					type: Sequelize.INTEGER(10),
					allowNull: false,
				},
				title: {
					type: Sequelize.STRING(30),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'Comment',
				tableName: 'Comment',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			},
		);
	}
	static associate(db) {
		db.Comment.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
		db.Comment.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
		db.Comment.hasOne(db.Alert);
	}
}

module.exports = Comment;
