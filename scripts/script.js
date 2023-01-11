// Initialize Materialize.css
let chipInstances;
let attendees;
document.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  const tooltips = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltips);
  const sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs);
  const dates = document.querySelectorAll('.datepicker');
  M.Datepicker.init(dates);
  const times = document.querySelectorAll('.timepicker');
  M.Timepicker.init(times);
  const chips = document.querySelectorAll('.chips');
  chipInstances = M.Chips.init(chips, {
    data: [
      // TEST
      {
        // dynamically add user name
        tag: 'Jacqueline Henderson',
      },
    ],
    placeholder: 'Attendees (required)',
    secondaryPlaceholder: '+ Add attendee',
    autocompleteOptions: {
      data: {
        // TEST
        // dynamically add past attendees
        'Jacqueline Henderson': null,
        'Taylor Swift': null,
        'Ariana Grande': null,
        'Charlie Puth': null,
        'Andrew Hozier Byrne': null,
        'Milo Henderson': null,
        'Lily Henderson': null,
      },
      limit: 10,
    },
  });
  attendees = chipInstances[0].chipsData;
});

// initialize rich text editor
const quill = new Quill('#discussion-summary', {
  theme: 'snow',
  placeholder: 'Enter discussion points here...',
});

// TODO -  add powerpoint generator

// Agenda input
const agenda = (() => {
  const agendaList = document.querySelector('.agenda-list');
  let inputs = 0;
  const newInput = (disabled = true) => {
    inputs += 1;
    const inputField = document.createElement('li');
    inputField.classList.add('input-field', 'col', 's12');
    const input = document.createElement('textarea');
    input.classList.add('materialize-textarea');
    input.type = 'text';
    input.id = `agenda-item-${inputs}`;
    // input.required = true;
    input.disabled = disabled;
    const label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.textContent = 'Enter agenda item';
    inputField.append(input, label);

    // enable next on input
    input.addEventListener('input', (e) => {
      const sibling = () => inputField.nextElementSibling;
      const siblingInput = () => sibling()?.querySelector('textarea');
      // have next num below, disabled until prev has content
      if (!sibling()) {
        agendaList.append(newInput());
      }
      if (!e.target.value) {
        siblingInput().disabled = true;
      } else {
        siblingInput().disabled = false;
      }
    });

    return inputField;
  };
  // have one input with 1. next to it
  const initial = newInput(false);
  initial.required = true;
  const second = newInput();
  agendaList.append(initial, second);

})();

// action item input
const actionItems = (() => {
  // grab action items ul
  const actionItemList = document.querySelector('.action-items');
  // grab input
  const actionItemsInput = document.querySelector('#action-items-input');
  // grab button
  const btn = document.querySelector('.action-items-button');

  
  const addItem = () => {
    // if there's no content, retrun
    if (!actionItemsInput.value) return;
    const li = generateLi(actionItemsInput.value);
    actionItemList.append(li);
    // clear input
    actionItemsInput.value = '';
  }

  // generate li element
  const generateLi = (text) => {
    const li = document.createElement('li');
    li.classList.add('action-item');

    const itemText = document.createElement('span');
    itemText.classList.add('text', 'col', 's10');
    itemText.textContent = text;

    const edit = document.createElement('a');
    edit.href = '#!';
    edit.classList.add('btn-flat', 'teal-text', 'waves-effect', 'waves-teal', 'col', 's1', 'tooltipped');
    edit.dataset.tooltip = 'Edit'
    const editIcon = document.createElement('i');
    editIcon.classList.add('material-icons');
    editIcon.textContent = 'edit';
    edit.append(editIcon);

    const del = document.createElement('a');
    del.href = '#!';
    del.classList.add('btn-flat', 'red-text', 'text-darken-2', 'waves-effect', 'waves-red', 'col', 's1', 'tooltipped');
    del.dataset.tooltip = 'Delete';
    const delIcon = document.createElement('i');
    delIcon.classList.add('material-icons');
    delIcon.textContent = 'delete_outline';
    del.append(delIcon);

    // initialize tooltips
    M.Tooltip.init(edit);
    M.Tooltip.init(del);

    // edit text directly on btn click
    edit.addEventListener('click', () => {
      itemText.contentEditable = true;
      itemText.focus();
    })

    // save text on click outside or enter
    itemText.addEventListener('blur', () => {
      itemText.contentEditable = false;
      if (!itemText.textContent.trim()) {
        actionItemList.removeChild(li);
      }
    })
    itemText.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      itemText.blur();
    })

    del.addEventListener('click', () => {
      // returns bool in promise
      confirm('delete this item?').then((res) => {
        if (!res) return;
        // remove item
        actionItemList.removeChild(li);
      })
    })

    li.append(itemText, edit, del);

    return li;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addItem();
  });

  actionItemsInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    addItem();
  })
})();

// reusable confirm
const confirm = (text = 'complete this action?') => {
  // grab modal instance and elements
  const modal = M.Modal.getInstance(document.querySelector('#confirm'));
  const confirmButton = document.querySelector('#confirm .yes');
  const confirmText = document.querySelector('#confirm .confirm-text')

  // set are you sure message to text arg
  confirmText.textContent = text;

  // open the modal
  modal.open();

  // return a new promise
  return new Promise((resolve) => {
    confirmButton.addEventListener('click', () => {
      // return true on btn click
      resolve(true);
      // close modal
      modal.close();
    })
  })
}


