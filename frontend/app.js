document.getElementById("submitBtn").addEventListener("click", submitData);
document.getElementById("filterBtn").addEventListener("click", applyFilters);

let originalResponse = null;

function submitData() {
    const input = document.getElementById("jsonInput").value;
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = '';

    try {
        const parsedData = JSON.parse(input);

        // Perform validation if necessary (e.g., check if data exists)
        if (!parsedData.data) {
            throw new Error("Invalid JSON format. Missing 'data' key.");
        }

        // Call the backend API
        fetch('http://localhost:5000/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData)
        })
        .then(response => response.json())
        .then(data => {
            originalResponse = data;
            document.getElementById("responseOutput").textContent = JSON.stringify(data, null, 2);
            document.getElementById("dropdownContainer").classList.remove("hidden");
        })
        .catch(error => {
            errorDiv.innerHTML = "Error fetching data from API.";
        });

    } catch (e) {
        errorDiv.innerHTML = "Invalid JSON input.";
    }
}

function applyFilters() {
    const selectedFilters = Array.from(document.getElementById("filterOptions").selectedOptions).map(option => option.value);
    if (!originalResponse) return;

    let filteredResponse = { ...originalResponse };

    if (selectedFilters.includes('alphabets')) {
        filteredResponse.data = filteredResponse.data.filter(char => isNaN(char));
    }

    if (selectedFilters.includes('numbers')) {
        filteredResponse.data = filteredResponse.data.filter(char => !isNaN(char));
    }

    if (selectedFilters.includes('highestLowercase')) {
        const lowercaseAlphabets = filteredResponse.data.filter(char => char >= 'a' && char <= 'z');
        if (lowercaseAlphabets.length > 0) {
            const highest = lowercaseAlphabets.sort().reverse()[0];
            filteredResponse.data = [highest];
        } else {
            filteredResponse.data = [];
        }
    }

    document.getElementById("responseOutput").textContent = JSON.stringify(filteredResponse, null, 2);
}