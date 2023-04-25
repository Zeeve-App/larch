import * as Joi from 'joi';

const networkInfo = {
  name: Joi.string().min(3).required().strict(),
  configFilename: Joi.string().min(3).required().regex(/\.(json|toml|yaml)$/),
  configContent: Joi.string().required().base64(),
  networkProvider: Joi.string().required(),
  testFilename: Joi.string().min(3).regex(/\.(zndsl)$/),
  testContent: Joi.string().base64(),
};

export const networkCreateSchema = Joi.object(networkInfo);

export const networkUpdateSchema = Joi.object({
  configFilename: networkInfo.configFilename.optional(),
  configContent: networkInfo.configContent.optional(),
  networkProvider: networkInfo.networkProvider.optional(),
});
