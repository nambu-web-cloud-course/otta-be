const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { MulterAzureStorage } = require('multer-azure-blob-storage');
const dotenv = require('dotenv');
dotenv.config();

const getBlobName = (req, file) => {
	const ext = path.extname(file.originalname);
	return path.basename(file.originalname, ext) + Date.now() + ext;
};

const azureStorage = new MulterAzureStorage({
	connectionString: process.env.AZURE_CONNECTION_STRING,
	containerName: 'nanum-post-images',
	blobName: getBlobName,
	containerAccessLevel: 'blob',
	urlExpirationTime: -1,
});

const upload = multer({ storage: azureStorage });

const uploadImageArray = upload.array('files');

router.post('/images', (req, res) => {
	uploadImageArray(req, res, err => {
		if (err) {
			return res.status(500).send({ success: false, data: '', message: err.message });
		}
		const result = req.files.map(ele => process.env.AZURE_BLOB_BASE_URL + ele.blobName);
		return res
			.status(200)
			.send({ success: true, data: result, message: 'Blob storage 업로드 성공' });
	});
});

module.exports = router;
