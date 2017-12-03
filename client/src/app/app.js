import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-messages';
import uiRouter from "@uirouter/angularjs";

import {
  AppComponent
} from './app.component';

import search from '../search/search';
import wishlist from '../wishlist/wishlist';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages', uiRouter, search, wishlist])
  .config(($stateProvider, $locationProvider, $mdThemingProvider, $httpProvider) => {
    $mdThemingProvider.definePalette('black', {
      '50': '000000',
      '100': '000000',
      '200': '000000',
      '300': '000000',
      '400': '000000',
      '500': '000000',
      '600': '000000',
      '700': '000000',
      '800': '000000',
      '900': '000000',
      'A100': '000000',
      'A200': '000000',
      'A400': '000000',
      'A700': '000000',
      'contrastDefaultColor': 'light'
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('black');
    $locationProvider.html5Mode(true);
    $stateProvider.state({
      name: 'app',
      redirectTo: 'search',
      component: 'app'
    });

    $httpProvider.interceptors.push(function ($q, $injector, $log, $timeout) {

      function showErrorIfNotHandled(response, handler) {
        $timeout(function () {
          if (!response.handled) {
            handler();
          }
        });
      }

      function getErrorHandler(response) {
        let serverMessage;
        if (response.status === 401) {
          serverMessage = "Unauthorized!";
        }

        if (response.status === 403) {
          serverMessage = "Forbidden!"
        }

        if (response.status === 400) {
          serverMessage = "Bad input data!";
        }

        if (response.status === 404) {
          serverMessage = "Resource not found!";
        }

        if (response.status >= 500) {
          serverMessage = 'Ups somenthing went wrong :(';
        }

        serverMessage = serverMessage || 'Unknown error!';

        return function () {
          const msg = $injector.get('$mdDialog').alert({
            title: 'Error',
            textContent: serverMessage,
            ok: 'Close'
          });
          $injector.get('$mdDialog').show(msg);
        };
      }

      return {
        responseError: function (response) {
          $log.error('***** HTTP RESPONSE ERROR ****');
          $log.error(response);
          $log.error('******************************');

          var errorHandler = getErrorHandler(response);
          showErrorIfNotHandled(response, errorHandler);

          return $q.reject(response);
        }

      };
    });

  })
  .component('app', AppComponent);

export default MODULE_NAME;