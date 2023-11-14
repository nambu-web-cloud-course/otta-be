const Sequelize = require('sequelize');

class ClothingBoxLoc extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
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
        timestamps: true,
        underscored: true,
        modelName: 'ClothingBoxLoc',
        tableName: 'ClothingBoxLoc',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.ClothingBoxLoc.hasOne(db.ClothingBoxLocXY, {
      foreignKey: 'id',
      // sourcekey: id,
    });
  }
}

module.exports = ClothingBoxLoc;
