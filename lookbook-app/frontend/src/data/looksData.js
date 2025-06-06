export const looksData = [
  {
    id: 'look1',
    type: 'image',
    media: 'https://via.placeholder.com/1260x750.png?text=Look1+Main+Image',
    products: [
      {
        id: 'prod1',
        name: 'Product A - Top',
        price: '$29.99',
        imageUrls: [
          'https://via.placeholder.com/600x400.png?text=Product+Image+1',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 50, y: 30 },
        link: 'https://example.com/product/a',
      },
      {
        id: 'prod2',
        name: 'Product B - Bottom',
        price: '$49.99',
        imageUrls: [
          'https://via.placeholder.com/600x400.png?text=Product+Image+1',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 30, y: 70 },
        link: 'https://example.com/product/b',
      },
    ],
  },
  {
    id: 'look2',
    type: 'image',
    media: 'https://via.placeholder.com/1260x750.png?text=Look2+Main+Image',
    products: [
      {
        id: 'prod3',
        name: 'Product C - Jacket',
        price: '$89.99',
        imageUrls: [
          'https://images.pexels.com/photos/157675/fashion-men-s-fashion-blazer-jacket-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 50, y: 20 },
        link: 'https://example.com/product/c',
      },
      {
        id: 'prod4',
        name: 'Product D - Shoes',
        price: '$39.99',
        imageUrls: [
          'https://images.pexels.com/photos/157675/fashion-men-s-fashion-blazer-jacket-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 50, y: 60 },
        link: 'https://example.com/product/d',
      },
    ],
  },
  {
    id: 'look3',
    type: 'video',
    media: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    products: [
      {
        id: 'prod5',
        name: 'Product E - Dress',
        price: '$79.99',
        imageUrls: [
          'https://via.placeholder.com/600x400.png?text=Product+Image+1',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 40, y: 40 },
        link: 'https://example.com/product/e',
      },
      {
        id: 'prod6',
        name: 'Product F - Accessories',
        price: '$59.99',
        imageUrls: [
          'https://images.pexels.com/photos/157675/fashion-men-s-fashion-blazer-jacket-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1852083/pexels-photo-1852083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        annotation: { x: 60, y: 50 },
        link: 'https://example.com/product/f',
      },
    ],
  },
];
