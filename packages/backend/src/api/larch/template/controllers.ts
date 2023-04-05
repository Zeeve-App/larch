import { Request, Response } from 'express';
import { Template, getTemplateList } from '../../../modules/models/template.js';
import { addUserOperationEntry } from '../../../modules/user_operation.js';

export const templateCreateController = async (req: Request, res: Response): Promise<void> => {
  const templateData = req.body;
  const template = new Template();
  await template.set({
    id: template.id,
    name: templateData.name,
    configFilename: templateData.configFilename,
    configContent: templateData.configContent,
    networkDirectory: templateData.networkDirectory,
    networkProvider: templateData.networkProvider,
    testFilename: templateData.testFilename,
    testContent: templateData.testContent,
    updatedAt: null,
    createdAt: null,
  });

  res.json({
    success: true,
    result: {
      id: template.id,
    },
  });
};

export const templateGetController = async (req: Request, res: Response): Promise<void> => {
  const templateId = typeof req.query.templateId === 'string' ? req.query.templateId : '';
  addUserOperationEntry('TEMPLATE_GET', `Fetched template with ID: ${templateId}`);
  const template = new Template(templateId);
  const templateExists = await template.exists();
  if (!templateExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Template not found',
        detail: 'requested template is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const templateInfo = await template.get();

  res.json({
    success: true,
    result: templateInfo,
  });
};

export const templateUpdateController = async (req: Request, res: Response): Promise<void> => {
  const templateId = typeof req.query.templateId === 'string' ? req.query.templateId : '';
  const templateData = req.body;
  const template = new Template(templateId);
  const templateExists = await template.exists();
  if (!templateExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Template not found',
        detail: 'Template requested to be updated is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const currentTemplateInfo = await template.get();

  await template.set({
    ...currentTemplateInfo,
    ...templateData,
  });

  const updatedTemplateInfo = await template.get();

  res.json({
    success: true,
    result: updatedTemplateInfo,
  });
};

export const templateDeleteController = async (req: Request, res: Response): Promise<void> => {
  const templateId = typeof req.query.templateId === 'string' ? req.query.templateId : '';
  addUserOperationEntry('TEMPLATE_DELETE', `Deleted template with ID: ${templateId}`);
  const template = new Template(templateId);
  const templateExists = await template.exists();
  if (!templateExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Template not found',
        detail: 'requested template for deletion is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  await template.remove();

  res.json({
    success: true,
    result: { id: template.id },
  });
};

export const templateListController = async (req: Request, res: Response): Promise<void> => {
  addUserOperationEntry('TEMPLATE_LIST', 'Listed templates');
  const templateListReq = req.body;
  const pageNum = templateListReq.meta
  && templateListReq.meta.pageNum ? templateListReq.meta.pageNum : 1;
  const numOfRec = templateListReq.meta ? templateListReq.meta.numOfRec : 10;
  const {
    result: templates,
    totalNumberOfRecCount,
    currentPageRecCount,
  } = await getTemplateList(templateListReq.filter, templateListReq.sort ?? [], {
    pageNum,
    numOfRec,
  });

  res.json({
    success: true,
    result: templates,
    meta: {
      pageNum,
      numOfRec: currentPageRecCount,
      total: totalNumberOfRecCount,
    },
  });
};

export const templateCloneController = async (req: Request, res: Response): Promise<void> => {
  const templateId = typeof req.query.templateId === 'string' ? req.query.templateId : '';
  const template = new Template(templateId);
  const currentTemplateInfo = await template.get();
  const duplicateTemplateInfo = await template.set(currentTemplateInfo);
  res.json({
    success: true,
    result: duplicateTemplateInfo,
  });
};
