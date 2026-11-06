import { cholesky } from '@lp-labs/cholesky-factor';
if (cholesky([[9]])[0][0] !== 3) throw new Error('Cholesky');
// @ts-expect-error invalid argument must be rejected by declarations
cholesky([['9']]);
