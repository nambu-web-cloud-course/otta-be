const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { MulterAzureStorage } = require('multer-azure-blob-storage');
const dotenv = require('dotenv');
dotenv.config();

const getBlobName = (req, file) => {
	const ext = path.extname(file.originalname);
	return path.basename(file.originalname, ext);
};

const azureStorage = new MulterAzureStorage({
	connectionString: process.env.AZURE_CONNECTION_STRING,
	accessKey: process.env.AZURE_ACCESS_KEY,
	accountName: process.env.AZURE_ACCOUNT_NAME,
	containerName: 'nanum-post-images',
	blobName: getBlobName,
});

const upload = multer({ storage: azureStorage });

router.post('/images', upload.array('files'), (req, res) => {
	const result = req.files.map(ele => ele.url);
	res.status(200).send({ success: true, data: result });
});

module.exports = router;
