// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlV1: 'https://heroku-products.herokuapp.com/api/v1',
  apiUrlV2: 'https://heroku-products.herokuapp.com/api/v2',
  apiChatUrl: 'https://heroku-auth-chat.herokuapp.com/api/v2',
  apiAuthUrlV2: 'https://heroku-auth-chat.herokuapp.com/api/v2/identity',
  apiShoppingUrlV1: 'https://localhost:5501/api/v1/compras',
  apiClientUrl: 'https://localhost:5401/api/v1/client/address',
  images: 'https://heroku-products.herokuapp.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
