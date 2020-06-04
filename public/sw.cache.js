const IMG_CDN = 'https://images.weserv.nl/?url=img.pokemondb.net'
const CACHE_NAME = 'pokemon-images'

const imgRgx = new RegExp(/^(https:\/\/images.weserv.nl\/)/)
const matchFunction = ({ url }) => imgRgx.test(url.href)

const handler = new self.workbox.strategies.CacheFirst({
  plugins: [
    new self.workbox.cacheableResponse.Plugin({
      statuses: [0, 200, 304]
    })
  ],
  cacheName: CACHE_NAME
})

self.workbox.routing.registerRoute(
  matchFunction,
  handler
)

const cachePokemonImages = async names => {
  const data = names.map(name => {
    return `${IMG_CDN}/sprites/home/normal/${name}.png`
  })

  console.log('Caching pokémon images...')

  await caches.open(CACHE_NAME)
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
