import { Link } from 'react-router-dom';

type CardProp = {
  cardTitle: string,
  cardLink: string,
  cardIconSrc: string,
  cardDescription: string,
};

export default function Card({
  cardTitle, cardLink, cardIconSrc, cardDescription,
}: CardProp) {
  return (
    <div className='flex flex-col gap-6 p-6 rounded-2xl border-2 border-border bg-black max-w-[350px]'>
      <Link to={cardLink}>
        <div className='w-74 h-50.5 p-0 gap-6.25 gap-y-1'>
          {/* eslint-disable-next-line max-len */}
          <div className='w-[68px] h-[68px] items-center flex justify-center content-center border-2 border-border mb-6 rounded-2xl border-solid'>
            <img className='w-8 h-8 ' src={cardIconSrc} alt='' />
          </div>
          <h4 className='text-white font-rubik leading-8 font-bold'>{cardTitle}</h4>
          <span className='text-gradient font-rubik leading-8'>Number: (5/100)</span>
          <p className='text-white font-rubik leading-8'>{cardDescription}</p>
        </div>
      </Link>
    </div>
  );
}
