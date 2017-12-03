function WishlistController(ApiService, $scope, LoadingService) {
    const ctrl = this;
    ctrl.searchResult = [];
    ctrl.wishlist = [];

    const loadWishlist = () => {
        return ApiService.wishlistItems.all().then((data) => {
            data.forEach((p) => {
                p.inWishlist = true;
            })
            ctrl.wishlist = data;
        });
    }

    LoadingService.show(
        loadWishlist()
    );

    ctrl.toggleWishlist = (product) => {
        LoadingService.show(
            toggleProduct(product).then(() => {
                return loadWishlist();
            })
        );
    }

    const toggleProduct = (product) => {
        const p = ctrl.wishlist.find((p) => p.url === product.url)
        if (p) {
            return ApiService.wishlistItems.delete(p.id);
        }
    }

    ctrl.navigate = (product) => {
        window.open(product.url);
    }
}

export default WishlistController;