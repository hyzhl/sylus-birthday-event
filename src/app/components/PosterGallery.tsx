import { useRef } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const posters = [
  { id: 1, image: '/poster1.jpg', title: '应援海报 1' },
  { id: 2, image: '/poster2.jpg', title: '应援海报 2' },
  { id: 3, image: '/poster3.jpg', title: '应援海报 3' },
  { id: 4, image: '/poster4.jpg', title: '应援海报 4' },
  { id: 5, image: '/poster5.jpg', title: '应援海报 5' },
  { id: 6, image: '/poster6.jpg', title: '应援海报 6' },
  { id: 7, image: '/poster7.jpg', title: '应援海报 7' },
  { id: 8, image: '/poster8.jpg', title: '应援海报 8' },
  { id: 9, image: '/poster9.jpg', title: '应援海报 9' },
  { id: 10, image: '/poster10.jpg', title: '应援海报 10' },
  { id: 11, image: '/poster11.jpg', title: '应援海报 11' },
  { id: 12, image: '/poster12.jpg', title: '应援海报 12' },
];

export function PosterGallery() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const handleRegisterClick = () => {
    window.open('https://docs.qq.com/form/page/DZVJhRGZzZmxRTWJZ', '_blank');
  };

  return (
    <section className="py-12 bg-zinc-950 overflow-hidden">
      <div className="max-w-md mx-auto px-6 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
          应援海报欣赏
        </h2>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          onClick={handleRegisterClick}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-full shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
            <PlusCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">登记活动</span>
          </div>
        </motion.button>
      </div>

      <div className="relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Slider ref={sliderRef} {...settings}>
            {posters.map((poster) => (
              <div key={poster.id} className="px-2">
                <div className="relative group aspect-[3/4] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-medium text-white">{poster.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-red-500/30 hover:border-red-500/60 rounded-full transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-red-400" />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-red-500/30 hover:border-red-500/60 rounded-full transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className="w-2 h-2 rounded-full bg-red-500/30 hover:bg-red-500/60 transition-all"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}