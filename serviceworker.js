/*Catching*/
// Making the array of files that will be added to the cache storage
const files = [
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/media.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
]


// Adding event listener to install all the files into the cache storage after it is opened
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('udacity-project-5').then(function(cache) {
            return cache.addAll(files);
        })
    );
});


/*Fetching*/
// Checking to see if response is found when going though app. If not, will fetch the request that was not found.
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Found Response!');
                return response;
            } else {
                console.log('Could Not Find Response! Getting ', e.request, ' Now!');
                return fetch(e.request).then(function(response) {
                    var responseClone = response.clone();
                    caches.open('udacity-project-5').then(function(cache) {
                        cache.put(e.request, responseClone);
                    });
                    return response;
                });
            }
        })
    );
});
