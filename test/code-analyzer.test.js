import assert from 'assert';
import {parseJson, getDataArr, IdentifierDetails, init} from '../src/js/code-analyzer';
import * as esprima from 'esprima';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.deepEqual(
            getDataArr(parseJson(' ')),
            []
        );
    });
});


function buildArrTest1(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'a', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'b', '', ''));
    arr.push(new IdentifierDetails(2, 'assignment expression', 'a', '', 'b'));
    return arr;
}

describe('The javascript parser', () => {
    it('test1', () => {
        init();
        let arr = buildArrTest1([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1(a, b){\n' +
                'a = b;\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest2(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'a', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'b', '', ''));
    arr.push(new IdentifierDetails(2, 'if statement', '', 'a > b', ''));
    arr.push(new IdentifierDetails(3, 'return statement', '', '', 'a'));
    arr.push(new IdentifierDetails(5, 'return statement', '', '', 'b'));
    return arr;
}


describe('The javascript parser', () => {
    it('test2', () => {
        init();
        let arr = buildArrTest2([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1(a, b){\n' +
                'if (a > b)\n' +
                '  return a;\n' +
                'else\n' +
                '  return b;\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest3(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'a', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'b', '', ''));
    arr.push(new IdentifierDetails(2, 'while statement', '', 'a <= b', ''));
    arr.push(new IdentifierDetails(3, 'assignment expression', 'a', '', 'a + 1'));
    arr.push(new IdentifierDetails(4, 'assignment expression', 'b', '', 'b - 1'));
    return arr;
}


describe('The javascript parser', () => {
    it('test3', () => {
        init();
        let arr = buildArrTest3([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1(a, b){ \n' +
                'while (a <= b){\n' +
                '  a = a + 1;\n' +
                '  b = b-1;\n' +
                '}\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest4(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'a', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'b', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'x', '', '1'));
    arr.push(new IdentifierDetails(3, 'for statement', '', 'var i = 0; i < 5; i++', ''));
    arr.push(new IdentifierDetails(4, 'assignment expression', 'x', '', 'x * i'));
    return arr;
}

describe('The javascript parser', () => {
    it('test4', () => {
        init();
        let arr = buildArrTest4([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1(a, b){ \n' +
                'let x = 1;\n' +
                '  for (var i = 0; i < 5; i++){\n' +
                '    x = x * i;\n' +
                '  }\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest5(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'binarySearch', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'X', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'V', '', ''));
    arr.push(new IdentifierDetails(1, 'variable declaration', 'n', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'low', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'high', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'mid', '', ''));
    arr.push(new IdentifierDetails(3, 'assignment expression', 'low', '', '0'));
    arr.push(new IdentifierDetails(4, 'assignment expression', 'high', '', 'n - 1'));
    arr.push(new IdentifierDetails(5, 'while statement', '', 'low <= high', ''));
    arr.push(new IdentifierDetails(6, 'assignment expression', 'mid', '', '(low + high) / 2'));
    arr.push(new IdentifierDetails(7, 'if statement', '', 'X < V[mid]', ''));
    arr.push(new IdentifierDetails(8, 'assignment expression', 'high', '', 'mid - 1'));
    arr.push(new IdentifierDetails(9, 'else if statement', '', 'X > V[mid]', ''));
    arr.push(new IdentifierDetails(10, 'assignment expression', 'low', '', 'mid + 1'));
    arr.push(new IdentifierDetails(12, 'return statement', '', '', 'mid'));
    arr.push(new IdentifierDetails(14, 'return statement', '', '', '-1'));
    return arr;
}

describe('The javascript parser', () => {
    it('test5', () => {
        init();
        let arr = buildArrTest5([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function binarySearch(X, V, n){\n' +
                '    let low, high, mid;\n' + '    low = 0;\n' +
                '    high = n - 1;\n' + '    while (low <= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' + '            high = mid - 1;\n' +
                '        else if (X > V[mid])\n' + '            low = mid + 1;\n' +
                '        else\n' + '            return mid;\n' +
                '    }\n' +
                '    return -1;\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest6(arr){
    arr.push(new IdentifierDetails(1, 'variable declaration', 'x', '', '6'));
    return arr;
}

describe('The javascript parser', () => {
    it('test6', () => {
        init();
        let arr = buildArrTest6([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('let x = 6', {loc: true}))),
            arr
        );
    });
});

function buildArrTest7(arr){
    arr.push(new IdentifierDetails(1, 'variable declaration', 'x', '', ''));
    arr.push(new IdentifierDetails(2, 'for statement', '', 'var i = 5; i < 10; i = i + 1', ''));
    arr.push(new IdentifierDetails(3, 'assignment expression', 'x', '', '5'));
    arr.push(new IdentifierDetails(4, 'while statement', '', 'x == 5', ''));
    arr.push(new IdentifierDetails(5, 'assignment expression', 'x', '', 'x + 2'));
    return arr;
}

describe('The javascript parser', () => {
    it('test7', () => {
        init();
        let arr = buildArrTest7([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('let x;\n' +
                'for (var i = 5; i < 10; i = i + 1){\n' +
                '  x = 5\n' +
                '  while (x == 5){\n' +
                '    x = x + 2\n' +
                '  }\n' +
                '}\n', {loc: true}))),
            arr
        );
    });
});

function buildArrTest8(arr){
    arr.push(new IdentifierDetails(1, 'variable declaration', 'y', '', '6'));
    arr.push(new IdentifierDetails(2, 'if statement', '', 'x > 5', ''));
    arr.push(new IdentifierDetails(3, 'assignment expression', 'y', '', 'y + 1'));
    arr.push(new IdentifierDetails(4, 'else if statement', '', 'x < 5', ''));
    arr.push(new IdentifierDetails(5, 'assignment expression', 'y', '', 'y - 1'));
    arr.push(new IdentifierDetails(8, 'assignment expression', 'y', '', '0'));
    return arr;
}

describe('The javascript parser', () => {
    it('test8', () => {
        init();
        let arr = buildArrTest8([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('var y = 6;\n' +
                'if (x > 5)\n' +
                '  y = y + 1\n' +
                'else if (x < 5)\n' +
                '  y= y -1\n' +
                '\n' +
                'else\n' +
                '  y = 0', {loc: true}))),
            arr
        );
    });
});

function buildArrTest9(arr){
    arr.push(new IdentifierDetails(1, 'variable declaration', 'y', '', ''));
    arr.push(new IdentifierDetails(2, 'assignment expression', 'y', '', '1'));
    arr.push(new IdentifierDetails(3, 'while statement', '', 'x != 5', ''));
    arr.push(new IdentifierDetails(4, 'assignment expression', 'y', '', 'y + 2'));
    return arr;
}

describe('The javascript parser', () => {
    it('test9', () => {
        init();
        let arr = buildArrTest9([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('let y;\n' +
                'y = 1;\n' +
                'while (x != 5){\n' +
                '  y = y + 2\n' +
                '}\n', {loc: true}))),
            arr
        );
    });
});

function buildArrTest10(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'x', '', '4'));
    arr.push(new IdentifierDetails(3, 'variable declaration', 'y', '', ''));
    arr.push(new IdentifierDetails(4, 'while statement', '', 'x >= 4', ''));
    arr.push(new IdentifierDetails(5, 'assignment expression', 'y', '', 'x + 2'));
    arr.push(new IdentifierDetails(6, 'assignment expression', 'x', '', 'x - 1'));
    arr.push(new IdentifierDetails(8, 'return statement', '', '', 'y - x'));
    return arr;
}

describe('The javascript parser', () => {
    it('test10', () => {
        init();
        let arr = buildArrTest10([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1 (){\n' +
                '  let x = 4;\n' +
                '  let y;\n' +
                '  while (x >= 4){\n' +
                '    y = x + 2;\n' +
                '    x = x - 1;\n' +
                '  }\n' +
                '  return y - x;\n' +
                '}', {loc: true}))),
            arr
        );
    });
});

function buildArrTest11(arr){
    arr.push(new IdentifierDetails(1, 'function declaration', 'func1', '', ''));
    arr.push(new IdentifierDetails(2, 'variable declaration', 'x', '', '4'));
    arr.push(new IdentifierDetails(3, 'variable declaration', 'y', '', '6'));
    arr.push(new IdentifierDetails(4, 'if statement', '', 'x > 3', ''));
    arr.push(new IdentifierDetails(5, 'return statement', '', '', 'y'));
    arr.push(new IdentifierDetails(6, 'return statement', '', '', 'x'));
    return arr;
}

describe('The javascript parser', () => {
    it('test11', () => {
        init();
        let arr = buildArrTest11([]);
        assert.deepEqual(
            getDataArr(parseJson(esprima.parseScript('function func1 (){\n' +
                '  let x = 4;\n' +
                '  let y = 6;\n' +
                '  if (x > 3)\n' +
                '    return y;\n' +
                '  return x;\n' +
                '}', {loc: true}))),
            arr
        );
    });
});