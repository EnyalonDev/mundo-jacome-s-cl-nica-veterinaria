
import React, { useState } from 'react';
import { WEB_CONTENT } from '../constants/content';

interface Review {
  author: string;
  text: string;
  stars: number;
  date: string;
  profilePhoto?: string;
}

const Testimonials: React.FC = () => {
  const { testimonials } = WEB_CONTENT;
  const [reviews] = useState<Review[]>(testimonials.initialReviews);

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-brand font-bold uppercase text-sm tracking-[0.3em]">{testimonials.tag}</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mt-2">{testimonials.title}</h3>
            <div className="flex items-center justify-center md:justify-start mt-4 space-x-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-slate-900 font-black text-xl">{testimonials.rating}</span>
              <span className="text-slate-400 font-medium ml-2">{testimonials.ratingLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden pause-on-hover py-8">
        <div className="animate-infinite-scroll space-x-8 px-4 flex">
          {duplicatedReviews.map((review, index) => (
            <div 
              key={index} 
              className="w-[350px] sm:w-[450px] bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-2 select-none flex-shrink-0"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex space-x-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < review.stars ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 font-medium italic text-lg sm:text-xl leading-relaxed mb-8">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center space-x-5 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand font-black text-lg sm:text-xl shadow-inner overflow-hidden">
                  {review.profilePhoto ? (
                    <img src={review.profilePhoto} alt={review.author} className="w-full h-full object-cover" />
                  ) : (
                    review.author[0]
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base sm:text-lg leading-tight">{review.author}</h4>
                  <p className="text-[10px] text-brand font-bold uppercase tracking-wider mt-1">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">
          {testimonials.verificationTag}
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
