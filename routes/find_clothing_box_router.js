/* eslint-disable no-unused-vars */
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const { ClothingBoxLocation } = require('../models');

router.get('/addr', async (req, res) => {
	const { district, region } = req.query;
	try {
		const options = {
			attributes: ['address', 'x', 'y'],
			where: {
				address: {
					[Op.like]: `%${district}%`,
				},
				region: region,
			},
		};
		const result = await ClothingBoxLocation.findAll(options);

		if (result.length <= 0) {
			return res.status(404).send({
				success: true,
				data: '',
				message: `${district} ${region}에 일치하는 의류수거함 주소가 존재하지 않습니다.`,
			});
		}
		return res.status(200).send({
			success: true,
			data: result,
			message: '조회 성공',
		});
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

router.get('/detail-addr', async (res, req) => {
	const { query } = req.query;
	try {
		const result = await ClothingBoxLocation.findAll();
	} catch (err) {
		res.status(500).send({ success: false, data: '', message: err.message });
	}
});

module.exports = router;
