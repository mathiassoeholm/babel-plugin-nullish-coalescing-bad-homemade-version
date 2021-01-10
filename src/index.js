import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "nullish-coalescing-bad-homemade-version",
  };
});
