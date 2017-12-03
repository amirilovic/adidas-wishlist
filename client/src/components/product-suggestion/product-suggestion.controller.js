function ProductSuggestionController() {
    const ctrl = this;

    ctrl.$onInit = () => {
        if (ctrl.product.separatedSalePrice) {
            const parsedPrice = JSON.parse(ctrl.product.separatedSalePrice);
            const currency = parsedPrice.find((p) => p.isCurrency).value;
            const amount = parsedPrice.find((p) => !p.isCurrency).value;
            ctrl.formattedPrice = `${currency} ${amount}`;
        }
    }

    ctrl.toggleWishlist = () => {
        ctrl.onToggleWishlist(ctrl.product);
    }
}

export default ProductSuggestionController;