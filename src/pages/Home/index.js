import classNames from 'classnames';
import Text from 'components/Text';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Intro from 'pages/Home/Intro';
import ProjectSummary from 'pages/Home/ProjectSummary';
import Profile from 'pages/Home/Profile';
import Slider from 'pages/Home/Slider';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import { useLocation } from 'react-router-dom';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import softDevImg from 'assets/gui-2311261.png';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import uiuxImage from 'assets/images/1.jpg';
import webDevImage from 'assets/images/3.jpg';
import mobileDevImage from 'assets/images/2.jpg';
import Image from 'components/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import './index.css';
import "swiper/swiper-bundle.css";
// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper';
const disciplines = ['Web Development', 'Mobile Development', 'UI/UX', 'SEO', 'Digital Marketing'];

// install Swiper modules
SwiperCore.use([Pagination]);
const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, details];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">


      <div className={"lines"}>
        <div className={"line"}></div>
        <div className={"line"}></div>
        <div className={"line"}></div>
      </div>
      <Helmet>
        <title>Social Staircase | Marketing Company</title>
        <meta
          name="description"
          content="Portfolio of Hamish Williams – a digital designer working on web &amp; mobile
          apps with a focus on motion and user experience design."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Web and Software Development"
        description="If you need to build a whole new process, it takes the right planning and process to get things right. Avoid overcomplicated solutions, wasted budget, and a delayed timescale by getting us involved early. We’ll help you plan, build, and ultimately deliver the perfect solution."
        buttonText="Learn More"
        buttonLink="/projects/project1"
        model={{
          type: 'laptop',
          alt: 'Project One lesson builder',
          textures: [
            {
              src: softDevImg,
              srcSet: `${softDevImg} 800w, ${softDevImg} 1440w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Mobile Development"
        description="With more people being addicted to smartphones and integrating it to almost everything in their life, communicating and paying bills, etc., it is a golden time for businesses to jump to the next level with a mobile application."
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              src: gamestackTexture,
              srcSet: `${gamestackTexture} 254w, ${gamestackTextureLarge} 508w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              src: gamestackTexture2,
              srcSet: `${gamestackTexture2} 254w, ${gamestackTexture2Large} 508w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="UI/UX"
        description="Want to create your product with a team that establishes a transparent design process, meets deadlines, and delivers a spot-on end result? Turn to Scenobard’s UI and UX services. Our design team may be a small design studio within an outsized software company which will assist you to build an enticing product easily and quickly."
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              src: sliceTexture,
              srcSet: `${sliceTexture} 980w, ${sliceTextureLarge} 1376w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <div id="details">
        <Swiper
          sectionRef={details}
          visible={visibleSections.includes(details.current)}
          id="details"
          spaceBetween={50}
          slidesPerView={1}
          pagination={true}
          style={{ textAlign: "center" }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <h1>Web Development</h1>

            <div className="d-flex-center">
              <div className="w-50">
                <Image className="slider-custom-image" src={webDevImage} />
              </div>
              <div className="w-50">
                <Text
                >
                  We create beautiful, fast, responsive, and secure websites and web applications tailored to your needs. We take care of all aspects of the web application of your project. We use the best possible frameworks for your business to satisfy users’ expectations. Our programmers are exceptional at what they do, whether you need a simple static website or a more complicated web application, our team will ensure you are happy with the result.

                  Websites should be considered as a living representation of your company. As your business develops so should your site. Your company may have recently gone through a period of expansion or the addition of new products or services. In these cases, it would be wise to consider re-developing your digital presence to guarantee it best reflects your current position, as well as offering a solid foundation for future changes.

                  After your website is developed, it needs to be hosted and maintained. Depending on your needs we have a wide range of hosting solutions that can be chosen to meet your goals. We also provide maintenance for your new website allowing us to keep it in good health as well as make changes where you see fit.

                  We rigorously test the performance of the developed site based on industry’s standards to evaluate it’s responsiveness, scalability, and stability.
                </Text>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <h1>Mobile Development</h1>
            <div className="d-flex-center">
              <div className="w-50">
                <Image className="slider-custom-image" src={mobileDevImage} />
              </div>
              <div className="w-50">
                <Text
                >
                  The value a mobile application creates and the ability it gives you to engage customers is really unbelievable. If you know that a mobile application can be a game-changer in your business, you are wonderful. No doubt, you can outstandingly energize your company performance by investing in a mobile app. With more people addicting to smartphones and using them for shopping, communicating and paying bills, etc., it is a golden time for businesses to jump to the next level with a mobile application.
                  Mobile applications are easy to use, highly responsive, and facile to navigate. If customers have your application on their hands, they feel really amazing about you. Undoubtedly this will pave your path to cement a long-lasting relationship with your customers and boost brand loyalty. If you’re thinking to develop an enterprise application, the benefits your enterprise will get really be breath-taking.
                  We create Android apps for a spectrum of business verticals. We are an ideal choice of businesses that include e-commerce companies, travel agencies, healthcare organizations, etc. We develop top-notch utility apps, enterprise apps, game apps, and food ordering apps at an affordable cost. With experienced developers, we craft fully-functional Android applications that are seamless on all devices.
                </Text>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-grid-center align-baseline">
              <div className=" noninverse">
                <h1>UI</h1>
                <Text
                >
                  Scenobard provides UI service for companies that wish to turn visitors of their websites and apps into potential buyers. UI facilitates interactions between users and websites or apps, and it maximizes the responsiveness, efficiency, and accessibility of your software. Our team of designers features a decade-long experience during this field and may help companies make their products stylish and good-looking, create unique and recognizable visual features, include high-quality graphic elements, exciting animation, and transitions. We prefer UI elements that are simple and clear, but original which will attract users. Designers confirm that the interface isn’t overloaded; it’s intuitive and allows natural interaction. When UX helps users accomplish their goals, UI creates a connection between the user and thus the service provider. Our UI designers aim to create keen brand awareness to assist your company to improve customer satisfaction, improve user interaction, and also boost your business growth.
                </Text>
              </div>
              <div className=" inverse">
                <h1>UX</h1>

                <Text
                >
                  User experience design services that we offer can turn all of your ideas into reality by using the newest tools and technologies within stated deadlines. UX design is significant because it makes your product appealing to the users and tries to fulfill the user’s needs and supply a positive experience. It helps you retain the users loyal to your brand and the services/products you offer. UX design is about understanding your user’s needs and making them your priority as today, companies that come from different industries try to make personalized approaches and offers to satisfy their customers. Scenobard’s team uses the newest tools and tech solutions to form it possible. We create clear, easy to use software that helps to define user journey on your website or app. Our team of experienced designers develops meaningful UX design that’s most conducive to business success and brings advantages both for your company and your users.
                </Text>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex-center ">
              <div className="w-50">
                <h1>Slide 4</h1>
                <Image className="slider-custom-image" src="https://picsum.photos/999/1000" />
              </div>
              <div className="w-50">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sed sunt qui magni! Nisi quasi ipsa animi, alias earum voluptatibus in impedit quia, omnis sint quod rem repellat, nesciunt eius aspernatur placeat eum aperiam ullam! Qui at distinctio nostrum reiciendis alias tenetur quo dignissimos nam repellat optio nobis labore perferendis omnis, dicta fugiat commodi ratione quia tempora eveniet eius odio voluptatum quaerat. Hic at deserunt nam nemo, nulla magnam dolore.</p>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id=""
      />
      <Footer />
    </div>
  );
};

export default Home;
