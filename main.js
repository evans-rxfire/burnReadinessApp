function saveChecklist() {
    const formElements = document.querySelectorAll('input[type="checkbox"], input[type="text"], input[type="number"], input[type="date"], input[type="time"], .notes');

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
  
    const sections = {
      "Project Info": ["burn-name", "burn-county", "burn-date"],
      "Burn Ban": ["burn-ban", "exemption-granted", "date-granted"],
      "Burn Plan": ["signatures", "review-complete", "forms-signed", "maps-printed"],
      "Burn Unit": ["firebreaks-complete", "var-identified", "risk-mitigated", "water-identified", "water-adequate"],
      "Weather/Prescription": ["forecast-within-prescription", "weather-event", "fuel-moisture", "nfdre-indices", "kbdi", "weather-kit-present", "weather-monitor-assigned"],
      "Smoke Management": ["ventilation-rate", "smoke-impacts", "smoke-mitigated", "tceq-permit", "smoke-signs-set"],
      "Personnel": ["burn-boss", "crew-present", "crew-minimum", "briefing-complete"],
      "Equipment": ["engines-present", "engine-minimum", "utvs-present", "utv-minimum", "pump-test-complete", "equipment-present", "handtools-present", "driptorches-filled", "driptorch-minimum", "driptorch-fuel"],
      "Communications": ["radios-present", "frequencies-set", "radio-checks-complete"],
      "Notifications": ["dispatch-notified", "dispatch-time-called", "fire-dept-notified", "fire-marshal-notified", "emc-notified", "tamfs-dispatch-notified", "tamfs-local-office-notified", "tceq-notified", "neighbors-notified"],
      "Safety": ["safety-hazards-present", "safety-hazards-mitigated", "first-aid-kit-present"],
      "Contingency": ["contingency-lines-present", "contingency-resources"],
      "Test Fire": ["test-fire-ignited", "test-fire-sucessful"],
      "Go/No-Go": ["go-nogo-complete"],
    };
  
    let text = "Prescribed Fire Readiness Checklist\n";
    text += "=====================================\n\n";
  
    for (const [sectionTitle, fieldIds] of Object.entries(sections)) {
      text += `${sectionTitle}\n--------------------\n`;
      fieldIds.forEach(id => {
        const rawValue = savedData[id];
        const label = id.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');

        if (typeof rawValue === "boolean") {
          text += `${label}: ${rawValue ? "✅ YES" : "❌ NO"}\n`;
        } else {
          text += `${label}: ${rawValue || "(blank)"}\n`;
        }

        const notesElement = document.querySelector(`#${id} ~ .notes`);

        if (notesElement && notesElement.value.trim()) {
        text += `  Notes: ${notesElement.value.trim()}\n`;
        }
      });

      text += "\n";
    }
  
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
  
    const today = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `fire_checklist_${today}.txt`;
    a.click();
  
    URL.revokeObjectURL(url);
  }

  function copySummaryToClipboard() {
    const savedData = JSON.parse(localStorage.getItem("checklistData"));
    if (!savedData) {
      alert("No saved checklist data found.");
      return;
    }
  
    const sections = {
        "Project Info": ["burn-name", "burn-county", "burn-date"],
        "Burn Ban": ["burn-ban", "exemption-granted", "date-granted"],
        "Burn Plan": ["signatures", "review-complete", "forms-signed", "maps-printed"],
        "Burn Unit": ["firebreaks-complete", "var-identified", "risk-mitigated", "water-identified", "water-adequate"],
        "Weather/Prescription": ["forecast-within-prescription", "weather-event", "fuel-moisture", "nfdre-indices", "kbdi", "weather-kit-present", "weather-monitor-assigned"],
        "Smoke Management": ["ventilation-rate", "smoke-impacts", "smoke-mitigated", "tceq-permit", "smoke-signs-set"],
        "Personnel": ["burn-boss", "crew-present", "crew-minimum", "briefing-complete"],
        "Equipment": ["engines-present", "engine-minimum", "utvs-present", "utv-minimum", "pump-test-complete", "equipment-present", "handtools-present", "driptorches-filled", "driptorch-minimum", "driptorch-fuel"],
        "Communications": ["radios-present", "frequencies-set", "radio-checks-complete"],
        "Notifications": ["dispatch-notified", "dispatch-time-called", "fire-dept-notified", "fire-marshal-notified", "emc-notified", "tamfs-dispatch-notified", "tamfs-local-office-notified", "tceq-notified", "neighbors-notified"],
        "Safety": ["safety-hazards-present", "safety-hazards-mitigated", "first-aid-kit-present"],
        "Contingency": ["contingency-lines-present", "contingency-resources"],
        "Test Fire": ["test-fire-ignited", "test-fire-sucessful"],
        "Go/No-Go": ["go-nogo-complete"],
      };
  
    let text = "Prescribed Fire Readiness Checklist\n";
    text += "=====================================\n\n";
  
    for (const [sectionTitle, fieldIds] of Object.entries(sections)) {
      text += `${sectionTitle}\n--------------------\n`;
      fieldIds.forEach(id => {
        const rawValue = savedData[id];
        const label = id.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
        
        if (typeof rawValue === "boolean") {
          text += `${label}: ${rawValue ? "✅ YES" : "❌ NO"}\n`;
        } else {
          text += `${label}: ${rawValue || "(blank)"}\n`;
        }

        const notesElement = document.querySelector(`#${id} ~ .notes`);
        
        if (notesElement && notesElement.value.trim()) {
          text += `  Notes: ${notesElement.value.trim()}\n`;
        }
      });

      text += "\n";
    }
  
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ Summary copied to clipboard!");
    }).catch(err => {
      alert("❌ Failed to copy summary. Please try again.");
      console.error(err);
    });
  }


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".notes").forEach((notesInput, index) => {
        if (!notesInput.id) {
          const relatedInput = notesInput.previousElementSibling?.tagName === "INPUT"
            ? notesInput.previousElementSibling
            : notesInput.closest(".checklist-item")?.querySelector("input");
      
          const relatedId = relatedInput?.id || `notes-${index}`;
          const generatedId = `${relatedId}-notes`;
          notesInput.id = generatedId;
        }
      });
    
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

    document.getElementById("clipboard-btn").addEventListener("click", copySummaryToClipboard);
});
