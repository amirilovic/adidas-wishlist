import angular from 'angular';
import WishlistController from './wishlist.controller';
import components from '../components/components';
import services from '../services/services';

const MODULE_NAME = 'app.wishlist';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages', components, services])
    .config(($stateProvider) => {
        $stateProvider.state({
            name: 'wishlist',
            parent: 'app',
            url: '/wishlist',
            controller: WishlistController,
            template: require('./wishlist.html'),
            controllerAs: '$ctrl'
        })
    });

export default MODULE_NAME;