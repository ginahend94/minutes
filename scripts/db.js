const NewMeeting = (() => {
  const form = document.querySelector('.meeting-info');

  const getChips = () => {
    // get materialize chips instance
    const chips = M.Chips.getInstance(form.querySelector('.chips'));
    // return array pulling out names from data objects
    console.log(chips.chipsData.map(a => a.tag))
    return chips.chipsData.map(a => a.tag);
  };
  const getAgendaItems = () => {
    // grab ol
    const agendaList = form.querySelector('.agenda-list');
    // get array of li's
    const textareas = [...agendaList.querySelectorAll('li textarea')];
    // return array of textarea values
    return textareas.map((textarea) => textarea.value);
  };
  const getActionItems = () => {
    // grab ul
    const actionItemList = form.querySelector('.action-items');
    // return array of text spans containing items
    return [...actionItemList.querySelectorAll('li .text')];
  };
  const getDiscussionSummary = () => {
    // get editor div
    const editor = form.querySelector('#discussion-summary .ql-editor');
    // return html as string
    return editor.innerHTML;
  };

  const getFormData = () => {
    const obj = {
      title: form['meeting-title'],
      date: form['date'],
      time: form['time'],
      attendees: getChips(),
      agenda: getAgendaItems(),
      'action items': getActionItems(),
      'discussion summary': getDiscussionSummary(),
      'next meeting': {
        date: form['next-date'],
        time: form['next-time'],
      },
    };
    console.log(obj);
    return obj;
  };

  const saveToDB = () => {
    const data = getFormData();
    // TEST
    console.log(data);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveToDB();
  })

  return {
    save: saveToDB,
  };
})();

export { NewMeeting };
