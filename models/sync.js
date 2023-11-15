const { sequelize } = require('./index.js');
const sync = () => {
	sequelize
		.sync({ force: false })
		.then(() => {
			console.log('데이터베이스 생성 완료');
		})
		.catch(error => {
			console.error(error);
		});
};

module.exports = sync;
