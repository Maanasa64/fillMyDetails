const fillButton = document.getElementById('fillButton');
console.log(fillButton)


if (fillButton) {
  console.log("fillButton is found.");
  fillButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      console.log(activeTab)
      chrome.scripting.executeScript({
        injection:{ tabId: activeTab.id },
        callback: fillInApplication
      });
    });
  });
} else {
  console.log("Element with ID 'fillButton' not found.");
}

function fillInApplication() {
  // const firstName = document.querySelector('First Name');
  // console.log(firstName.textContent);
  console.log('running')
  document.querySelector('input[name="First Name"]').value = 'Maanasa';
  document.querySelector('input[name="Last Name"]').value = 'Prasad';
  document.querySelector('input[name="Email"]').value = 'mmprasad@ucsd.edu';
  document.querySelector('input[name="Phone"]').value = '619-483-5914'; 
  document.querySelector('input[name="City"]').value = 'San Diego';
  document.querySelector('input[name="Country"]').value = 'United States';
  document.querySelector('input[name="Zip"]').value = '92122'; 
  document.querySelector('input[name="School"]').value = 'University of California San Diego';
}

function execute() {
  console.log('executing')
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: fillInApplication
          });
        });
}
