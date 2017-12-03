import * as Joi from 'joi';
import { IWishlistItem } from '../entities/wishlist-item';
import { Db } from '../db/index';
import { ValidationError, ItemNotFoundError } from '../errors/index';

const validator = {
    suggestion: Joi.string().required(),
    image: Joi.string().required(),
    url: Joi.string().required(),
    rating: Joi.string().allow('').required(),
    reviews: Joi.string().allow('').required(),
    separatedSalePrice: Joi.string().required(),
    separatedStandartPrice: Joi.string().allow(''),
    subTitle: Joi.string().required(),
    isPreorder: Joi.string().allow(''),
};

const exec = async (params: IWishlistItem) => {
    const vr = Joi.validate(params, validator);

    if (vr.error) {
        throw ValidationError.fromJoi(vr.error);
    }

    const wishlistItem = await Db.whishlistItemsRepository.create(params);

    return wishlistItem;
};

export const wishlistItemsCreateAction = {
    validator, exec,
};
