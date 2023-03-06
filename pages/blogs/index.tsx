import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import Banner from 'components/Banner';
import SearchBlogPage from 'components/SearchBlogPage';
import dogImg from 'public/img/hero-section/bitmap@3x.webp';
import BlogCard from 'components/BlogCard';
import style from 'styles/Blogs.module.css';
import { NextPageWithLayout } from 'types/next.types';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import { getRequest } from 'requests/api';
import { IHomePageResponse } from 'types/responses/homePage.response';
import MyPagination from '@/components/MyPagination/MyPagination';
import useWindowDimensions from '@/app/hooks/useWindowDimensions';

const description =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius dolorem labore explicabo odio nostrum dignissimos error facere, blanditiis modi qui aliquam obcaecati! Labore commodi quasi cupiditate porro excepturi natus doloremque sunt. Ea corrupti non facilis ratione quas totam, delectus omnis laborum veritatis repudiandae numquam nihil laudantium, iste aperiam nisi eaque alias voluptate odio deserunt exercitationem, aut animi nobis dolore? Deleniti minima rem quibusdam, neque mollitia obcaecati deserunt adipisci excepturi provident autem saepe placeat voluptatem hic natus ipsa facilis aliquam sint nam consequatur quo? Ratione ad quos vitae, corrupti veniam vero sit qui rem aspernatur accusamus harum amet dolorum exercitationem minima.';
const title1 = 'Pros and Cons of Maltipoo Ownership  Should You qweqweqwqweqweqwe qwe qwe qwe q';
const title2 = 'Dog Winter Care with HUFT';
const date = 'October 27, 2021';

type Сard = {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
};

const data: Сard[] = [
  {
    id: 1,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 2,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 3,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 4,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 5,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 6,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 7,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 8,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 9,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 10,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 11,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 12,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 13,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 14,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 15,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 16,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 17,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 18,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 19,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 20,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 21,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 22,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 23,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 24,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 25,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 26,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 27,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 28,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 29,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 30,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 31,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 32,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 1,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 2,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 3,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 4,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 5,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 6,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 7,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 8,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 9,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 10,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 11,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 12,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 13,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 14,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 15,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 16,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 17,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 18,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 19,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 20,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 21,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 22,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 23,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 24,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 25,
    image: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
    title: title1,
    description,
    date,
  },
  {
    id: 26,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 27,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 28,
    image: 'img/recent-blogs/blog-image-2@2x.webp',
    title: title1,
    description: description,
    date,
  },
  {
    id: 29,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 30,
    image: 'img/recent-blogs/blog-image-1@2x.webp',
    title: title2,
    description: description,
    date,
  },
  {
    id: 31,
    image: '/img/recent-blogs/blog-image-3@2x.webp',
    title: title2,
    description: description,
    date,
  },
];

const Blogs: NextPageWithLayout = () => {
  const [currentItems, setCurrentItems] = useState<Сard[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { width } = useWindowDimensions();
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  return (
    <div className={style.main}>
      <Banner title="Blog" image={dogImg} description={undefined} />
      <SearchBlogPage placeholder="Search your Blog" />
      <div className={style.wrapper}>
        <div className={style.content}>
          {currentItems.map((el, index) => (
            <BlogCard
              id={el.id}
              big={index === 0 || index % 8 === 0}
              key={el.id}
              image={el.image}
              title={`${el.title} ${el.id}`}
              date={el.date}
              description={el.description}
            />
          ))}
        </div>
      </div>
      <div className={style.PaginateWrapper}>
        <MyPagination items={data} pageCount={pageCount} setItemOffset={setItemOffset} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

// export const getServerSideProps = createGetServerSidePropsFn(Blogs,async () => {
//     const response = await getRequest<IHomePageResponse>('/articles');
//     return {
//       props: {
//         featuredProducts: response
//       },
//     };
//    } );

Blogs.Layout = MainLayout;

export default Blogs;
