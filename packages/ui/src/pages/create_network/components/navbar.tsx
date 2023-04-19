type NavProps = {
  pageSlug:
  | 'settings'
  | 'relaychain_config'
  | 'parachain_config'
  // | 'colltor_config'
  | 'hrmp';
};

export function NavBar({ pageSlug }: NavProps) {
  const elementClasses = (highlight: boolean) => (highlight
    ? 'center w-max py-4 text-gradient px-4 flex-row font-rubik flex gap-3'
    : 'center w-max py-4 px-4 flex-row font-rubik flex gap-3 text-white');
  const page = {
    settings: 1,
    relaychain_config: 2,
    parachain_config: 3,
    // colltor_config: 4,
    hrmp: 4,
  };
  const currentPageNum = page[pageSlug];
  return (
    <div className='h-18 gap-x-6 px-6  border-b-2 flex flex-row border-border'>
      <div className={elementClasses(currentPageNum >= 1)}>Settings</div>
      <span className='text-white py-4 font-rubik'>&#8811;</span>
      <div className={elementClasses(currentPageNum >= 2)}>
        Relaychain Configuration
      </div>
      <span className='text-white py-4'>&#8811;</span>
      <div className={elementClasses(currentPageNum >= 3)}>
        Parachain Configuration
      </div>
      {/* <span className='text-white py-4'>&#8811;</span>
      <div className={elementClasses(currentPageNum >= 4)}>
        Collator Configuration
      </div> */}
      <span className='text-white py-4'>&#8811;</span>
      <div className={elementClasses(currentPageNum >= 4)}>HRMP Channels</div>
    </div>
  );
}

export default NavBar;
