
const cacheVersion = 'v1';

//缓存文件列表

const cacheList = [
    '/',
    'index.html',
    'logo.png'
]

//install

self.addEventListener('install', (event) =>{
    // 如果查到文件没有缓存，则会发送请求去获取，并且会带上 cache-bust 的 query string
    event.waitUntil(
        caches.open(cacheVersion)
            //箭头函数在这里将缓存返回
            .then(cache => cache.addAll(cacheList))
    )
})

//缓存捕获
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response){
                    return response;
                }
                console.log(event.request, event.request.url);
                return fetch(event.request);
            })
    )
})

//update更新
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
				return cacheNames.filter(name => {
							if(name !== cacheStorageKey){
								return name;
							}
						}).map(name => {
							if (name !== cacheStorageKey) {
								return caches.delete(name)
							}
						})
			})
        
    )
})
