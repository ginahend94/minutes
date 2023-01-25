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
    return textareas.map((textarea) => textarea.value).filter((val) => val.trim());
  };
  const getActionItems = () => {
    // grab ul
    const actionItemList = form.querySelector('.action-items');
    // get array of text spans containing items
    const items = [...actionItemList.querySelectorAll('li .text')]
    // return array of text spans text
    return items.map((item) => item.textContent);
  };
  const getDiscussionSummary = () => {
    // get editor div
    const editor = form.querySelector('#discussion-summary .ql-editor');
    // return html as string
    return editor.innerHTML;
  };

  const getFormData = () => {
    const obj = {
      title: form['meeting-title'].value,
      date: form['date'].value,
      time: form['time'].value,
      attendees: getChips(),
      agenda: getAgendaItems(),
      'action items': getActionItems(),
      'discussion summary': getDiscussionSummary(),
      'next meeting': {
        date: form['next-date'].value,
        time: form['next-time'].value,
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

  const testData = {
    "title": "",
    "date": "Jan 11, 2023",
    "time": "02:32 AM",
    "attendees": [
      "Jacqueline Henderson",
      "Gina Henderson",
      "David Henderson",
      "Lily Henderson",
      "Milo Henderson"
    ],
    "agenda": [
      "Plan picnic"
    ],
    "action items": [
      "Milo and Lily will find a location",
      "David will plan games",
      "Mom and Gina will make food"
    ],
    "discussion summary": "<p>Everybody was excited</p><ul><li>Milo said \"woof\"</li><li>Lily responded \"bork\"</li><li>David doesn't like rice</li><li>Mom would like something with cinnamon for dessert</li></ul><p>The picnic should go forward as planned</p>",
    "next meeting": {
      "date": "Jan 22, 2023",
      "time": "05:32 PM"
    }
  }

  return {
    save: saveToDB,
  };
})();



export { NewMeeting };
