import React from 'react';
import '../../../commonStyles/style.css';
import Banner from '../Banner/Banner';
import DantalCare from '../DantalCare/DantalCare';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import ConnectUs from './ConnectUs/ConnectUs';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <InfoCards></InfoCards>
      <Services></Services>
      <DantalCare></DantalCare>
      <MakeAppointment></MakeAppointment>
      <Testimonials></Testimonials>
      <ConnectUs></ConnectUs>
    </div>
  );
};

export default Home;