import angular from 'angular';
import components from '../components/components';
import services from '../services/services';
import SearchController from './search.controller';
import './search.css';


const MODULE_NAME = 'app.search';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages', components, services])
    .config(($stateProvider) => {
        $stateProvider.state({
            name: 'search',
            parent: 'app',
            url: '/',
            template: require('./search.html'),
            controller: SearchController,
            controllerAs: '$ctrl'
        })
    });

export default MODULE_NAME;