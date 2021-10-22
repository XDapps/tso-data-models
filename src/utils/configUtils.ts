export const getServiceAccount = (): string => {
  return process.env.GOOGLE_APPLICATION_CREDENTIALS ? process.env.GOOGLE_APPLICATION_CREDENTIALS : "";
};

export const getAWSServiceAccountKey = (): string => {
  return process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : "";
};

export const getAWSServiceAccountSecret = (): string => {
  return process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : "";
};