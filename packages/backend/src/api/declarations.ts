export type ValidationErrorDetail = {
  path: Array<string | number>,
  message: string
};

export type Errors = {
  errorType: 'validationError',
  details: Array<ValidationErrorDetail>
};
