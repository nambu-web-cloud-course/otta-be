const Sequelize = require('sequelize');

class ClothingBoxLocation extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.UUID,
					primaryKey: true,
					allowNull: false,
					unique: true,
				},
				address: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				region: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
				x: {
					type: Sequelize.STRING(20),
					allowNull: false,
				},
				y: {
					type: Sequelize.STRING(20),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: false,
				underscored: true,
				modelName: 'ClothingBoxLocation',
				tableName: 'ClothingBoxLocation',
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	
}

module.exports = ClothingBoxLocation;
