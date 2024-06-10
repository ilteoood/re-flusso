![image](https://github.com/ilteoood/re-flusso/actions/workflows/ci.yml/badge.svg)

# re-flusso

re-flusso is an utility library to operate with [JavaScript Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

It aims to support browsers, [Node.js](https://nodejs.org/) and [Edge Runtime](https://edge-runtime.vercel.app/).

## Installation

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
<summary>defaultTo</summary>

```javascript
import { defaultTo } from '@ilteoood/re-flusso/defaultTo';

await pipeline(
    fromIterable([null, undefined]),
    defaultTo(1),
    toIterable([])
)
```
</details>

<details>
<summary>equals</summary>

```javascript
import { equals } from '@ilteoood/re-flusso/equals';

await pipeline(
    fromIterable([1, 2, 3]),
    equals(2),
    toIterable([])
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
<summary>ndJson</summary>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;parse</summary>

```javascript
import { parse } from '@ilteoood/re-flusso/ndJson/parse';

.pipeThrough(
    parse()
)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;stringify</summary>

```javascript
import { stringify } from '@ilteoood/re-flusso/ndJson/stringify';

.pipeThrough(
    stringify()
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
<summary>numbers</summary>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;fromRange</summary>

```javascript
import { fromRange } from '@ilteoood/re-flusso/numbers/fromRange';

fromRange(1, 3)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;greaterThan</summary>

```javascript
import { greaterThan } from '@ilteoood/re-flusso/numbers/greaterThan';

greaterThan(3)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;greaterThanEqual</summary>

```javascript
import { greaterThanEqual } from '@ilteoood/re-flusso/numbers/greaterThanEqual';

greaterThanEqual(3)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;lessThan</summary>

```javascript
import { lessThan } from '@ilteoood/re-flusso/numbers/lessThan';

lessThan(3)
```
</details>
<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;lessThan</summary>

```javascript
import { lessThanEqual } from '@ilteoood/re-flusso/numbers/lessThanEqual';

lessThanEqual(3)
```
</details>
</details>
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

await pipeline(
    fromIterable([1, 2, 3]),
    reduce((accumulator, value) => accumulator + value, 0),
    toArray(destinationArray),
);
```
</details>

<details>
<summary>repeat</summary>

```javascript
import { repeat } from '@ilteoood/re-flusso/repeat';

repeat('1', 3)
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

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;toLowerCase</summary>

```javascript
import { toLowerCase } from '@ilteoood/re-flusso/strings/toLowerCase';

.pipeThrough(
    toLowerCase(separator)
)

```
</details>

<details>
<summary>&nbsp;&nbsp;&nbsp;&nbsp;toUpperCase</summary>

```javascript
import { toUpperCase } from '@ilteoood/re-flusso/strings/toUpperCase';

.pipeThrough(
    toUpperCase(separator)
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

## Acknowledgements
This project is kindly sponsored by [Nearform](https://nearform.com/).