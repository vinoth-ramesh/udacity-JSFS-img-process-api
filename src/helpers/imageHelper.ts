import fs from 'fs/promises';
import sharp from 'sharp';

interface ResizeImageProps {
    width: number;
    height: number;
    filePathFull: string;
    filePathThumb: string;
}

// image of given path is resized and saved in the given thumb path

const resizeImage = async ({ width, height, filePathFull, filePathThumb }: ResizeImageProps): Promise<Buffer> => {
    const data: Buffer | null = await fs.readFile(filePathFull).catch(() => null);

    if (!data) {
        return Promise.reject();
    }

    const imageBuffer: Buffer | null = await sharp(data)
        .resize(width, height)
        .toBuffer()
        .catch(() => null);

    if (!imageBuffer) {
        return Promise.reject();
    }

    // returns buffer of resized image
    return fs
        .writeFile(filePathThumb, imageBuffer)
        .then(() => {
            return imageBuffer;
        })
        .catch(() => {
            return Promise.reject();
        });
};

export default { resizeImage };
