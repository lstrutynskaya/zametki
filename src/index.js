let nextId = 1;
let Note = function(options = {}) {
  return Object.assign({
    id: nextId++,
    title: 'New Note',
    content: ''
  }, options);
}

let notes = [
  Note({ title: 'Test1', content: 'content1'}), 
  Note({ title: 'Test2', content: 'content2' }), 
  Note({ title: 'Test3', content: 'content3' })
];

let renderNotes = function(el){
  el.empty();
  for (let i = 0, len = notes.length; i < len; i++) {
    el.prepend(`<li data-id="${notes[i].id}">${notes[i].title}</li>`);
  };
}

$(document).ready(() => {
  let deleteBtnEl = $('.note-action-delete button');
  let noteListEl = $('#note-list');
  let noteSelectedEl;
  
  renderNotes(noteListEl);

  $('.note-action-create button').on('click', () => {
    
    let newNote = Note();
    notes.push(newNote);

    renderNotes(noteListEl);
    
    $('#note-list li:first').trigger('click');
    $('.note-title').val('');
    $('.note-details').val('');
    document.getElementById('title').autofocus;
  });

  noteListEl.on('click', 'li', function() {
    let el = $(this);
    
    noteListEl.find('li').removeClass('active');
    el.addClass('active');

    deleteBtnEl.prop('disabled', false);
    
    noteSelectedEl = el;
    let note = notes.find(function(note) {
      return note.id === el.data('id');
    });

    $('.note-title').val(note.title);
    $('.note-details').val(note.content);
  });

  $('.note-action-delete button').on('click', () => {

    let itemIndex = notes.findIndex(function(note) {
      return note.id === noteSelectedEl.data('id');
    });

    notes.splice(itemIndex, 1);

    $('.note-title').val('');
    $('.note-details').val('');

    renderNotes(noteListEl);
    
    deleteBtnEl.prop('disabled', true);
    $('#note-list li:first').trigger('click');
  });

  $('#note-list li:first').trigger('click');

  $('.note-title').on('input', function() {
    let el = $(this);
  
    let note = notes.find(function(note) {
      return note.id === noteSelectedEl.data('id');
    });
    note.title = el.val();
    noteSelectedEl.text(el.val());
  });
  
  $('.note-details').on('input', function() {
    let el = $(this);

    let note = notes.find(function(note) {
      return note.id === noteSelectedEl.data('id');
    });
    note.content = el.val();
  });
});