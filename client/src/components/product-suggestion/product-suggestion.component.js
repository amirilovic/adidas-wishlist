import ProductSuggestionController from './product-suggestion.controller';
import './product-suggestion.css'

const productSuggestionComponent = {
    restrict: 'E',
    bindings: {
        product: '<',
        onToggleWishlist: '&',
    },
    template: require('./product-suggestion.html'),
    controller: ProductSuggestionController
};

export default productSuggestionComponent;