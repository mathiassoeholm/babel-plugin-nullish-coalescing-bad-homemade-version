import pluginTester from "babel-plugin-tester";

import plugin from "../src";

pluginTester({
  plugin,
  pluginName: "nullish-coalescing-bad-homemade-version",
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
    {
      title: "multiple ??",
      code: `
        a ?? b ?? c
      `,
    },
  ],
});
