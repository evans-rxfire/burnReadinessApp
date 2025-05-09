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

function exportToTextFile() {
    const savedData = JSON.parse(localStorage.getItem("checklistData"));
    if (!savedData) {
      alert("No saved checklist data found.");
      return;
    }
  
    let text = "Prescribed Fire Readiness Checklist\n";
    text += "=====================================\n\n";
  
    Object.entries(savedData).forEach(([id, value]) => {
      const label = id.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
      if (typeof value === "boolean") {
        text += `${label}: ${value ? "✅ YES" : "❌ NO"}\n`;
      } else {
        text += `${label}: ${value || "(blank)"}\n`;
      }
    });
  
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
  
    const today = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `fire_checklist_${today}.txt`;
    a.click();
  
    URL.revokeObjectURL(url);
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

    document.getElementById("txt-btn").addEventListener("click", exportToTextFile);
});
