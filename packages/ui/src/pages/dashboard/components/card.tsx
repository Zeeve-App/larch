import { Link } from 'react-router-dom';

type CardProp = {
  cardTitle: string,
  cardLink: string,
  cardIconSrc: string,
  cardDescription: string,
  records: string,
};

export default function Card({
  cardTitle, cardLink, cardIconSrc, cardDescription, records,
}: CardProp) {
  return (
    <div className='w-full gap-6 p-6 rounded-2xl border-2 border-border bg-black'>
      <Link to={cardLink}>
        <div className=''>
          {/* eslint-disable-next-line max-len */}
          <div className='w-20 h-20 items-center flex justify-center content-center border-2 border-border mb-6 rounded-2xl border-solid'>
            <img className='w-8 h-8 ' src={cardIconSrc} alt='' />
          </div>
          <h4 className='text-white font-rubik leading-8 font-bold'>{cardTitle}</h4>
          <span className='text-gradient font-rubik leading-8'>
            Records:
            {' '}
            {records || 'N/A'}
          </span>
          <p className='text-gray-400 font-rubik leading-8'>{cardDescription}</p>
        </div>
      </Link>
    </div>
  );
}
