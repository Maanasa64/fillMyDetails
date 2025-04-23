const fillButton = document.getElementById('fillButton');

if (fillButton) {
  fillButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: fillInApplication
    });
  });
}

function fillInApplication() {
  const fields = [
    { name: 'First Name', value: 'Maanasa' },
    { name: 'Last Name', value: 'Prasad' },
    { name: 'Email', value: 'mmprasad@ucsd.edu' },
    { name: 'Phone', value: '619-483-5914' },
    { name: 'City', value: 'San Diego' },
    { name: 'Country', value: 'United States' },
    { name: 'Zip', value: '92122' },
    { name: 'School', value: 'University of California San Diego' }
  ];

  fields.forEach(field => {
    const selectors = [
      `input[name="${field.name}" i]`,
      `input[placeholder*="${field.name}" i]`,
      `input[id*="${field.name.toLowerCase()}"]`,
      `input[data-testid*="${field.name.toLowerCase()}"]`,
      `input[aria-label*="${field.name}" i]`
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        element.focus();
        element.value = field.value;

        ['input', 'change', 'blur'].forEach(eventType => {
          const event = new Event(eventType, {
            bubbles: true,
            cancelable: true
          });
          element.dispatchEvent(event);
        });
        
        break;
      }
    }
  });
}