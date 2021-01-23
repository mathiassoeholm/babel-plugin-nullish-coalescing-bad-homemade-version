import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "nullish-coalescing-bad-homemade-version",
    visitor: {
      LogicalExpression(path) {
        if (path.node.operator !== "??") {
          return;
        }

        const leftOperand = path.node.left;
        const rightOperand = path.node.right;

        const leftId = path.scope.generateUidIdentifierBasedOnNode(leftOperand);
        path.scope.push({ id: t.cloneNode(leftId) });
        const assignment = t.assignmentExpression("=", leftId, leftOperand);

        const nullTest = t.binaryExpression("!==", assignment, t.nullLiteral());
        const undefinedTest = t.binaryExpression(
          "!==",
          leftId,
          path.scope.buildUndefinedNode()
        );
        const test = t.logicalExpression("&&", nullTest, undefinedTest);

        const conditionalExpression = t.conditionalExpression(
          test,
          leftId,
          rightOperand
        );

        path.replaceWith(conditionalExpression);
      },
    },
  };
});
