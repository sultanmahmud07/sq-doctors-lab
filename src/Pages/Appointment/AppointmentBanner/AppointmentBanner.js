import chair from '../../../assets/images/chair.png';
import bgImage from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {

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
            <div className='mb-9 '>
              {/* Selectd calender component  */}
            <DayPicker
             mode="single"
             selected={selectedDate}
             onSelect={setSelectedDate}
             />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;