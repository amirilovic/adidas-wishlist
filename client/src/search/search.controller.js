function SearchController(ApiService, $scope, LoadingService) {
    const ctrl = this;
    ctrl.searchResult = [];
    ctrl.wishlist = [];

    const loadWishlist = () => {
        return ApiService.wishlistItems.all().then((data) => {
            ctrl.wishlist = data;
        });
    }

    LoadingService.show(
        loadWishlist()
    );

    $scope.$watch(() => {
        return ctrl.searchInput
    }, () => {
        if (!ctrl.searchInput) {
            ctrl.searchResult = [];
            return;
        }
        ApiService.search(ctrl.searchInput).then((data) => {
            data.products.forEach((product) => {
                product.inWishlist = inWishlist(product);
            });
            ctrl.searchResult = data.products;
        });
    });

    ctrl.toggleWishlist = (product) => {
        console.log('toggle: ' + product.url);
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
        return ApiService.wishlistItems.create(product);
    }

    ctrl.navigate = (product) => {
        window.open(product.url);
    }

    const inWishlist = (product) => {
        return !!findInWishlist(product.url);
    }

    const findInWishlist = (url) => {
        return ctrl.wishlist.find((p) => p.url === url)
    }
}

export default SearchController;