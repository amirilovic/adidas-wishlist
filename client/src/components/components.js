import angular from 'angular';

import productSuggestionComponent from './product-suggestion/product-suggestion.component';
import ratingComponent from './rating/rating.component';


const MODULE_NAME = 'app.components';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages'])
    .component('productSuggestion', productSuggestionComponent)
    .component('rating', ratingComponent)

export default MODULE_NAME;