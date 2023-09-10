<p align="center">
  <a href="https://onsf.io">
    <img src="https://github.com/decentldotland/media-kit/blob/main/namespace/namespace-logo.svg" height="160">
  </a>
  <h3 align="center"><code>@decentldotland/namespace-hackernoon</code></h3>
  <p align="center">Namespace.gg HackerNoon Variant</p>
</p>
   

## Integration

### 1- Contract Interaction

#### contract: https://api.mem.tech/api/state/VdhC_g6vI8QbRebqP1MROEYBIJCVCvhgzNbiqi0yBe4

Regarding the `sig` interaction (input) property, it's the following string: `hackernoon::${state.counter}` then that string (message) get signed using the `caller` address.

```js

async function writeContract() {
  try {
    const functionId = "VdhC_g6vI8QbRebqP1MROEYBIJCVCvhgzNbiqi0yBe4";
    const inputs = [
      {
        input: {
          function: "mint",
          caller: "0x197f818c1313dc58b32d88078ecdfb40ea822614",
          sig: "0x35f6c36ff96d49fa7c0fa6dc5760d27159e8f3b5ca6a4a6db302480a9195f027402e8adfe015ec53c3db0c5654e99fc70abc98645ca87c1018129c61e2b7685e1c",
        },
      },
    ];

    const req = await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: functionId,
        inputs: inputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(req?.data);
    return req?.data;
  } catch (error) {
    console.log(error);
  }
}

```

### 2- Contract State Fetching

```js
async function getContractState() {
  try {
    const functionId = "VdhC_g6vI8QbRebqP1MROEYBIJCVCvhgzNbiqi0yBe4";
    const state = (
      await axios.get(`https://api.mem.tech/api/state/${functionId}`)
    )?.data;
    return state;
  } catch (error) {
    console.log(error);
  }
}

```

## License
This project is licensed under the [MIT License](./LICENSE)