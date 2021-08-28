
import { Transition } from 'react-transition-group';
import Section from 'components/Section';
import { reflow } from 'utils/transition';
import './Profile.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const Slider = ({ children, id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (

    <Transition in={visible} timeout={0} onEnter={reflow}>
      <div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          pagination={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>{children}</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
    </Transition>
  );
};

export default Slider;