# @lp-labs/cholesky-factor

Real symmetric positive-definite Cholesky factors.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/cholesky-factor
```

## Working example

```js
import { cholesky } from '@lp-labs/cholesky-factor';
if (cholesky([[9]])[0][0] !== 3) throw new Error('Cholesky');
```

CommonJS: `const api = require('@lp-labs/cholesky-factor')`.

## Behavior, customization and limits

Dense finite matrix arrays1..64 each dimension, copied before work; nonfinite intermediates throw. Default absolute tolerance1e-12, positive<=1; rescale ill-conditioned input and inspect residuals in your application, no condition/error guarantee. cholesky checks pairwise symmetry within epsilon, then lower-triangle LL-transpose decomposition; diagonal residual<=epsilon rejects as not numerically SPD. Uses lower-triangle values after symmetry check, no silent symmetrization. O(n cubed),O(n squared), no solver or semidefinite factor.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function cholesky(
  input: readonly (readonly number[])[],
  epsilon?: number,
): number[][];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
