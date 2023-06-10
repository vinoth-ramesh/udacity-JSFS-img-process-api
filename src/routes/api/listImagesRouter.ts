import express, { Response, Request } from 'express';
import fs from 'fs/promises';
import path from 'path';

const listImagesRouter = express.Router();

listImagesRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
    const folderPathFull = `${path.resolve(__dirname, '../../../images/full')}`;

    const files: string[] | null = await fs.readdir(folderPathFull).catch(() => {
        res.status(500).send('Error while getting the images');
        return null;
    });

    if (!files) {
        return;
    }

    let htmlResponse = `
        <h1>All available images</h1>
        <p>Below is the list of all images that are available via the route /api/ListImages</p>
        <ul>
    `;

    files.forEach((file: string): void => {
        htmlResponse = htmlResponse + `<li>${file}</li>`;
    });

    res.status(200).send(`${htmlResponse}</ul>`);
});

export default listImagesRouter;
