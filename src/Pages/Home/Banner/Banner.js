import React from 'react';
import '../../../commonStyles/style.css';
import chair from '../../../assets/images/chair.png';
import PraimaryButton from '../../../components/PraimaryButtton/PraimaryButton';
import bgImage from '../../../assets/images/bg.png';

const Banner = () => {
  return (
    <section
    style={{
      background: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
    >
      <div className='common-w'>
      <div className="lg:py-28 sm:py-10">
        <div className="flex flex-col justify-between lg:flex-row-reverse lg:p-7 ">
          <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
          <div className='mb-9'>
            <h1 className="text-3xl md:text-6xl text-neutral font-semibold mt-7">Your New Smile Starts Here</h1>
            <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
            <PraimaryButton>GetStart</PraimaryButton>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Banner;