# es-array-ext
Native array extensions for `javascript` and `typescript`.<br/>
> [!IMPORTANT]
> This library extend the native objects `Array.prototype`.  This may lead to collision with other libraries or the latest version of ECMAScript.
<br/>
<br/>

# Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Functions](#Functions)
4. [Advanced Usage](#Advanced-Usage)
5. [Test](#Test)
6. [License](#License)
<br/>

# Installation
Under your project folder, run the follow command in the terminal.
```
npm i --save es-array-ext
```
<br/>

# Usage
### Prototype Version
```ts
// For Array prototype
// Import at the entry point of the project, such as index.ts
import from "es-array-ext"

const array = Array.create(5); // [0, 1, 2, 3, 4]
```

### Clean Version - (*Non prototype pollution*) 
```ts
// For non-pollution
// Import at the .ts file where you are going to use
import { arrayCreate, ... } from "es-array-ext/clean"

const array = arrayCreate(5); // [0, 1, 2, 3, 4]
```
<br/>

# Functions

# Advanced Usage

### Clean Import - (*Non prototype pollution*) 
```ts
// For non-pollution
import { arrayCreate, ... } from "es-array-ext/clean"

const array = arrayCreate(5); // [0, 1, 2, 3, 4]
```

### Specifc Function - (*To avoid collision with other libraries*)
```ts
import "es-array-ext/create"
import "es-array-ext/prototype/distinct"

const array = Array.create(5); // [0, 1, 2, 3, 4]
const distinctArray = [1,2,1,3,3,4,5].distinct();  // [1, 2, 3, 4, 5]
```

<br/>

# Test
```ts
npm run test
```
<br/>

# License
- MIT License
<br/>
