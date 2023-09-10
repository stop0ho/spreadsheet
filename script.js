let row = 10;
let col = 10;

function drawSheet() {
  const body = document.querySelector('body');
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  table.id = 'tableData';

  // 맨 윗줄 만들기
  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < col; j++) {
      const td = document.createElement('td');
      td.setAttribute('align', 'center');
      if (i === 0 && j !== 0) {
        td.innerText = String.fromCharCode(j + 64);
        td.id = String.fromCharCode(j + 64);
      }
      if (i !== 0) {
        if (j === 0) {
          td.innerText = i;
          td.id = i;
        } else {
          const div = document.createElement('div');
          div.style.display = 'none';
          const input = document.createElement('input');
          input.class = 'sheet-input';
          input.id = `${String.fromCharCode(j + 64)}${i}`;
          input.setAttribute('type', 'text');
          input.addEventListener('focus', focus);
          input.addEventListener('blur', blur);
          input.addEventListener('input', inputValue);
          td.appendChild(div);
          td.appendChild(input);
          td.id = `${String.fromCharCode(j + 64)}${i}`;
          td.className = 'sheet-content';
        }
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  body.appendChild(table);
}

drawSheet();

function inputValue(e) {
  const content = e.target.parentElement.firstChild;
  content.innerText = e.target.value;
}
function focus(e) {
  let targetID = e.target.id;
  let row = document.getElementById(targetID[1]);
  let col = document.getElementById(targetID[0]);
  row.style.backgroundColor = '#c9d9e9';
  col.style.backgroundColor = '#c9d9e9';
}

function blur(e) {
  const targetID = e.target.id;
  const row = document.getElementById(targetID[1]);
  const col = document.getElementById(targetID[0]);
  row.style.backgroundColor = '#eaeaed';
  col.style.backgroundColor = '#eaeaed';
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}

var excelHandler = {
  getExcelFileName: function () {
    return 'table-test.xlsx';
  },
  getSheetName: function () {
    return 'Table Test Sheet';
  },
  getExcelData: function () {
    return document.getElementById('tableData');
  },
  getWorksheet: function () {
    return XLSX.utils.table_to_sheet(this.getExcelData());
  },
};

const button = document.getElementById('exportBtn');
button.addEventListener('click', exportExcel);
function exportExcel(e) {
  let wb = XLSX.utils.book_new();
  let newWorksheet = excelHandler.getWorksheet();
  XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
  let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  saveAs(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
    excelHandler.getExcelFileName()
  );
}
