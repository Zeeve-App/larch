import iconNetwork from '../../components/assets/My-Network.svg';
import iconTemplate from '../../components/assets/template.svg';
import iconActivity from '../../components/assets/Activity.svg';
import Card from './components/card';

export default function Dashboard() {
  return (
    <div className='h-full bg-black p-6'>
      {/* eslint-disable-next-line max-len */}
      <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
        <h3 className='text-white font-rubik text-xl font-bold'>Explore Dashboard</h3>
        <div className='flex flex-row gap-6 flex-wrap'>
          <Card
            cardTitle='Networks'
            cardLink='/network'
            cardIconSrc={iconNetwork}
            cardDescription='Create and list networks'
          />
          <Card
            cardTitle='Templates'
            cardLink='/template'
            cardIconSrc={iconTemplate}
            cardDescription='Create and list templates'
          />
          <Card
            cardTitle='Activity'
            cardLink='/activity'
            cardIconSrc={iconActivity}
            cardDescription='List activity actions'
          />
        </div>
      </div>
    </div>
  );
}
