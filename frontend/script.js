document.getElementById('homeButton').addEventListener('click', function() {
    loadHomePage();
});

document.getElementById('dataButton').addEventListener('click', function() {
    loadDataPage();
});

document.getElementById('settingsButton').addEventListener('click', function() {
    loadSettingsPage();
});

function loadHomePage() {
    destroyMap(); // Destroy the existing map instance
    document.getElementById('content').innerHTML = `
        <div id="map" style="height: calc(100vh - 115px); width: 100%;"></div>
    `;
    initMap(); // Initialize the map once
}

function loadDataPage() {
    destroyMap(); // Destroy the existing map instance
    document.getElementById('content').innerHTML = `
        <div class="data-menu" id="dataMenu">
            <div class="data-menu-item">
                <label for="dateInput">Select Date:</label>
                <input type="date" id="dateInput">
            </div>
            <div class="data-menu-item">
                <label for="vehicleIdInput">Vehicle ID:</label>
                <input type="text" id="vehicleIdInput" placeholder="Enter Vehicle ID">
            </div>
            <button id="submitButton">Submit</button>
        </div>
        <div id="map" style="height: calc(100vh - 115px); width: 100%;"></div>
    `;
    addDataMenuListeners();
    initMap(); // Initialize the map once
}

function loadSettingsPage() {
    destroyMap(); // Destroy the existing map instance
    document.getElementById('content').innerHTML = `
        <div class="settings-options">
            <button class="settings-button" id="addUserButton">Add New User</button>
            <button class="settings-button" id="logoutButton">Logout</button>
        </div>
    `;

    document.getElementById('addUserButton').addEventListener('click', function() {
        alert('Add New User functionality is not implemented yet.');
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        alert('Logout functionality is not implemented yet.');
    });
}

let map = null; // Declare a global variable to hold the map instance

function initMap() {
    map = L.map('map').setView([27.1303344, 80.859666], 7); // Set center to Uttar Pradesh coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map; // Return the map instance
}

function destroyMap() {
    if (map) {
        map.remove(); // Remove the existing map instance
        map = null; // Reset the map variable
    }
}

function addDataMenuListeners() {
    document.getElementById('submitButton').addEventListener('click', function() {
        const date = document.getElementById('dateInput').value;
        const vehicleId = document.getElementById('vehicleIdInput').value;

        if (date && vehicleId) {
            fetch(`http://localhost:5000/api/vehicle-locations/${date}/${vehicleId}`)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text) });
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length) {
                        destroyMap(); // Destroy the existing map instance
                        const map = initMap(); // Reinitialize the map
                        map.setView([data[0].latitude, data[0].longitude], 10);
                        data.forEach(location => {
                            L.marker([location.latitude, location.longitude]).addTo(map)
                                .bindPopup(`Vehicle ID: ${location.vehicle_id}`)
                                .openPopup();
                        });
                    } else {
                        alert('No data found for the given date and vehicle ID.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to fetch data. Please check the console for more details.');
                });
        } else {
            alert('Please fill in both fields.');
        }
    });
}

window.onload = function() {
    loadHomePage();
};
