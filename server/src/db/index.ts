import { WishlistItemsRepository } from './wishlist-items-repository';

export const Db = {
    whishlistItemsRepository: new WishlistItemsRepository(),
};

export const dropDb = () => {
    Db.whishlistItemsRepository = new WishlistItemsRepository();
};
