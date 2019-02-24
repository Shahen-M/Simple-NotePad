//show hidden content when add button is pressed
document.getElementById('add_icon').addEventListener('click', function () {
  $('.hidden-container').show();
})

//hide hidden content when a text is added
document.getElementById('add').addEventListener('click', function () {
  let textBoxValue = document.getElementById('text_area').value;

  if (textBoxValue == "") {
    alert('Please enter a note');

  } else {
    addToList();
    clearTextArea();
    createDay();
    $('.hidden-container').hide();
  }
})

function clearTextArea() {
  let textBoxValue = document.getElementById('text_area').value = "";
}

function completedTask() {
  this.classList.toggle('clicked_check');
}

function addToList() {
  let inputValue = document.getElementById('text_area').value;
  let txt = document.createTextNode(inputValue);

  let newList = document.createElement("li");
  let span = document.createElement('span');
  let time = document.createElement('div');
  time.setAttribute('id', 'day_content');
  newList.setAttribute('id', 'list');
  span.setAttribute('id', 'span');
  span.append(txt);
  newList.append(span);
  newList.append(time);

  let list = document.getElementById('myList');
  list.insertBefore(newList, list.childNodes[0]);
}

$('#myList').on('taphold', 'span', function (e) {
  $('.container').show();
  selectedNote(e);

  document.getElementById('btn_yes').addEventListener('click', function () {
    e.target.parentNode.remove();
    $('.container').hide();
  })

  document.getElementById('btn_no').addEventListener('click', function () {
    $('.container').hide();
    removeStyle(e);
  })

})

function createDay() {
  let content = document.getElementById('day_content');

  let d = new Date();
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  let day = d.getUTCDate() - 1;
  let curr_month = month[d.getMonth()];

  content.innerHTML = curr_month + ' ' + day;
}

function selectedNote(e) {
  let selected = e.target.parentNode;
  selected.style.border = "2px solid #000";
  selected.style.background = 'darkgrey';
}

function removeStyle(e) {
  let selected = e.target.parentNode;
  selected.style.border = null;
  selected.style.background = null;
}

function deleteNote(e) {
  setTimeout(function () {
    $('.container').show();

    document.getElementById('btn_yes').addEventListener('click', function () {
      e.target.remove();
      $('.container').hide();
    })

    document.getElementById('btn_no').addEventListener('click', function () {
      $('.container').hide();
    })
  }, 1000)
}

window.addEventListener('load', retreiveData);
window.addEventListener('load', storeData);

function storeData() {
  if (localStorage) {
    let list = document.getElementById('list');
    let myList = document.getElementById('myList').innerHTML;
    let value = document.getElementById('text_area').value;
    let dayContent = document.getElementById('day_content').innerHTML;

    localStorage.setItem('key', JSON.stringify(myList));
    localStorage.setItem('day', JSON.stringify(dayContent));

  } else {
    alert('Doesn\'t support local storage');
  }
}

function retreiveData() {
  let ulList = document.getElementById('myList');

  let getList = localStorage.getItem('key');
  document.getElementById('myList').innerHTML = getList;

  let d = new Date();

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let getDay = localStorage.getItem('day');
  let getMonth = localStorage.getItem('day');
  getDay = d.getUTCDate() - 1;
  getMonth = month[d.getMonth()];
  document.getElementById('day_content').innerHTML = getMonth + ' ' + getDay;
}

updateNote();

function updateNote() {

  $('#myList').on('click', '#span', function (e) {
    $('#edit_content').show();
    let value = this.parentNode.childNodes[0];

    document.getElementById('edit_text_area').value = this.innerHTML;

    document.getElementById('edit').addEventListener('click', function () {
      let newValue = document.getElementById('edit_text_area').value;
      value.innerHTML = newValue;

      $('#edit_content').hide();
      value = '';
    })
  })
}

function update() {
  let myList = document.getElementById('myList').innerHTML;
  localStorage.setItem('key', myList);
}

setInterval(function () {
  update();
})
