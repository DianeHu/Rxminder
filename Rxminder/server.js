const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/*const bodyParser = require('body-parser');*/
//const router = express.Router();
/*const Multer = require('multer');
const app = express();
const storage = require('@google-cloud/storage');
const fs = require('fs');*/

/*const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

router.post('/', multer.single('image'), uploadToGcs, function(request, response, next) {
    const data = request.body;
    if (request.file && request.file.cloudStoragePublicUrl) {
        data.imageUrl = request.file.cloudStoragePublicUrl;
    }
    response.send(data);
});*/

app.get('/plswork', (req, res) => {console.log("hit the get")});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
const gcs = storage({
    projectId: 'RxMinder',
    keyFilename: '/RxMinder-57004b7c80c5.json'
});

const bucketName = 'rxminder_bucket1'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}


function uploadToGcs(req, res, next) {
    if(!req.file) return next();

    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
}*/
