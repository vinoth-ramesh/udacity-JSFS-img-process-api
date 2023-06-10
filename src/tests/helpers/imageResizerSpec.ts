import path from 'path';
import imageHelper from '../../helpers/imageHelper';

const filePathFull = path.resolve(__dirname, '../../../images/full/santamonica.jpg');
const filePathThumb = path.resolve(__dirname, '../../../images/thumb/santamonica.jpg');

describe('The imageResizer function', (): void => {
    it('returns a buffer after sucessfully resizing an image', async () => {
        const imageBuffer: Buffer = await imageHelper.resizeImage({
            height: 100,
            width: 150,
            filePathFull,
            filePathThumb,
        });
        expect(imageBuffer).toBeInstanceOf(Buffer);
    });

    it('rejects promise if something went wrong', async (): Promise<void> => {
        await expectAsync(
            imageHelper.resizeImage({
                height: 100,
                width: 150,
                filePathFull: '',
                filePathThumb,
            }),
        ).toBeRejected();
    });
});
