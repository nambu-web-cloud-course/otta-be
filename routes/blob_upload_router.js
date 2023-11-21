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

router.post('/images', upload.array('files'), (req, res) => {
	const result = req.files.map(ele => process.env.AZURE_BLOB_BASE_URL + ele.blobName);
	res.status(200).send({ success: true, data: result });
});

module.exports = router;
