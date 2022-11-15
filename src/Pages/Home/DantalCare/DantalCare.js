import React from 'react';
import tretment from '../../../assets/images/treatment.png';
import PraimaryButton from '../../../components/PraimaryButtton/PraimaryButton';
import '../../../commonStyles/style.css'

const DantalCare = () => {
  return (
   <div className='common-w py-16'>
     <div className="hero">
      <div className="hero-content flex-col lg:flex-row items-center gap-16">
        <img src={tretment} className="w-full md:w-1/2 rounded-lg shadow-2xl" alt=''/>
        <div>
          <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
          <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
           <PraimaryButton>GetStart</PraimaryButton>
        </div>
      </div>
    </div>
   </div>
  );
};

export default DantalCare;