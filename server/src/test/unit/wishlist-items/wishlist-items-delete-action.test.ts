import * as Code from 'code';
import * as Lab from 'lab';
import { IWishlistItem } from '../../../entities/wishlist-item';
import { wishlistItemsCreateAction } from '../../../wishlist-items/wishlist-items-create-action';
import * as Joi from 'joi';
import { ValidationError, ItemNotFoundError } from '../../../errors/index';
import { dropDb, Db } from '../../../db/index';
import { wishlistItemsDeleteAction } from '../../../wishlist-items/wishlist-items-delete-action';

const lab = exports.lab = Lab.script();

const params1: IWishlistItem = {
    image: 'image',
    url: 'url',
    rating: 'rating',
    reviews: 'reviews',
    separatedSalePrice: 'separatedSalePrice',
    separatedStandartPrice: 'separatedStandartPrice',
    subTitle: 'subTitle',
    isPreorder: 'isPreorder',
};
let item1: IWishlistItem;

lab.experiment('wishlistItemsDeleteAction', () => {
    lab.beforeEach(async () => {
        dropDb();
        item1 = await Db.whishlistItemsRepository.create(params1);
    });

    lab.test('Should delete IWishlistItem', async () => {

        const item = await wishlistItemsDeleteAction.exec({ id: item1.id });

        Code.expect(item.suggestion).to.equal(item1.suggestion);
        Code.expect(item.image).to.equal(item1.image);
        Code.expect(item.url).to.equal(item1.url);
        Code.expect(item.rating).to.equal(item1.rating);
        Code.expect(item.reviews).to.equal(item1.reviews);
        Code.expect(item.separatedSalePrice).to.equal(item1.separatedSalePrice);
        Code.expect(item.separatedStandartPrice).to.equal(item1.separatedStandartPrice);
        Code.expect(item.subTitle).to.equal(item1.subTitle);
        Code.expect(item.isPreorder).to.equal(item1.isPreorder);
    });

    lab.test('Should reject invalid params', async () => {

        try {
            const item = await wishlistItemsDeleteAction.exec({});
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ValidationError);
        }
    });

    lab.test('Should throw an error if item not found', async () => {
        try {
            const item = await wishlistItemsDeleteAction.exec({id: 'dummy id'});
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ItemNotFoundError);
        }
    });
});

