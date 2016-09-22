"use strict";

module.exports = function (node) {
    return node.type === "ExpressionStatement" &&
        node.expression.type === "Literal" &&
        node.expression.value === "use strict";
};
