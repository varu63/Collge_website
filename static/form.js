
const form = document.getElementById('details-form');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const courseSelect = document.getElementById('course');
const branchContainer = document.getElementById('branch-container');
const branchSelect = document.getElementById('branch');

courseSelect.addEventListener('change', function () {
    const selectedCourse = this.value;
    if (selectedCourse === 'btech' || selectedCourse === 'diploma') {
        branchContainer.classList.remove('hidden');
        branchSelect.required = true;
    } else {
        branchContainer.classList.add('hidden');
        branchSelect.required = false;
        branchSelect.value = "";
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    messageText.textContent = `Thank you, ${name}! Your details have been received.`;
    messageBox.classList.remove('hidden');
    form.reset();
    branchContainer.classList.add('hidden');
    branchSelect.required = false;
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 4000);
});
