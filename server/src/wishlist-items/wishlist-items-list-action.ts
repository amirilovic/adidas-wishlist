import * as Joi from 'joi';
import { IWishlistItem } from '../entities/wishlist-item';
import { Db } from '../db/index';
import { ValidationError } from '../errors/index';

const validator = {
};

const exec = async (params: any) => {
    const vr = Joi.validate(params, validator);

    if (vr.error) {
        throw ValidationError.fromJoi(vr.error);
    }

    const wishlistItem = await Db.whishlistItemsRepository.findAll();

    return wishlistItem;
};

export const wishlistItemsListAction = {
    validator, exec,
};
