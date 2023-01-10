// Initialize Materialize.css
let chipInstances;
let attendees
document.addEventListener('DOMContentLoaded', function () {
  var modalElems = document.querySelectorAll('.modal');
  var modalInstances = M.Modal.init(modalElems);
  const sidenavElems = document.querySelectorAll('.sidenav');
  const sidenavInstances = M.Sidenav.init(sidenavElems);
  const dateElems = document.querySelectorAll('.datepicker');
  const dateInstances = M.Datepicker.init(dateElems);
  const timeElems = document.querySelectorAll('.timepicker');
  const timeInstances = M.Timepicker.init(timeElems);
  const chipElems = document.querySelectorAll('.chips');
  chipInstances = M.Chips.init(chipElems, {
    data: [
      // TEST
      { // dynamically add user name
        tag: 'Jacqueline Henderson'
      }
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
  })
  attendees = chipInstances[0].chipsData;
});

const quill = new Quill('#discussion-summary', {
  theme: 'snow',
  placeholder:'Enter discussion points here...'
});
