export const appVersion={
  version:"1.1.0",
  buildId:process.env.NEXT_PUBLIC_APP_BUILD_ID||"local",
  builtAt:process.env.NEXT_PUBLIC_APP_BUILT_AT||"development",
};
