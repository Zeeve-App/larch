/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import iconNetwork from '../../components/assets/My-Network.svg';
import iconTemplate from '../../components/assets/template.svg';
import iconActivity from '../../components/assets/Activity.svg';
import IconEdit from '../../components/assets/editor.svg';
import Card from './components/card';
import {
  getLarchVersionInfo,
  getNetworkList,
  getRunList,
  getTemplateList,
  getUserActivityList,
} from '../../utils/api';
import Loader from '../../components/loader';

export default function Dashboard() {
  const [networkRecords, setNetworkRecords] = useState('NA');
  const [templateRecords, setTemplateRecords] = useState('NA');
  const [runListRecords, setRunListRecords] = useState('NA');
  const [activityRecords, setActivityRecords] = useState('NA');
  const [supportedZombienetVersion, setSupportedZombienetVersion] = useState('');
  const [larchVersion, setLarchVersion] = useState('');
  const [isShowLoader, setIsShowLoader] = useState<boolean>(true);

  useEffect(() => {
    const networkRecordsRes = getNetworkList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total,
    );
    const templateRecordsRes = getTemplateList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total,
    );
    const runListRecordsRes = getRunList({ meta: { numOfRec: 0 } }).then(
      (data) => data.meta.total,
    );
    const activityRecordsRes = getUserActivityList({
      meta: { numOfRec: 0 },
    }).then((data) => data.meta.total);
    Promise.allSettled([
      networkRecordsRes,
      templateRecordsRes,
      runListRecordsRes,
      activityRecordsRes,
    ]).then((values) => {
      setNetworkRecords(
        values[0].status === 'fulfilled' ? values[0].value.toString(10) : 'NA',
      );
      setTemplateRecords(
        values[1].status === 'fulfilled' ? values[1].value.toString(10) : 'NA',
      );
      setRunListRecords(
        values[2].status === 'fulfilled' ? values[2].value.toString(10) : 'NA',
      );
      setActivityRecords(
        values[3].status === 'fulfilled' ? values[3].value.toString(10) : 'NA',
      );
    });
    getLarchVersionInfo()
      .then(({ result }) => {
        setLarchVersion(result.larchVersion);
        setSupportedZombienetVersion(result.zombienetVersion);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        setLarchVersion('NA');
        setSupportedZombienetVersion('NA');
      });
  }, []);
  return (
    <div className='h-full w-full bg-black p-6'>
      {isShowLoader && <Loader />}
      <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border'>
        <h3 className='text-white font-rubik text-2xl font-bold text-left'>
          Explore Larch
        </h3>
        <div className='font-rubik w-full font-bold border border-pink-800 border-[3px] rounded-xl p-3'>
          <div className='flex'>
            <div className='flex-1 text-white'>Supported Zombienet version</div>
            <div className='flex-1 text-right pr-2 text-white'>:</div>
            <div className='flex-0 text-gradient'>{supportedZombienetVersion}</div>
          </div>
          <div className='flex'>
            <div className='flex-1 text-white'>Larch version</div>
            <div className='flex-1 pr-[18px] text-right text-white'>:</div>
            <div className='flex-0 text-gradient'>{larchVersion}</div>
          </div>
        </div>
        <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 gap-6'>
          <Card
            cardTitle='Networks'
            cardLink='/network'
            cardIconSrc={iconNetwork}
            cardDescription='Create and list networks'
            records={networkRecords}
          />
          <Card
            cardTitle='Templates'
            cardLink='/template'
            cardIconSrc={iconTemplate}
            cardDescription='Create and list templates'
            records={templateRecords}
          />
          <Card
            cardTitle='Run List'
            cardLink='/run-list'
            cardIconSrc={IconEdit}
            cardDescription='List Network operations & results'
            records={runListRecords}
          />
          <Card
            cardTitle='Activity'
            cardLink='/activity'
            cardIconSrc={iconActivity}
            cardDescription='List activity actions'
            records={activityRecords}
          />
        </div>
      </div>
    </div>
  );
}
