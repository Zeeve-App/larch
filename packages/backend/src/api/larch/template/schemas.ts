import Joi from 'joi';

const networkInfo = {
  name: Joi.string().min(3).required().strict(),
  configFilename: Joi.string().min(3).required().regex(/\.(json|toml)$/),
  configContent: Joi.string().required(),
  networkDirectory: Joi.string().required(),
  networkProvider: Joi.string().required(),
  testFilename: Joi.string().min(3).regex(/\.(zndsl)$/),
  testContent: Joi.string(),
};

export const templateCreateSchema = Joi.object(networkInfo);

export const templateUpdateSchema = Joi.object({
  ...networkInfo,
  name: networkInfo.name.optional(),
  configFilename: networkInfo.configFilename.optional(),
  configContent: networkInfo.configContent.optional(),
  networkDirectory: networkInfo.networkDirectory.optional(),
  networkProvider: networkInfo.networkProvider.optional(),
});
