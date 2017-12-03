import {
    AppCtrl
} from './app.controller';
import '../style/app.css';

export const AppComponent = {
    template: require('./app.html'),
    controller: AppCtrl,
    controllerAs: 'app'
};