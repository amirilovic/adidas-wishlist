const config = require('config');

function ApiService($http) {
    var root = config.api.root;
    return {
        search: (query) => {
            return $http({
                method: 'GET',
                url: 'https://www.adidas.co.uk/api/suggestions/' + query
            }).then(function (res) {
                return res.data;
            });
        },
        wishlistItems: {
            create: (payload) => {
                return $http({
                    method: 'POST',
                    url: root + '/wishlist-items',
                    data: {
                        suggestion: payload.suggestion,
                        image: payload.image,
                        url: payload.url,
                        rating: payload.rating,
                        reviews: payload.reviews,
                        separatedSalePrice: payload.separatedSalePrice,
                        separatedStandartPrice: payload.separatedStandartPrice,
                        subTitle: payload.subTitle,
                        isPreorder: payload.isPreorder,
                    }
                }).then(function (res) {
                    return res.data;
                });
            },
            delete: (id) => {
                return $http({
                    method: 'DELETE',
                    url: root + '/wishlist-items/' + id,
                }).then(function (res) {
                    return res.data;
                });
            },
            all: () => {
                return $http({
                    method: 'GET',
                    url: root + '/wishlist-items',
                }).then(function (res) {
                    return res.data;
                });
            }
        }
    }
}

export default ApiService;