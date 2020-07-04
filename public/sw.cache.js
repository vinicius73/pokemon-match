const IMG_CDN = 'https://images.weserv.nl/?url=img.pokemondb.net'
const IMAGE_CACHE_NAME = 'pokemon-images'
const CDN_CACHE_NAME = 'cdn'

const imgRgx = new RegExp(/^(https:\/\/images.weserv.nl\/)/)
const cdnRgx = [
  new RegExp(/^(https:\/\/fonts.googleapis.com\/)/),
  new RegExp(/^(https:\/\/fonts.gstatic.com\/)/),
  new RegExp(/^(https:\/\/cdn.jsdelivr.net\/)/)
]

const buildHandle = cacheName => {
  return new self.workbox.strategies.CacheFirst({
    plugins: [
      new self.workbox.cacheableResponse.Plugin({
        statuses: [0, 200, 304]
      })
    ],
    cacheName
  })
}

self.workbox.routing.registerRoute(
  ({ url }) => imgRgx.test(url.href),
  buildHandle(IMAGE_CACHE_NAME)
)

self.workbox.routing.registerRoute(
  ({ url }) => cdnRgx.some(rgx => rgx.test(url.href)),
  buildHandle(CDN_CACHE_NAME)
)

const cachePokemonImages = async names => {
  const data = names.map(name => {
    return `${IMG_CDN}/sprites/home/normal/${name}.png`
  })

  console.log('Caching pokémon images...')

  await caches.open(IMAGE_CACHE_NAME)
    .then(cache => {
      return cache.addAll(data)
    })

  console.log('All images are cached now...')
}

self.addEventListener('message', async event => {
  if (event.data.action !== 'SET_POKEMON_IMAGE_CACHE') {
    return
  }

  await cachePokemonImages(event.data.data || [])
})
