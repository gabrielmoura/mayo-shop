import * as argon2 from 'argon2';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pass = await argon2.hash('admin', {type: argon2.argon2id});
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: pass,
    },
  });

  console.log({admin});
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Torta de Morango',
        price: 249.00,
        img: 'https://xn--66-6kcaystgm1b9c.xn--p1ai/upload/iblock/245/xcuq5cosyavs0gsjgdzr0opaf8654ts2.jpg',
        album: ['https://thumbs.dreamstime.com/b/berry-pie-20808479.jpg', 'https://xn--66-6kcaystgm1b9c.xn--p1ai/upload/iblock/245/xcuq5cosyavs0gsjgdzr0opaf8654ts2.jpg'],
        description: 'Torta de frutas es una torta de frutas que se hace con frutas frescas, como manzanas, peras, uvas, fresas, etc.',
        size: ['pequena', 'media', 'grande'],
        collection: 'tortas',
        link: '/product/1',
      },
      {
        name: 'Bolo de Chocolate',
        price: 249.00,
        img: 'https://d1uz88p17r663j.cloudfront.net/resized/ccb0825dd7d49a6f23d7ead40e1617a9_bolo-trufado-chocolate-ao-leite-receitas-nestle_1200_600.jpg',
        album: ['https://pbs.twimg.com/media/EYuZuTSXkAEr0Qw?format=jpg&name=medium', 'https://d1uz88p17r663j.cloudfront.net/resized/ccb0825dd7d49a6f23d7ead40e1617a9_bolo-trufado-chocolate-ao-leite-receitas-nestle_1200_600.jpg'],
        description: 'Bolo de chocolate é um bolo de chocolate que se faz com chocolate fresco, como chocolate, chocolate, chocolate, chocolate, etc.',
        size: ['pequena', 'media', 'grande'],
        collection: 'bolo',
        link: '/product/2'

      }
    ],
  });
  console.log({products});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });