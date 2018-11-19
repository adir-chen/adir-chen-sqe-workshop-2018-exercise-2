// import * as esprima from 'esprima';
import * as escodegen from 'escodegen';


// const parseCode = (codeToParse) => {
//     return esprima.parseScript(codeToParse);
// };

let dataArr = [];
let elseIfCond = false;

function init(){
    dataArr = [];
    elseIfCond = false;
}
class IdentifierDetails {
    constructor(line, type, idName, condition, value) {
        this.line = line;
        this.type = type;
        this.idName = idName;
        this.condition = condition;
        this.value = value;
    }
}
function parseFunctionDeclaration(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'function declaration', codegen.id.name, '', ''));
    for (var param in codegen.params)
        parseJson(codegen.params[param]);
}

function parseIdentifier(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'variable declaration', codegen.name, '', ''));
}

function parseVariableDeclarator(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'variable declaration', codegen.id.name, '', codegen.init == undefined ? '' :codegen.init.value));
}

function parseVariableDeclaration(codegen){
    for (var variableDecl in codegen.declarations)
        parseJson(codegen.declarations[variableDecl]);
}

function parseExpressionStatement(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'assignment expression', codegen.expression.left.name, '', escodegen.generate(codegen.expression.right)));
}

function parseWhileStatement(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'while statement', '', escodegen.generate(codegen.test), ''));
}

function parseIfStatement(codegen){
    if (!elseIfCond)
        dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'if statement', '', escodegen.generate(codegen.test), ''));
    else
        dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'else if statement', '', escodegen.generate(codegen.test), ''));
    parseJson(codegen.consequent);
    elseIfCond = true;
    parseJson(codegen.alternate);
    elseIfCond = false;
}

function parseForStatement(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'for statement', '', escodegen.generate(codegen.init) + ' ' + escodegen.generate(codegen.test) + '; ' + escodegen.generate(codegen.update), ''));
}

function parseReturnStatement(codegen){
    dataArr.push(new IdentifierDetails(codegen.loc.start.line, 'return statement', '', '', escodegen.generate(codegen.argument)));
}

let dictDataType = {
    'FunctionDeclaration': parseFunctionDeclaration,
    'Identifier': parseIdentifier,
    'VariableDeclaration': parseVariableDeclaration,
    'VariableDeclarator' : parseVariableDeclarator,
    'ExpressionStatement': parseExpressionStatement,
    'WhileStatement': parseWhileStatement,
    'IfStatement': parseIfStatement,
    'ForStatement' : parseForStatement,
    'ReturnStatement': parseReturnStatement,
};

function existsType(codengen) {
    return codengen != null && codengen.hasOwnProperty('type') && dictDataType[codengen.type];
}

function existsProperty(codengen) {
    return codengen != null && codengen.hasOwnProperty('body');
}

function parseJson(codegen){
    if (existsType(codegen))
        dictDataType[codegen.type](codegen);
    if (existsProperty(codegen)){
        if(Array.isArray(codegen.body))
            for (var row in codegen.body)
                parseJson(codegen.body[row]);
        else
            parseJson(codegen.body);
    }
}

function getDataArr(){
    return dataArr;
}
export {IdentifierDetails};
export {parseJson};
export {getDataArr};
export {init};