const Sequelize = require('sequelize');

class ClothingBoxLocXY extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        x: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        y: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ClothingBoxLocXY',
        tableName: 'ClothingBoxLocXY',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.ClothingBoxLocXY.belongsTo(db.ClothingBoxLoc, {
      foreignKey: 'id',
    });
  }
}

module.exports = ClothingBoxLocXY;