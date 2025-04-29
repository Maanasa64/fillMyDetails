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
    { name: 'First Name', value: 'Your First Name' },
    { name: 'Last Name', value: 'Your Last Name' },
    { name: 'Middle Name', value: 'Your Middle Name' },
    { name: 'Full Name', value: 'Your Full Name' },
    { name: 'Email', value: 'Your Email Address' },
    { name: 'Phone', value: 'Your Phone Number' },
    { name: 'City', value: 'Your City' },
    { name: 'Country', value: 'Your Country' },
    { name: 'Zip', value: 'Your Zip Code' },
    { name: 'School', value: 'Your School Name' }
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