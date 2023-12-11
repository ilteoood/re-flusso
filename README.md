![image](https://github.com/ilteoood/re-flusso/actions/workflows/ci.yml/badge.svg)

# re-flusso

re-flusso is an utility library to operate with [JavaScript Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

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
<summary>accumulator</summary>

```javascript
import { accumulator } from '@ilteoood/re-flusso/accumulator';

const chunkSize = 3;

.pipeThrough(
    accumulator(chunkSize)
)
```
</details>

<details>
<summary>concat</summary>

```javascript
import { concat } from '@ilteoood/re-flusso/concat';

concat(
    fromIterable([1]),
    fromIterable([2]),
    fromIterable([3])
)
```
</details>

<details>
<summary>text</summary>

```javascript
import { text } from '@ilteoood/re-flusso/fetch/text';

const response = await fetch('...')

text(response)
```
</details>

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
<summary>first</summary>

```javascript
import { first } from '@ilteoood/re-flusso/first';

const firstItemsToKeep = 3;

.pipeThrough(
    first(firstItemsToKeep)
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
<summary>last</summary>

```javascript
import { last } from '@ilteoood/re-flusso/last';

const lastItemsToKeep = 3;

.pipeThrough(
    last(lastItemsToKeep)
)
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
<summary>merge</summary>

```javascript
import { merge } from '@ilteoood/re-flusso/merge';

merge(
    fromIterable([1]),
    fromIterable([2]),
    fromIterable([3])
)
```
</details>

<details>
<summary>NDJSON</summary>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;parser</summary>

```javascript
import { parser } from '@ilteoood/re-flusso/ndJson/parser';

.pipeThrough(
    parser()
)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;stringifier</summary>

```javascript
import { stringifier } from '@ilteoood/re-flusso/ndJson/stringifier';

.pipeThrough(
    stringifier()
)
```
</details>
</details>
</details>

<details>
<summary>notEmpty</summary>

```javascript
import { notEmpty } from '@ilteoood/re-flusso/notEmpty';

const errorToThrow = new Error('Stream is empty');

.pipeThrough(
    notEmpty(errorToThrow)
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
<summary>reduce</summary>

```javascript
import { reduce } from '@ilteoood/re-flusso/reduce';

const destinationArray = [];

await reduce(
    fromIterable([1, 2, 3]),
    reduce((accumulator, value) => accumulator + value, 0),
    toArray(destinationArray),
);
```
</details>

<details>
<summary>skip</summary>

```javascript
import { skip } from '@ilteoood/re-flusso/skip';

const itemsToSkip = 2;

.pipeTo(
    skip(itemsToSkip)
)
```
</details>

<details>
<summary>strings</summary>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;join</summary>

```javascript
import { join } from '@ilteoood/re-flusso/strings/join';

const separator = ',';

.pipeThrough(
    join(separator)
)

```
</details>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;split</summary>

```javascript
import { split } from '@ilteoood/re-flusso/strings/split';

const separator = ',';

.pipeTo(
    split(separator)
)
```
</details>

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