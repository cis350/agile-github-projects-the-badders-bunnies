// custom-types.d.ts
import { Request } from 'express';

// declare module 'express-serve-static-core' {
//   interface Request {
//     session?: {
//       user?: any;  // Define the session properties you use, adjust the types as necessary
//       // other session properties...
//     };
//   }
// }

export interface authRequest extends Request {
  session?: {
    string,
    user?: any
  }
}