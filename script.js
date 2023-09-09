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
          const input = document.createElement('input');
          input.class = 'sheet-input';
          input.id = `${String.fromCharCode(j + 64)}${i}`;
          input.setAttribute('type', 'text');
          input.addEventListener('focus', focus);
          input.addEventListener('blur', blur);
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

function focus(e) {
  let select = document.getElementById('selected');
  let targetID = e.target.parentElement.id;
  select.innerText = targetID;
  let row = document.getElementById(targetID[1]);
  let col = document.getElementById(targetID[0]);
  row.className = 'selected';
  col.className = 'selected';
}

function blur(e) {
  const targetID = e.target.parentElement.id;
  const row = document.getElementById(targetID[1]);
  const col = document.getElementById(targetID[0]);
  row.className = 'unselected';
  col.className = 'unselected';
}
