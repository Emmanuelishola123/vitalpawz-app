import React from 'react';
import createGetServerSidePropsFn from 'shared/createGetServerSidePropsFn';
import MainLayout from 'layouts/MainLayout';
import style from 'styles/BlogPage.module.scss';
import BlogCard from '@/components/BlogCard';


const description =  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius dolorem labore explicabo odio nostrum dignissimos error facere, blanditiis modi qui aliquam obcaecati! Labore commodi quasi cupiditate porro excepturi natus doloremque sunt. Ea corrupti non facilis ratione quas totam, delectus omnis laborum veritatis repudiandae numquam nihil laudantium, iste aperiam nisi eaque alias voluptate odio deserunt exercitationem, aut animi nobis dolore? Deleniti minima rem quibusdam, neque mollitia obcaecati deserunt adipisci excepturi provident autem saepe placeat voluptatem hic natus ipsa facilis aliquam sint nam consequatur quo? Ratione ad quos vitae, corrupti veniam vero sit qui rem aspernatur accusamus harum amet dolorum exercitationem minima.';

interface IRelatedPostsMock {
  image: string,
  title: string,
  description: string,
  date: string,
  id: number
}

const relatedPostsMock: IRelatedPostsMock[] = [
  { 
    image: '../img/blogPage/img1.png' ,
    title: 'Dog Winter Care with HUFT',
    description,
    date: 'October 27, 2021',
    id: 1,  
  },
  { 
    image: '../img/blogPage/img2.png' ,
    title: 'Dog Winter Care with HUFT',
    description,
    date: 'October 27, 2021',
    id: 2,  
  },
  { 
    id: 3,
    image: '../img/blogPage/img3.png' ,
    title: 'Pros and Cons of Maltipoo Ownership – Should You Get',
    description,
    date: 'October 27, 2021',
  },
] 

const Id = () => {
    // const router = useRouter()
    // useEffect(() => {
    //     getRequest('/articles')
    // },[]);
    
    // console.log(router);
  return (
    <div className={style.blogPage}>
      <div className={style.blogPageLayout}>
        <div className={style.blogPageHeaderWrapper}>
          <h2>7 Best Dog Toys That Your Dog Will  Absolutely Love!</h2>
        </div>
        <div className={style.publishedInfo}>
          <span>Published on <b>Nov 25, 2021</b></span>
          <span> by <b>Olivia Richman</b></span>
        </div>
        <div className={style.mainImgSmallScreen}>
          <img src='../../img/blogPage/mainIng.png' alt="mainImg" />
        </div>
        <div className={style.BlogPageText}>
          <p>
            Proper training is essential for a long, happy and safe relationship with your dog as it sets the foundation for
            physical fitness, mental alertness, social engagement and emotional stability. Dogs thrive when they are
            shown what we prefer them to do to fit into their family&apos;s routine. When they&apos;re left without an understanding
            of what&apos;s preferred they may create their own habits and routines. A dog who&apos;s properly trained is also better
            company, which makes social outings and home visits much less stressful.
          </p>

          <p>
            As a pet parent, it&apos;s important to remember that training happens every time you interact with your dog and
            occurs throughout your dog&apos;s life. Patience is one of the keys to successful training. Training that&apos;s done
            improperly-or inconsistently-is less effective. The best way to ensure that your dog is properly trained and
            that their training sticks, is to enroll them in professional training classes with a certified dog trainer.
          </p>
        </div>
        <div className={style.mainImg}>
          <img src='../../img/blogPage/mainIng.png' alt="mainImg" />
        </div>
        <h3 className={style.BlogPageH3}>How dog training works</h3>
        <div className={style.BlogPageText}>
          <p>
            If you&apos;ve never been through dog training, it&apos;s helpful to know how it works before you sign up. You&apos;ll learn what to
            expect with each class and be able to continue following the proper training principles at home.
          </p>
          <p>
            The Petco-certified Positive Dog Trainers at Petco abide by a science-based, positive reinforcement dogtraining philosophy. This means that 
            training classes follow rewards-based, fun and effective methods to instill positive behaviors and that appeal to your dog. Training focuses 
            on rewarding dogs for doing things correctly, making them more likely to repeat those behaviors, while dissuading negative behaviors through
            management and refocusing tactics. Positive reinforcement training has been proven effective in not only training any type learner but also 
            in building a strong bond between pet parents and their dogs.
          </p>
          <p>
            Petco offers dog training classes for every level of learner in an environment 
            that sets both dog and pet parent up to succeed long after classes have ended. Here&apos;s what&apos;s offered:
          </p>
        </div>
        <div className={style.BlogPageUlWrapper}>
          <ul className={style.BlogPageUl}>
            <li className={style.BlogPageLi}>
              <b>Puppy Level 1</b>: This is a 6-week introductory group class for 2- to 4-month-old puppies. 
              It covers the basics that every puppy needs, including socialization, potty training, preventing/redirecting chewing, digging and more.
            </li>
            <li>
              <b>Puppy Level 2</b>: This 6-week group class for 4- to 6-month-old puppies expands upon the basics learned in Level 1, 
              plus introduces the concept of establishing behaviors as routine and teaches fun games to keep puppies mentally stimulated and engaged.
            </li>
            <li>
              <b>Adult Dog Level 1</b>: This 6-week course is designed for dogs over 6 
              months old to establish better communication with pet parents. Cues like “leave it” and “wait” will be covered,
              along with loose-leash walking and mitigating undesirable behaviors like jumping, barking and digging.
            </li>
            <li>
              <b>Adult Dog Level 2</b>: This 6-week course designed for dogs who have graduated from Adult Dog Level 1 covers more advanced 
              and complex training environments to ensure you and your dog are ready for more distracting situations. Additional fun games 
              for physical and mental stimulation are also covered.
            </li>
            <li>
              <b>Private Training Lessons</b>: More customized training solutions and one-on-one instruction built for the training goals you have 
              for your dog are offered. These lessons can be conducted at a Petco location or in your home (where available).
            </li>
          </ul>
        </div>
        <div className={style.BlogPageAuthorCart}>
          <div className={style.BlogPageAuthorCartImg}>
            <img src="../../img/blogPage/avatarImg.png" alt="author" />
          </div>
          <div className={style.BlogPageAuthorCartContent}>
            <h3>Published by <mark>Olivia Richman</mark></h3>
            <p>
              I am a New York Times bestselling author.
              The Wall Street Journal calls me a top influencer on the web, Forbes says I am one of the top 10 marketers, and Entrepreneur Magazine.
            </p>
          </div>
        </div>
      </div>
      <div className={style.RelatedBlogs}>
        <div className={style.RelatedBlogsWrapper}>
          <h2>
            Related Blogs
          </h2>
          <div className={style.RelatedBlogsCards}>
            { relatedPostsMock.map(post => <BlogCard related={true} key={post.id} id={post.id} title={post.title} description={post.description} date={post.date} image={post.image} />) }
          </div>
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = createGetServerSidePropsFn(Id);
Id.Layout = MainLayout;

export default Id;