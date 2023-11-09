import postgres from 'postgres';
import { setEnvironmentVariables } from './util/config.mjs';

// This file is used by node.js only

// Function now in config.js file
// export function setEnvironmentVariables() {
//   // Replacement for unmaintained dotenv-safe package
//   // https://github.com/rolodato/dotenv-safe/issues/128#issuecomment-1383176751
//   //
//   // TODO: Remove this and switch to dotenv/safe if this proposal gets implemented:
//   // https://github.com/motdotla/dotenv/issues/709
//   dotenv.config();

//   const unconfiguredEnvVars = Object.keys(
//     dotenv.parse(readFileSync('./.env.example')),
//   ).filter((exampleKey) => !process.env[exampleKey]);

//   if (unconfiguredEnvVars.length > 0) {
//     throw new Error(
//       `.env.example environment ${
//         unconfiguredEnvVars.length > 1 ? 'variables' : 'variable'
//       } ${unconfiguredEnvVars.join(', ')} not configured in .env file`,
//     );
//   }
// }

setEnvironmentVariables();

const sql = postgres();

console.log(
  await sql`
    SELECT
      *
    FROM
      animals
  `,
);

// This is only for the example, in your code you will want
// a persistent connection to the database
await sql.end();
