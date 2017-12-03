export function AppCtrl($mdSidenav) {
    this.toggleLeft = () => {
        $mdSidenav('left').toggle();
    }
};