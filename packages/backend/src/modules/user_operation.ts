import { UserOperation } from './models/user_operation.js';

export type NetworkOperation = 'NETWORK_CREATE' | 'NETWORK_UPDATE' | 'NETWORK_DELETE' | 'NETWORK_GET' | 'NETWORK_LIST';
export type TemplateOperation = 'TEMPLATE_CREATE' | 'TEMPLATE_UPDATE' | 'TEMPLATE_DELETE' | 'TEMPLATE_GET' | 'TEMPLATE_LIST';

export type Operation = NetworkOperation | TemplateOperation;

export const addUserOperationEntry = (operation: Operation, operationDetail: string): void => {
  const userOperation = new UserOperation();
  userOperation.set({
    id: userOperation.id,
    operation,
    operationDetail,
    createdAt: '',
  });
};
