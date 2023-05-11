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

import { UserOperation } from './models/user_operation.js';

export type NetworkOperation = 'NETWORK_CREATE' |
'NETWORK_UPDATE' | 'NETWORK_DELETE' | 'NETWORK_GET' | 'NETWORK_TEST' | 'NETWORK_LIST' | 'NETWORK_STATUS';
export type TemplateOperation = 'TEMPLATE_CREATE' |
'TEMPLATE_UPDATE' | 'TEMPLATE_DELETE' | 'TEMPLATE_GET' | 'TEMPLATE_LIST' | 'TEMPLATE_CLONE';
export type NetworkRunOperation = 'NETWORK_RUN_GET' | 'NETWORK_RUN_LIST';

export type Operation = NetworkOperation | TemplateOperation | NetworkRunOperation;

export const addUserOperationEntry = (operation: Operation, operationDetail: string): void => {
  const userOperation = new UserOperation();
  userOperation.set({
    id: userOperation.id,
    operation,
    operationDetail,
    createdAt: '',
  });
};
