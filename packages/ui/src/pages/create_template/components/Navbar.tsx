type NavProps = {
  pageSlug:
  | "settings"
  | "relaychain_config"
  | "parachain_config"
  | "hrmp"
  | "test_config";
  setSlug: React.Dispatch<React.SetStateAction<"settings" | "relaychain_config" | "parachain_config" | "hrmp" | "test_config">>

};

export function NavBar({ pageSlug, setSlug }: NavProps) {
  const elementClasses = (highlight: boolean) =>
    highlight
      ? "cursor-pointer center w-max py-4 text-gradient px-4 flex-row font-rubik flex gap-3"
      : "cursor-pointer center w-max py-4 px-4 flex-row font-rubik flex gap-3 text-white opacity-70";
  const page = {
    settings: 1,
    relaychain_config: 2,
    parachain_config: 3,
    hrmp: 4,
    test_config: 5,
  };
  const currentPageNum = page[pageSlug];
  return (
    <div className="h-18 gap-x-6 px-6  border-b-2 flex flex-row border-dark-700">
      <div className={elementClasses(currentPageNum >= 1)} onClick={() => setSlug('settings')} >
        <strong>Settings</strong>
      </div>
      <span className="text-white py-4 font-rubik font-bold"> &#8811;</span>
      <div className={elementClasses(currentPageNum >= 2)} onClick={() => setSlug('relaychain_config')}>
        <strong>Relaychain Configuration</strong>
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div className={elementClasses(currentPageNum >= 3)} onClick={() => setSlug('parachain_config')}>
        <strong>Parachain Configuration</strong>
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div className={elementClasses(currentPageNum >= 4)} onClick={() => setSlug('hrmp')}>
        <strong>HRMP Channels</strong>
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div className={elementClasses(currentPageNum >= 5)} onClick={() => setSlug('test_config')}>
        <strong>Test Configuration</strong>
      </div>
    </div>
  );
}

export default NavBar;
