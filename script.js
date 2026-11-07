document.addEventListener('DOMContentLoaded', () => {
    // 1. Find all elements on the page that have contenteditable
    const editableElements = document.querySelectorAll('[contenteditable]');
    
    // 2. Load any previously saved data from the iPad's local storage
    editableElements.forEach((el, index) => {
        const savedText = localStorage.getItem(`portfolio_text_${index}`);
        if (savedText) {
            el.innerHTML = savedText;
        }
    });

    // 3. Setup the Edit Toggle Button
    const editToggleBtn = document.getElementById('editToggle');
    let isEditMode = false;

    editToggleBtn.addEventListener('click', () => {
        isEditMode = !isEditMode;
        
        if (isEditMode) {
            // Turn ON Edit Mode
            editToggleBtn.textContent = "Save & Disable Edit Mode";
            editToggleBtn.classList.replace('btn-warning', 'btn-success');
            
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'true');
            });
        } else {
            // Turn OFF Edit Mode & Save
            editToggleBtn.textContent = "Enable Edit Mode";
            editToggleBtn.classList.replace('btn-success', 'btn-warning');
            
            editableElements.forEach((el, index) => {
                el.setAttribute('contenteditable', 'false');
                // Save the exact text typed into the iPad's memory
                localStorage.setItem(`portfolio_text_${index}`, el.innerHTML);
            });
            
            // Small alert to confirm it worked
            alert("Your changes have been successfully saved to this device!");
        }
    });
});
