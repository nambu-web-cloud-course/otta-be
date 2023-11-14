const Sequelize = require('sequelize');

class Alert extends Sequelize.Model {
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
				alert_type: {
					type: Sequelize.INTEGER(1),
					allowNull: false,
				},
				check_status: {
					type: Sequelize.BOOLEAN,
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
				comment_id: {
					type: Sequelize.INTEGER(10),
					allowNull: true,
				},
			},
			{
				sequelize,
				timestamps: true,
				underscored: true,
				modelName: 'Alert',
				tableName: 'Alert',
				paranoid: true,
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	static associate(db) {
		db.Alert.belongsTo(db.User, { foreignKey: 'id' });
		db.Alert.belongsTo(db.Post, { foreignKey: 'id' });
		db.Alert.belongsTo(db.Comment, { foreignKey: 'id' });
	}
}

module.exports = Alert;
