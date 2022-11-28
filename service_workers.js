//Asignar un nombre y versión de caché
const CACHE_NAME = 'V1_cache_Programado_Ajax',
  urlsCache = [
    './',
    './clientes.html',
    './contacto.html',
    './index.html',
    './inicio.html',
    './quienes.html',
    './servicios.html',
    './css/estilos.css',
    './js/index.js',
    './pwa/images/icon/rappi-192.png'
  ]

//durante la fase de instalacion, generalmente se almacenan en caché los archivos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsCache)
        .then(() => self.skipWaiting())
    })
    .catch(err => console.log("Falló registro de caché"))
  )
})
//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
      .then(cachesNames => {
        cacheNames.map(cacheName => {
          //Eliminamos lo que ya no se necesita en caché
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      })
    //Le indica a SW activar el caché actual
    .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera el url real
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
        //recuperado del cache
          return res
        }
        //recupera la petición de la url
        return fetch(e.request)
    })
  )
})