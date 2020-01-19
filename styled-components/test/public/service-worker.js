const VERSION = 206;
const CACHE_NAME = `stolen-cra-cache-${VERSION}`;
const BUILD_FOLDER = '';
const PRECACHE_MANIFEST = `${BUILD_FOLDER}/resources-manifest.json`;

self.addEventListener('install', event => {
    event.waitUntil(
        new Promise(resolve => {
            caches
                .open(CACHE_NAME)
                .then(cache => {
                    return fetch(PRECACHE_MANIFEST)
                        .then(resp => resp.json())
                        .then(jsonResp => {
                            return cache.addAll(['/', ...jsonResp.TO_CACHE.map(name => `${BUILD_FOLDER}/${name}`)]);
                        })
                        .then(resolve);
                })
                .catch(err => console.error('SW errors', err));
        })
    );
});

self.addEventListener('activate', function onActivate(event) {
    event.waitUntil(
        caches.keys().then(keys => {
            return keys.filter(key => key !== CACHE_NAME).forEach(key => caches.delete(key));
        })
    );
});

self.addEventListener('fetch', function onFetch(event) {
    if (event.request.url.indexOf(location.origin) === 0) {
        event.respondWith(cacheOrNetwork(event));
    }
});

function cacheOrNetwork(event) {
    const clonedRequest = event.request.clone();
    return caches.match(event.request).then(resp => resp || fetch(clonedRequest));
}
