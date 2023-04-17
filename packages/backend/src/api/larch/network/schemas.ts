import Joi from 'joi';
import * as path from 'node:path';

const networkInfo = {
  name: Joi.string().min(3).required().strict(),
  configFilename: Joi.string().min(3).required().regex(/\.(json|toml|yaml)$/),
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

export const networkCreateSchema = Joi.object(networkInfo);

export const networkUpdateSchema = Joi.object({
  configFilename: networkInfo.configFilename.optional(),
  configContent: networkInfo.configContent.optional(),
  networkDirectory: networkInfo.networkDirectory.optional(),
  networkProvider: networkInfo.networkProvider.optional(),
});
