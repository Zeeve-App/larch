import Joi from 'joi';
import * as path from 'node:path';

const networkInfo = {
  name: Joi.string().min(3).required().strict(),
  configFilename: Joi.string().min(3).required().regex(/\.(json|toml)$/),
  configContent: Joi.string().required().base64(),
  networkDirectory: Joi.string().required().custom((networkDirPath, helpers) => {
    const isValid = path.isAbsolute(networkDirPath);

    if (isValid) {
      return networkDirPath;
    }
    return helpers.error('any.invalid');
  }, 'Invalid path'),
  networkProvider: Joi.string().required(),
  testFilename: Joi.string().min(3).regex(/\.(zndsl)$/),
  testContent: Joi.string().base64(),
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
