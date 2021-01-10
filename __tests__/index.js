import pluginTester from "babel-plugin-tester";

import plugin from "../src";

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    {
      title: "transform in function",
      code: `
        function foo(opts) {
          var foo = opts.foo ?? "default";
        }
      `,
    },
  ],
});
