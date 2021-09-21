const { getAST,
  getDependence,
  transform } = require('./parser');
const path = require('path');
const fs = require('fs');

class Compiler {
  constructor(option) {
    this.entry = option.entry;
    this.output = option.output;
    this.modules = [];
  }

  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    entryModule.dependencies.forEach(depend => {
      this.modules.push(this.buildModule(depend));
    })

    this.emitFile();
  }

  buildModule(fileName, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(fileName);
    } else {
      const filePath = path.resolve(process.cwd(), './src/', fileName);
      ast = getAST(filePath);
    }
    console.log('fileName :>> ', fileName);
    console.log('ast>>', ast)

    return {
      fileName,
      dependencies: getDependence(ast),
      transformCode: transform(ast),
    }
  }

  emitFile() {
    console.log('this.output :>> ', this.output);
    const outputPath = path.join(this.output.path, this.output.fileName);
    let modulesStr = '';
    this.modules.forEach(_module => {
      modulesStr += `'${_module.fileName}': function(require, module, exports) {${_module.transformCode}},`
    })

    const bundle = `
(function(modules) {
  function require(fileName) {
    const fn = modules[fileName];
    const module = { exports:{} };
    fn(require, module, module.exports);
    return module.exports;
  }
  require('${this.entry}')
})({${modulesStr}})
    `;
    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
}

module.exports = Compiler;
