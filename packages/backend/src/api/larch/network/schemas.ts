import Joi from 'joi';

export const createNetworkSchema = Joi.object({
  networkName: Joi.string().min(3).required().strict(),
  dirName: Joi.string().required(),
  confFileName: Joi.string().min(3).required().regex(/\.(json|toml)$/),
  confFileData: Joi.string().required(),
  dslFileName: Joi.string().min(3).regex(/\.(zndsl)$/),
  dslFileData: Joi.string(),
});

export const updateNetworkSchema = Joi.object({
  confFileName: Joi.string().min(3).required().regex(/\.(json|toml)$/),
  confFileData: Joi.string().required(),
  dslFileName: Joi.string().min(3).regex(/\.(zndsl)$/),
  dslFileData: Joi.string(),
});
