/* eslint-disable max-len */
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import {
  Header,
  HeaderNavContainer,
  HeaderLogo,
  HeaderLogoContainer,
  HeaderMenuButton,
} from "src/components/Header";
import { ReactComponent as IconAdd } from "src/assets/Add.svg";
import { ReactComponent as IconMenu } from "src/assets/Menu.svg";
import LarchLogo from "src/assets/Logo.svg";
import { ReactComponent as IconLink } from "src/assets/Link.svg";
import { useSidebarStore } from "src/store/SidebarStore";
import { useCreateTemplate } from 'src/store/CreateTemplate'
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuList,
  DropdownMenuGroup,
} from "../DropdownMenu";
import {
  useRef,
  MutableRefObject,
  useState,
  forwardRef,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import { useOnClickOutside } from "src/hooks";
import { ReactComponent as IconArrowDown } from "src/assets/ArrowDown.svg";
import {
  getCurrentEndpoint,
  getHostDomainWithProtocol,
  setEndpointInStore,
} from "../../utils/setting";
import { notify } from "../../utils/notifications";

export interface HeaderLayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isServiceOpen: boolean;
  serviceToggle: () => void;
  serviceClose: () => void;
}

const HeaderLayout = forwardRef<HTMLDivElement, HeaderLayoutProps>(
  (props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const setTemplateId = useCreateTemplate((store) => store.setTemplateId);

    const { isServiceOpen, serviceClose, serviceToggle } = props;

    const { setSidebar } = useSidebarStore();

    const [endpoint, setEndpoint] = useState(getCurrentEndpoint());

    const onSave = () => {
      setEndpointInStore(endpoint);
      notify("success", "Service endpoint updated successfully 🎉");
    };

    const onReset = () => {
      setEndpoint(getCurrentEndpoint());
    };

    const goToCreateNet = () => {
      setTemplateId(null);
      navigate("/templates/createNetwork");
    };

    const checkPath = () => {
      if (location.pathname === "/templates/createNetwork") {
        return false;
      }
      return true;
    };

    const localRef = useRef(null);
    const headerRef = ref || localRef;
    useOnClickOutside(headerRef as MutableRefObject<HTMLDivElement>, () =>
      serviceClose()
    );

    return (
      <Header
        className="justify-between md:justify-end border-b-2 border-dark-700"
        ref={headerRef}
      >
        <HeaderLogoContainer>
          <HeaderMenuButton
            className="bg-larch-dark border-0 hover:bg-larch-dark_2 focus:bg-larch-dark_2 active:bg-larch-dark_2"
            icon={<IconMenu className="text-white text-2xl" />}
            onClick={() => setSidebar(true)}
          />
          <HeaderLogo logoImgSrc={LarchLogo} logoHref="/" />
        </HeaderLogoContainer>
        <HeaderNavContainer className="gap-3">
          <DropdownMenu className="relative text-white">
            <DropdownMenuButton
              as={Button}
              className="text-xs md:text-xl bg-larch-dark_2 text-white border-2 border-dark-700 gap-3"
              iconRight={<IconArrowDown className="w-7 h-7" />}
              onClick={() => {
                serviceToggle();
              }}
            >
              Service Endpoint
            </DropdownMenuButton>
            <DropdownMenuList
              className="bg-larch-dark_2 border-4 text-white z-dropdown p-0"
              direction="right"
              isOpen={isServiceOpen}
            >
              <DropdownMenuGroup className="p-6 gap-6">
                <div className="flex gap-3">
                  <IconLink className="w-7 h-7" />
                  <h3>Service Endpoint</h3>
                </div>
                <div className="text-white h-full p-0">
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-3">
                      <input
                        className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                      />
                      <Button
                        className="flex-grow-0 text-xs md:text-xl bg-larch-dark_3 text-white border-[3px] border-dark-700 hover:bg-larch-dark_2"
                        variant="outline"
                        onClick={() => {
                          setEndpoint(getHostDomainWithProtocol());
                        }}
                      >
                        Default
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="text-xs md:text-xl w-full bg-larch-dark_3 text-white border-[3px] border-dark-700 hover:bg-larch-dark_2"
                        variant="outline"
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                      <Button
                        className="text-xs md:text-xl w-full bg-larch-pink text-white border-[3px] border-dark-700"
                        variant="outline"
                        onClick={onSave}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuGroup>
            </DropdownMenuList>
          </DropdownMenu>
          {checkPath() && (
            <Button
              className="text-xs md:text-xl bg-larch-pink text-white border-2 border-dark-700 gap-3"
              variant="outline"
              iconRight={
                <IconAdd className="w-[1rem] h-[1rem] md:w-7 md:h-7" />
              }
              onClick={goToCreateNet}
            >
              Network Template
            </Button>
          )}
        </HeaderNavContainer>
      </Header>
    );
  }
);

export default HeaderLayout;
