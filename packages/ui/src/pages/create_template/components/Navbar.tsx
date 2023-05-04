type NavProps = {
  pageSlug:
  | "settings"
  | "relaychain_config"
  | "parachain_config"
  | "hrmp"
  | "test_config";
  setSlug: React.Dispatch<
    React.SetStateAction<
      | "settings"
      | "relaychain_config"
      | "parachain_config"
      | "hrmp"
      | "test_config"
    >
  >;
};

export function NavBar({ pageSlug, setSlug }: NavProps) {
  const elementClasses = (highlight: boolean) =>
    highlight
      ? "cursor-pointer text-xl center h-[72px] flex items-center w-max py-4 text-gradient px-6 flex-row font-rubik flex gap-3"
      : "cursor-pointer text-xl center h-[72px] flex items-center w-max py-4 px-6 flex-row font-rubik flex gap-3 text-white";
  const page = {
    settings: 1,
    relaychain_config: 2,
    parachain_config: 3,
    hrmp: 4,
    test_config: 5,
  };
  const currentPageNum = page[pageSlug];
  return (
    <div className="items-center border-b-2 flex-grow-0 flex flex-row border-dark-700 font-medium">
      <div
        className={elementClasses(currentPageNum >= 1)}
        onClick={() => setSlug("settings")}
      >
        Settings
      </div>
      <span className="text-white py-4 font-rubik font-bold"> &#8811;</span>
      <div
        className={elementClasses(currentPageNum >= 2)}
        onClick={() => setSlug("relaychain_config")}
      >
        Relaychain Configuration
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div
        className={elementClasses(currentPageNum >= 3)}
        onClick={() => setSlug("parachain_config")}
      >
        Parachain Configuration
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div
        className={elementClasses(currentPageNum >= 4)}
        onClick={() => setSlug("hrmp")}
      >
        HRMP Channels
      </div>
      <span className="text-white py-4 font-bold">&#8811;</span>
      <div
        className={elementClasses(currentPageNum >= 5)}
        onClick={() => setSlug("test_config")}
      >
        Test Configuration
      </div>
    </div>
  );
}

export default NavBar;
