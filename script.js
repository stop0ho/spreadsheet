let row = 10;
let col = 10;

function drawSheet() {
  const body = document.querySelector('body');
  const table = document.createElement('table');
  table.setAttribute('border', 1);

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
          td.innerHTML = `<input class='sheet-input' type='text' />`;
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
