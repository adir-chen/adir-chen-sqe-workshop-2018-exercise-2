import $ from 'jquery';
import {init, getDataArr} from './code-analyzer';
import {parseJson} from './code-analyzer';
import * as esprima from 'esprima';

function buildTable(dataArr){
    $('#parsedCodeTable tbody').empty();
    for (var index1 in dataArr){
        var row = '<tr>';
        for (var index2 in dataArr[index1]) {
            row += '<td>' + dataArr[index1][index2] + '</td>';
        }
        $('#parsedCodeTable tbody').append(row);
    }
}

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        init();
        let codeToParse = $('#codePlaceholder').val();
        parseJson(esprima.parseScript(codeToParse, {loc: true}));
        buildTable(getDataArr());
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});
