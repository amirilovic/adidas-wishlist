import RatingController from './rating.controller';
import './rating.css';

const ratingComponent = {
    restrict: 'E',
    bindings: {
        value: '<',
    },
    template: require('./rating.html'),
    controller: RatingController
};

export default ratingComponent;