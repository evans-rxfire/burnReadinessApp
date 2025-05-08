function saveChecklist() {
    const formElements = document.querySelectorAll('input[type="checkbox"], input[type="text"], input[type="number"], input[type="date"], input[type="time"]');

    const formData = {};

    formElements.forEach(element => {
        if (element.type === "checkbox") {
            formData[element.id] = element.checked;
        } else {
            formData[element.id] = element.value;
        }
    });

    localStorage.setItem("checklistData", JSON.stringify(formData));

}

function loadChecklist() {
    const savedData = localStorage.getItem("checklistData");
    if (!savedData) return;

    const formData = JSON.parse(savedData);

    Object.keys(formData).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === "checkbox") {
                element.checked = formData[id];
            } else {
                element.value = formData[id];
            }
        }
    });
}

function resetChecklist() {
    localStorage.removeItem("checklistData");
    document.getElementById("checklist-form").reset();
}

document.addEventListener("DOMContentLoaded", () => {
    loadChecklist();

    document.querySelectorAll("input, textarea").forEach(el => {
        el.addEventListener("input", saveChecklist);
        el.addEventListener("change", saveChecklist);
    });
    
      // Reset button
    document.getElementById("reset-btn").addEventListener("click", () => {
        resetChecklist();
    });
    
    document.getElementById("checklist-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Checklist saved! (Data is stored in your browser)");
    });
});

function exportToPDF() {
    const element = document.getElementById("checklist-form");

    const options = {
        margin: 10,
        filename: `Prescribed_Fire_Checklist_${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" }
    };

    html2pdf().from(element).set(options).save();
}

document.getElementById("pdf-btn").addEventListener("click", exportToPDF);