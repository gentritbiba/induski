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
        title="Software Development"
        description="If you need to build a whole new process, it takes the right planning and process to get things right. Avoid overcomplicated solutions, wasted budget, and a delayed timescale by getting us involved early. We’ll help you plan, build, and ultimately deliver the perfect solution."
        buttonText="Click Me"
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
        buttonText="View Website"
        buttonLink="/projects/project1"
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
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        buttonText="View Project"
        buttonLink="/projects/slice"
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
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        style={{ textAlign: "center" }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="d-flex-center">
            <div className="w-50">
              <h1>Slide 1</h1>
              <Image className="slider-custom-image" src="https://picsum.photos/1000/1000" />
            </div>
            <div className="w-50">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sed sunt qui magni! Nisi quasi ipsa animi, alias earum voluptatibus in impedit quia, omnis sint quod rem repellat, nesciunt eius aspernatur placeat eum aperiam ullam! Qui at distinctio nostrum reiciendis alias tenetur quo dignissimos nam repellat optio nobis labore perferendis omnis, dicta fugiat commodi ratione quia tempora eveniet eius odio voluptatum quaerat. Hic at deserunt nam nemo, nulla magnam dolore.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex-center">
            <div className="w-50">
              <h1>Slide 2</h1>
              <Image className="slider-custom-image" src="https://picsum.photos/999/999" />
            </div>
            <div className="w-50">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sed sunt qui magni! Nisi quasi ipsa animi, alias earum voluptatibus in impedit quia, omnis sint quod rem repellat, nesciunt eius aspernatur placeat eum aperiam ullam! Qui at distinctio nostrum reiciendis alias tenetur quo dignissimos nam repellat optio nobis labore perferendis omnis, dicta fugiat commodi ratione quia tempora eveniet eius odio voluptatum quaerat. Hic at deserunt nam nemo, nulla magnam dolore.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex-center">
            <div className="w-50">
              <h1>Slide 3</h1>
              <Image className="slider-custom-image" src="https://picsum.photos/1000/999" />
            </div>
            <div className="w-50">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sed sunt qui magni! Nisi quasi ipsa animi, alias earum voluptatibus in impedit quia, omnis sint quod rem repellat, nesciunt eius aspernatur placeat eum aperiam ullam! Qui at distinctio nostrum reiciendis alias tenetur quo dignissimos nam repellat optio nobis labore perferendis omnis, dicta fugiat commodi ratione quia tempora eveniet eius odio voluptatum quaerat. Hic at deserunt nam nemo, nulla magnam dolore.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex-center">
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
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};

export default Home;
