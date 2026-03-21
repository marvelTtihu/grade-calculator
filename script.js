const subjects = ["math", "english", "physics", "chemistry", "biology"];

// Cache DOM elements for better performance
const elements = {
    submitBtn: document.getElementById('submitBtn'),
    average: document.getElementById('average'),
    grade: document.getElementById('grade'),
    status: document.getElementById('status')
};

// Create input elements cache
subjects.forEach(subject => {
    elements[subject] = document.getElementById(subject);
});

elements.submitBtn.addEventListener('click', calculateGrade);

function calculateGrade() {
    const scores = [];
    const errors = [];

    // Validate all inputs first
    subjects.forEach(subject => {
        const input = elements[subject];
        const value = input.value.trim();

        if (value === '') {
            errors.push(`${subject.charAt(0).toUpperCase() + subject.slice(1)} score is required.`);
            return;
        }

        const score = parseFloat(value);
        if (isNaN(score) || score < 0 || score > 100) {
            errors.push(`${subject.charAt(0).toUpperCase() + subject.slice(1)} score must be a number between 0 and 100.`);
            return;
        }

        scores.push(score);
    });

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }


    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;

    // Update display with formatted average
    elements.average.textContent = `Your average is: ${average.toFixed(2)}`;
    elements.grade.textContent = `Your grade is: ${setGrades(average)}`;
    getStatus(average);


    subjects.forEach(subject => elements[subject].value = '');
}

function getStatus(average) {
    const statusElement = elements.status;
    statusElement.className = '';
    statusElement.textContent = average >= 75 ? "Passed" : "Failed";
    statusElement.classList.add(average >= 75 ? "pass-grade" : "fail-grade");
}

function setGrades(average) {
    if (average >= 90) return "A+";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else return "F";
}