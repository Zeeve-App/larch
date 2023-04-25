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
  addUserOperationEntry('TEMPLATE_GET', `Request to fetch template information: '${templateId}'`);
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
  addUserOperationEntry('TEMPLATE_UPDATE', `Request to update template information: '${templateId}'`);
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
  addUserOperationEntry('TEMPLATE_DELETE', `Request to delete template: '${templateId}'`);
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
  const templateName: string = req.body.name;
  addUserOperationEntry('TEMPLATE_CLONE', `Request to clone template: ${templateId}`);
  const template = new Template(templateId);
  const currentTemplateInfo = await template.get();
  const newTemplate = new Template();
  await newTemplate.set({ ...currentTemplateInfo, name: templateName });
  const duplicateTemplateInfo = await newTemplate.get();
  res.json({
    success: true,
    result: duplicateTemplateInfo,
  });
};
