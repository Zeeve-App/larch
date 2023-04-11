const larchEndpointKey = 'larch_endpoint';

export const getHostDomainWithProtocol = (): string => `${window.location.protocol}//${window.location.host}`;

export const getCurrentEndpoint = (): string => {
  const endpointInStore = localStorage.getItem(larchEndpointKey);
  return endpointInStore ?? getHostDomainWithProtocol();
};

export const setEndpointInStore = (endpoint: string) => {
  localStorage.setItem(larchEndpointKey, endpoint);
};
