import * as Code from 'code';
import * as Lab from 'lab';
import { IWishlistItem } from '../../../entities/wishlist-item';
import { wishlistItemsCreateAction } from '../../../wishlist-items/wishlist-items-create-action';
import * as Joi from 'joi';
import { ValidationError } from '../../../errors/index';
import { dropDb } from '../../../db/index';

const lab = exports.lab = Lab.script();

lab.experiment('wishlistItemsCreateAction', () => {
    lab.beforeEach(async () => {
        dropDb();
    });

    lab.test('Should create IWishlistItem', async () => {
        const params: IWishlistItem = {
            suggestion: 'Stan Smith Shoes',
            // tslint:disable-next-line:max-line-length
            image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1512187542812/zoom2/M20324_01_standard.jpg?sw=60&sh=60&sm=fit',
            url: 'http://www.adidas.co.uk/stan-smith-shoes/M20324.html',
            rating: '5',
            reviews: '2817',
            separatedSalePrice: '[{"isCurrency":true,"value":"£"},{"isCurrency":false,"value":"69.95"}]',
            separatedStandartPrice: 'null',
            subTitle: 'Originals',
            isPreorder: '',
        };

        const item = await wishlistItemsCreateAction.exec(params);


        Code.expect(item.suggestion).to.equal(params.suggestion);
        Code.expect(item.image).to.equal(params.image);
        Code.expect(item.url).to.equal(params.url);
        Code.expect(item.rating).to.equal(params.rating);
        Code.expect(item.reviews).to.equal(params.reviews);
        Code.expect(item.separatedSalePrice).to.equal(params.separatedSalePrice);
        Code.expect(item.separatedStandartPrice).to.equal(params.separatedStandartPrice);
        Code.expect(item.subTitle).to.equal(params.subTitle);
        Code.expect(item.isPreorder).to.equal(params.isPreorder);
        Code.expect(item.id).to.equal(item.url);
    });

    lab.test('Should reject invalid IWishlistItem', async () => {
        const params: IWishlistItem = {
            suggestion: '',
            // tslint:disable-next-line:max-line-length
            image: 'https://www.adidas.co.uk/dis/dw/image/v2/aagl_prd/on/demandware.static/Sites-adidas-GB-Site/Sites-adidas-products/en_GB/v1512187542812/zoom2/M20324_01_standard.jpg?sw=60&sh=60&sm=fit',
            url: 'http://www.adidas.co.uk/stan-smith-shoes/M20324.html',
            rating: '5',
            reviews: '2817',
            separatedSalePrice: '[{"isCurrency":true,"value":"£"},{"isCurrency":false,"value":"69.95"}]',
            separatedStandartPrice: 'null',
            subTitle: 'Originals',
            isPreorder: '',
        };

        try {
            const item = await wishlistItemsCreateAction.exec(params);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ValidationError);
        }
    });
});

