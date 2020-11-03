// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlV1: 'https://localhost:5305/api/v1',
  apiUrlV2: 'https://localhost:5305/api/v2',
  apiAuthUrlV1: 'https://localhost:5101/api/v1/identity',
  apiAuthUrlV2: 'https://localhost:5101/api/v2/identity',
  apiShoppingUrlV1: 'https://localhost:5501/api/v1/compras',
  images: 'https://localhost:5305'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
