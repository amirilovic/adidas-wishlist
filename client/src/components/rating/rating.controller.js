function RatingController() {
    const ctrl = this;
    ctrl.stars = [];

    ctrl.$onInit = () => {
        let value = parseFloat(ctrl.value);
        value = isNaN(value) ? 0 : value;

        for (let i = 1; i <= 5; i++) {
            const star = {
                name: 'star_border'
            };
            if (i <= value) {
                star.name = 'star';
            } else if (i > value) {
                if (i - 1 < value) {
                    star.name = 'star_half'
                }
            }
            ctrl.stars.push(star);
        }
    }
}

export default RatingController;