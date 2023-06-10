import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import imageHelper from '../../helpers/imageHelper';
import { Stats } from 'fs';

const imageRouter = express.Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const filename = req.query['filename'];
    const height = req.query['height'] ? parseInt(req.query['height'] as string, 10) : null;
    const width = req.query['width'] ? parseInt(req.query['width'] as string, 10) : null;

    // check the input parameters passed
    if (!filename || !height || !width) {
        res.status(400).send('Please check that url has valid filename, height and width parameters');
        return;
    }

    // check the full path of the filename provided
    const filePathFull = `${path.resolve(__dirname, `../../../images/full/${filename}.jpg`)}`;

    // thumb path in the ${filename}-${height}x${width} format to save different dimensions
    const filePathThumb = `${path.resolve(__dirname, `../../../images/thumb/${filename}-${height}x${width}.jpg`)}`;

    // verify if file provided exists in full folder
    const fullImage: Stats | null = await fs.stat(filePathFull).catch(() => {
        res.status(404).send('Given Image is not present');
        return null;
    });

    if (!fullImage) {
        return;
    }

    // validate if thum file with requested size already exists
    const existingThumb: Stats | null = await fs.stat(filePathThumb).catch(() => {
        return null;
    });

    if (existingThumb) {
        fs.readFile(filePathThumb)
            .then((thumbData: Buffer) => {
                res.status(200).contentType('jpg').send(thumbData);
            })
            .catch(() => {
                res.status(500).send('Error while processing given image');
            });
    } else {
        // resize image to given size
        imageHelper
            .resizeImage({
                filePathFull,
                filePathThumb,
                height,
                width,
            })
            .then((resizedImage: Buffer) => {
                res.status(200).contentType('jpg').send(resizedImage);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    }
});

export default imageRouter;
