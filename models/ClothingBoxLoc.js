const Sequelize = require('sequelize');

class ClothingBoxLoc extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.UUID,
					primaryKey: true,
					allowNull: false,
					unique: true,
				},
				box_addr: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				loc_code: {
					type: Sequelize.STRING(10),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: false,
				underscored: true,
				modelName: 'ClothingBoxLoc',
				tableName: 'ClothingBoxLoc',
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}
	static associate(db) {
		db.ClothingBoxLoc.hasOne(db.ClothingBoxLocXY, {
			foreignKey: 'id',
		});
	}
}

module.exports = ClothingBoxLoc;
