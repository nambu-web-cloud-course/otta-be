const Sequelize = require('sequelize');

class User extends Sequelize.Model {
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
				email: {
					type: Sequelize.STRING(30),
					allowNull: false,
				},
				password: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
				nick_name: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
				phone: {
					type: Sequelize.STRING(11),
					allowNull: true,
				},
				addr: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				addr_detail: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				emoji: {
					type: Sequelize.STRING(20),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'User',
				tableName: 'User',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	static associate(db) {
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);
		db.User.hasMany(db.Alert);
	}
}

module.exports = User;
