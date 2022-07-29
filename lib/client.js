import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: "v61dqejc",
  dataset: 'production',
  apiVersion: '2022-07-28',
  useCdn:true,
  token:
  "skF7CVWaUBm628lP6epFWIiPH7FxFwnwZhKrBvFZj7tBsRatuOZyLsFbt126SYQK0vDfusCyjwGg6sQRINzklc4Z6DL34QuvmwLk1T4PiV8K0W4scNSDQxCwydImeX76kTgrcUdp9VfP6gNyTNcJfk4nzevQy572dFq6MczVJlfdTGlutALr"
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)