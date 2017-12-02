import * as Code from 'code';
import * as Lab from 'lab';
import { IWishlistItem } from '../../../entities/wishlist-item';
import { wishlistItemsCreateAction } from '../../../wishlist-items/wishlist-items-create-action';
import * as Joi from 'joi';
import { ValidationError, UnexpectedError, ItemNotFoundError } from '../../../errors/index';
import { Db, dropDb } from '../../../db/index';
import { WishlistItemsRepository } from '../../../db/wishlist-items-repository';

const lab = exports.lab = Lab.script();

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

let itemFromDb: IWishlistItem;

lab.experiment('wishlistItemsRepository.create', () => {
    lab.beforeEach(async () => {
        dropDb();
    });

    lab.test('Should create IWishlistItem', async () => {

        const item = await Db.whishlistItemsRepository.create(params);

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

    lab.test('Should reject IWishlistItem without url', async () => {
        const params: IWishlistItem = {
        };

        try {
            const item = await Db.whishlistItemsRepository.create(params);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ValidationError);
        }
    });

    lab.test('Should reject IWishlistItem with duplicated url', async () => {
        const params: IWishlistItem = {
            url: 'a string',
        };

        try {
            const item = await Db.whishlistItemsRepository.create(params);
            const item1 = await Db.whishlistItemsRepository.create(params);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ValidationError);
        }
    });

    lab.test('Should throw an error if item is not supplied', async () => {
        try {
            const item = await Db.whishlistItemsRepository.findById(undefined);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(UnexpectedError);
        }
    });
});

lab.experiment('wishlistItemsRepository.findById', () => {
    lab.beforeEach(async () => {
        dropDb();
        itemFromDb = await Db.whishlistItemsRepository.create(params);
    });

    lab.test('Should return IWishlistItem', async () => {

        const item = await Db.whishlistItemsRepository.findById(itemFromDb.id);
        Code.expect(item.id).to.equal(itemFromDb.id);
        Code.expect(item.suggestion).to.equal(itemFromDb.suggestion);
        Code.expect(item.image).to.equal(itemFromDb.image);
        Code.expect(item.url).to.equal(itemFromDb.url);
        Code.expect(item.rating).to.equal(itemFromDb.rating);
        Code.expect(item.reviews).to.equal(itemFromDb.reviews);
        Code.expect(item.separatedSalePrice).to.equal(itemFromDb.separatedSalePrice);
        Code.expect(item.separatedStandartPrice).to.equal(itemFromDb.separatedStandartPrice);
        Code.expect(item.subTitle).to.equal(itemFromDb.subTitle);
        Code.expect(item.isPreorder).to.equal(itemFromDb.isPreorder);

    });

    lab.test('Should throw ItemNotFound', async () => {
        const params: IWishlistItem = {
        };

        try {
            const item = await Db.whishlistItemsRepository.findById('dummy id');
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ItemNotFoundError);
        }
    });

    lab.test('Should throw error if id not defined', async () => {

        try {
            const item = await Db.whishlistItemsRepository.create(undefined);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(UnexpectedError);
        }
    });
});

lab.experiment('wishlistItemsRepository.delete', () => {
    lab.beforeEach(async () => {
        dropDb();
        itemFromDb = await Db.whishlistItemsRepository.create(params);
    });

    lab.test('Should delete IWishlistItem', async () => {

        const item = await Db.whishlistItemsRepository.delete(itemFromDb.id);

        Code.expect(item.id).to.equal(itemFromDb.id);
        Code.expect(item.suggestion).to.equal(itemFromDb.suggestion);
        Code.expect(item.image).to.equal(itemFromDb.image);
        Code.expect(item.url).to.equal(itemFromDb.url);
        Code.expect(item.rating).to.equal(itemFromDb.rating);
        Code.expect(item.reviews).to.equal(itemFromDb.reviews);
        Code.expect(item.separatedSalePrice).to.equal(itemFromDb.separatedSalePrice);
        Code.expect(item.separatedStandartPrice).to.equal(itemFromDb.separatedStandartPrice);
        Code.expect(item.subTitle).to.equal(itemFromDb.subTitle);
        Code.expect(item.isPreorder).to.equal(itemFromDb.isPreorder);

        const result = await Db.whishlistItemsRepository.findAll();
        Code.expect(result.length).to.equal(0);
    });

    lab.test('Should throw ItemNotFound', async () => {
        const params: IWishlistItem = {
        };

        try {
            const item = await Db.whishlistItemsRepository.delete('dummy id');
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(ItemNotFoundError);
        }
    });

    lab.test('Should throw error if id not defined', async () => {

        try {
            const item = await Db.whishlistItemsRepository.delete(undefined);
            throw new Error();
        } catch (err) {
            Code.expect(err).to.be.an.error(UnexpectedError);
        }
    });
});


