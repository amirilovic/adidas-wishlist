import angular from 'angular';
import ApiService from './api.service';
import LoadingService from './loading.service';

const MODULE_NAME = 'app.services';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages'])
    .service('ApiService', ApiService)
    .service('LoadingService', LoadingService);

export default MODULE_NAME;