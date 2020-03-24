# Class: Array

Provide a unique method that performs all diff steps at once.

All examples will use the following variables:

```ts
import * as Differs from '@balmanth/differs';

const base = 'Example'.split('');  // Base char array.
const input = 'eXAMPLe'.split(''); // Input char array.
```

## Method: from(base, input, comparator)

Use this method to calculate the diff between the base and input values.

#### Syntax

```ts
const patches = Differs.Array.from(base, input); // Get the patch array.
```

#### Parameters

- **base**, the base array, usually is the original/unchanged value.
- **input**, the changed array that will be compared with the base array.
- **comparator**, An optional comparison function that is called at every comparison.

#### Return value

- Returns the patch array where you can see in more details what is the diff between the base and input values.

## Reference

[Go Back](../README.md#reference)

## License

[MIT](https://balmante.eti.br)
