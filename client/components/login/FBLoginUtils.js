export const onPermissionsMissing = e => {
  console.error(`Developer forgot to include the required permissions needed to access your facebook account`);
  console.log(e);
};
