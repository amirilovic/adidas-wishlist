import * as Code from 'code';
import * as Lab from 'lab';
import { IWishlistItem } from '../../../entities/wishlist-item';
import { wishlistItemsCreateAction } from '../../../wishlist-items/wishlist-items-create-action';
import * as Joi from 'joi';
import { ValidationError } from '../../../errors/index';
import { dropDb, Db } from '../../../db/index';
import { wishlistItemsListAction } from '../../../wishlist-items/wishlist-items-list-action';

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


lab.experiment('wishlistItemsListAction', () => {
    lab.beforeEach(async () => {
        dropDb();
    });

    lab.test('Should return IWishlistItem', async () => {

        const item1 = await Db.whishlistItemsRepository.create(params1);

        const results = await wishlistItemsListAction.exec({});

        Code.expect(results.length).to.equal(1);
        const item = results[0];

        Code.expect(item.suggestion).to.equal(item1.suggestion);
        Code.expect(item.image).to.equal(item1.image);
        Code.expect(item.url).to.equal(item1.url);
        Code.expect(item.rating).to.equal(item1.rating);
        Code.expect(item.reviews).to.equal(item1.reviews);
        Code.expect(item.separatedSalePrice).to.equal(item1.separatedSalePrice);
        Code.expect(item.separatedStandartPrice).to.equal(item1.separatedStandartPrice);
        Code.expect(item.subTitle).to.equal(item1.subTitle);
        Code.expect(item.isPreorder).to.equal(item1.isPreorder);
        Code.expect(item.id).to.equal(item1.id);
    });

    lab.test('Should return empty results', async () => {

        const results = await wishlistItemsListAction.exec({});

        Code.expect(results.length).to.equal(0);
    });
});

