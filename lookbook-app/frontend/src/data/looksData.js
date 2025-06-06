export const looksData = [
  {
    id: 'look1',
    type: 'image',
    media: 'https://i.imgur.com/gK2Qy4k.jpeg',
    products: [
      {
        id: 'prod1',
        name: 'Floral Crop Top',
        price: '$29.99',
        imageUrl: 'https://i.imgur.com/gK2Qy4k.jpeg',
        annotation: { x: 50, y: 30 }, // Percentage coordinates
        link: 'https://example.com/product/floral-crop-top',
      },
      {
        id: 'prod2',
        name: 'Split Leg Trousers',
        price: '$49.99',
        imageUrl: 'https://i.imgur.com/gK2Qy4k.jpeg',
        annotation: { x: 30, y: 70 },
        link: 'https://example.com/product/split-leg-trousers',
      },
    ],
  },
  {
    id: 'look2',
    type: 'image',
    media: 'https://i.imgur.com/gK2Qy4k.jpeg',
    products: [
      {
        id: 'prod3',
        name: 'Leather Jacket',
        price: '$89.99',
        imageUrl: 'https://i.imgur.com/gK2Qy4k.jpeg',
        annotation: { x: 50, y: 20 },
        link: 'https://example.com/product/leather-jacket',
      },
      {
        id: 'prod4',
        name: 'Grey Trousers',
        price: '$39.99',
        imageUrl: 'https://i.imgur.com/gK2Qy4k.jpeg',
        annotation: { x: 50, y: 60 },
        link: 'https://example.com/product/grey-trousers',
      },
    ],
  },
  {
    id: 'look3',
    type: 'video',
    media: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-studio-with-a-pink-background-40073-large.mp4',
    products: [
      {
        id: 'prod5',
        name: 'Pink Dress',
        price: '$59.99',
        imageUrl: 'https://i.imgur.com/gK2Qy4k.jpeg',
        annotation: { x: 50, y: 50 },
        link: 'https://example.com/product/pink-dress',
      },
    ],
  },
];
