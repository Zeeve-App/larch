/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

const larchEndpointKey = 'larch_endpoint';

export const getHostDomainWithProtocol = (): string => `${window.location.protocol}//${window.location.host}`;

export const getCurrentEndpoint = (): string => {
  const endpointInStore = localStorage.getItem(larchEndpointKey);
  return endpointInStore ?? getHostDomainWithProtocol();
};

export const setEndpointInStore = (endpoint: string) => {
  localStorage.setItem(larchEndpointKey, endpoint);
};
