
const fs = require("fs");
// const babylon = require("babylon");
const parser = require("@babel/parser"); // 将JS解析为AST语法树，可以解析新版js(2020)、可以通过插件提供tsx、ts的解析
const traverse = require("@babel/traverse").default; // AST递归遍历工具
const { transformFromAst } = require("babel-core");

module.exports = {
  getAST(path) {
    const source = fs.readFileSync(path, "utf-8");
    return parser.parse(source, {
      sourceType: "module", //表示我们要解析的是ES模块
    })
  },
  // 利用traverse遍历AST获得依赖
  getDependence(ast) {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    })
    return dependencies;
  },

  // 利用babel-core将es6转为es5
  transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  }
}

