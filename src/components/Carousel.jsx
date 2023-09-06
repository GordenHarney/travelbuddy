// const Carousel = () => {
//   return (
//     <div>
//       <div className="carousel w-full h-screen">
//         <div id="slide1" className="carousel-item relative w-full">
//           <img
//             src="/resources/images/Section-1/nav1.jpg"
//             className="w-full h-auto"
//           />
//           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//             <a href="#slide6" className="btn btn-circle">
//               ❮
//             </a>
//             <a href="#slide2" className="btn btn-circle">
//               ❯
//             </a>
//           </div>
//         </div>
//         <div id="slide2" className="carousel-item relative w-full">
//           <img
//             src="/resources/images/Section-1/nav2.jpg"
//             className="w-full h-auto"
//           />
//           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//             <a href="#slide1" className="btn btn-circle">
//               ❮
//             </a>
//             <a href="#slide3" className="btn btn-circle">
//               ❯
//             </a>
//           </div>
//         </div>
//         <div id="slide3" className="carousel-item relative w-full">
//           <img
//             src="/resources/images/Section-1/nav3.jpg"
//             className="w-full h-auto"
//           />
//           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//             <a href="#slide2" className="btn btn-circle">
//               ❮
//             </a>
//             <a href="#slide4" className="btn btn-circle">
//               ❯
//             </a>
//           </div>
//         </div>
//         <div id="slide4" className="carousel-item relative w-full">
//           <img
//             src="/resources/images/Section-1/nav4.jpg"
//             className="w-full h-auto"
//           />
//           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//             <a href="#slide3" className="btn btn-circle">
//               ❮
//             </a>
//             <a href="#slide5" className="btn btn-circle">
//               ❯
//             </a>
//           </div>
//           <div id="slide5" className="carousel-item relative w-full">
//             <img
//               src="/resources/images/Section-1/nav5.jpg"
//               className="w-full h-auto"
//             />
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <a href="#slide4" className="btn btn-circle">
//                 ❮
//               </a>
//               <a href="#slide6" className="btn btn-circle">
//                 ❯
//               </a>
//             </div>
//           </div>
//           <div id="slide6" className="carousel-item relative w-full">
//             <img
//               src="/resources/images/Section-1/nav6.jpg"
//               className="w-full h-auto"
//             />
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <a href="#slide5" className="btn btn-circle">
//                 ❮
//               </a>
//               <a href="#slide1" className="btn btn-circle">
//                 ❯
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import { useState } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/resources/images/Section-1/nav1.jpg",
    "/resources/images/Section-1/nav2.jpg",
    "/resources/images/Section-1/nav3.jpg",
    "/resources/images/Section-1/nav4.jpg",
    "/resources/images/Section-1/nav5.jpg",
    "/resources/images/Section-1/nav6.jpg"
  ];

  const goNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel carousel-center w-full h-screen">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slideSrc, index) => (
          <div className="carousel-item relative w-full" key={index}>
            <img src={slideSrc} className="w-full h-auto" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button onClick={goPrev} className="btn btn-circle">
                ❮
              </button>
              <button onClick={goNext} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
