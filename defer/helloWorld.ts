// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";

// a background function must be `async`
async function helloWorld(name: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Hello ${name}!`);
      resolve("done");
    }, 5000);
  });
}

// the function must be wrapped with `defer()` and exported as default
export default defer(helloWorld);
