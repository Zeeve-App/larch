import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  nested?: boolean;
  children: React.ReactNode;
}

const PortalContext = React.createContext<HTMLElement | null>(null);
PortalContext.displayName = 'PortalContext';

const Portal: React.FC<PortalProps> = (props) => {
  const { nested = false, children } = props;

  const [element, setElement] = useState<HTMLElement | null>(null);
  const portal = useRef<HTMLElement | null>(null);

  const [, setForceUpdate] = useState(false);
  useEffect(() => setForceUpdate((prev) => !prev), []);

  const parentPortal = useContext(PortalContext);

  useLayoutEffect(() => {
    if (!element) return;

    const doc = element.ownerDocument;
    const host = nested ? parentPortal ?? doc.body : doc.body;

    if (!host) return;

    portal.current = doc.createElement('div');
    portal.current.className = 'zeeve-portal';

    host.appendChild(portal.current);
    setForceUpdate((prev) => !prev);

    const portalElement = portal.current;

    // cleanup
    return () => {
      if (host.contains(portalElement)) {
        host.removeChild(portalElement);
      }
    };
  }, [element]);

  return portal.current ? (
    createPortal(
      <PortalContext.Provider value={portal.current}>
        {children}
      </PortalContext.Provider>,
      portal.current,
    )
  ) : (
    <span
      ref={(el) => {
        if (el) setElement(el);
      }}
    />
  );
};

export { type PortalProps, Portal };
