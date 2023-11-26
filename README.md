# Re-Flusso

Re-Flusso is an utility library to operate with [JavaScript Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

It aims to support browsers, [Node.js](https://nodejs.org/) and [Edge Runtime](https://edge-runtime.vercel.app/).

## Installation

**Note: the package is not published on NPM yet**

<details>
<summary>NPM</summary>
```bash
npm install @ilteoood/re-flusso
```
</details>

<details>
<summary>PNPM</summary>
```bash
pnpm install @ilteoood/re-flusso
```
</details>

## Usage

### CommonJS
```bash
const { fromArray } = require('@ilteoood/re-flusso/fromArray');
```

### Module
```bash
import { fromArray } from '@ilteoood/re-flusso/fromArray';
```

## APIs

<details>
<summary>filter</summary>

```javascript
import { filter } from '@ilteoood/re-flusso/filter';

.pipeThrough(
    filter((value, index) => value % index === 0)
)
```
</details>

<details>
<summary>fromIterable</summary>

```javascript
import { fromIterable } from '@ilteoood/re-flusso/fromIterable';

// With an array
fromIterable([1, 2, 3])

// With a set
fromIterable(new Set([1, 2, 3]))
```
</details>

<details>
<summary>map</summary>

```javascript
import { map } from '@ilteoood/re-flusso/map';

.pipeThrough(
    map((value, index) => value + index)   
)
```
</details>

<details>
<summary>pipeline</summary>

```javascript
import { pipeline } from '@ilteoood/re-flusso/pipeline';

const destinationArray = [];

await pipeline(
    fromIterable([1, 2, 3]),
    map((value) => value * 2),
    toArray(destinationArray),
);
```
</details>

<details>
<summary>toArray</summary>

```javascript
import { toArray } from '@ilteoood/re-flusso/toArray';

const destinationArray = [];

.pipeTo(
    toArray(destinationArray)
)
```
</details>