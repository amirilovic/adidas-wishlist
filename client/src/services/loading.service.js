import angular from 'angular';

function LoadingService($mdDialog) {
    return {
        show: (promise) => {
            $mdDialog.show({
                template: '<md-dialog style="background-color:transparent;box-shadow:none">' +
                    '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                    '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
                    '</div>' +
                    '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false
            });

            promise.finally(() => {
                $mdDialog.hide();
            });
        }
    }
}

export default LoadingService;