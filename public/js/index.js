console.log('Client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  msgOne.textContent = 'Loading...';
  msgTwo.textContent = '';

  fetch(`/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) return (msgOne.textContent = data.error);
      msgOne.textContent = 'Location: ' + data.location;
      msgTwo.textContent = 'Forecast: ' + data.forecast;
    });
  });
});
