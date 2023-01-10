// Initialize Materialize.css
let chipInstances;
let attendees
document.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.modal');
  // TODO - remove unused consts
  const modalInstances = M.Modal.init(modals);
  const tooltips = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltips);
  const sidenavs = document.querySelectorAll('.sidenav');
  const sidenavInstances = M.Sidenav.init(sidenavs);
  const dates = document.querySelectorAll('.datepicker');
  const dateInstances = M.Datepicker.init(dates);
  const times = document.querySelectorAll('.timepicker');
  const timeInstances = M.Timepicker.init(times);
  const chips = document.querySelectorAll('.chips');
  chipInstances = M.Chips.init(chips, {
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

// initialize rich text editor
const quill = new Quill('#discussion-summary', {
  theme: 'snow',
  placeholder:'Enter discussion points here...'
});
