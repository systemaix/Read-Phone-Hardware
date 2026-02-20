const fill = document.getElementById('fill');
const percentageText = document.getElementById('percentage');
const statusText = document.getElementById('status-text');
const chargingIcon = document.getElementById('charging-icon');

// 1. Check if the browser actually supports the API
if ('getBattery' in navigator) {
    
    // 2. Request the battery data
    navigator.getBattery().then((battery) => {
        
        // Helper function to update everything visually
        function updateBatteryUI() {
            // Level comes as a decimal (e.g. 0.8), so multiply by 100
            const level = Math.round(battery.level * 100);
            
            // Update Text
            percentageText.innerText = `${level}%`;
            
            // Update Fill Width
            fill.style.width = `${level}%`;

            // Change color based on battery level
            if (level <= 20) {
                fill.style.background = '#e74c3c'; // Red
            } else if (level <= 50) {
                fill.style.background = '#f1c40f'; // Yellow
            } else {
                fill.style.background = '#2ecc71'; // Green
            }

            // Update Charging Status
            if (battery.charging) {
                statusText.innerText = "Charging...";
                chargingIcon.classList.add('active');
            } else {
                statusText.innerText = "Unplugged";
                chargingIcon.classList.remove('active');
            }
        }

        // 3. Run once on load
        updateBatteryUI();

        // 4. Listen for real-time changes!
        battery.addEventListener('chargingchange', updateBatteryUI);
        battery.addEventListener('levelchange', updateBatteryUI);
    });
    
} else {
    // Fallback for Safari/Firefox users
    percentageText.innerText = "N/A";
    statusText.innerText = "Battery API not supported in this browser 😢";
    fill.style.width = "0%";
}
