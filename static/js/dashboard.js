// =========================
// Create Map
// =========================

var map = L.map('map').setView([12.9716, 77.5946], 11);

// =========================
// OpenStreetMap
// =========================

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// =========================
// Custom Icons
// =========================

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
});

const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    shadowSize: [41,41]
});


// =========================
// Add Markers
// =========================

wards.forEach(ward => {

    let icon;

    if (ward.aqi > 200) {
        icon = redIcon;
    }
    else if (ward.aqi > 100) {
        icon = orangeIcon;
    }
    else {
        icon = greenIcon;
    }

    const marker = L.marker([ward.lat, ward.lng], {
        icon: icon
    }).addTo(map);

    marker.bindPopup(`
        <h3>${ward.name}</h3>

        <b>Current AQI:</b> ${ward.aqi}<br>

        <b>Predicted AQI:</b> ${ward.predicted}<br>

        <b>Risk:</b> ${ward.risk}<br>

        <b>Primary Source:</b> ${ward.source}<br>
    `);

    marker.on('mouseover', function () {
        this.openPopup();
    });

    marker.on('mouseout', function () {
        this.closePopup();
    });

});

// =========================
// AQI Trend Chart
// =========================

const ctx = document.getElementById('aqiChart').getContext('2d');

// Gradient fill
const gradient = ctx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, 'rgba(25,118,210,0.45)');
gradient.addColorStop(1, 'rgba(25,118,210,0.05)');

Chart.register(ChartDataLabels);

new Chart(ctx, {

    type: 'line',

    data: {

        labels: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],

        datasets: [{

            label: 'Average AQI',

            data: [118,145,172,185,168,210,195],

            borderColor: '#1976D2',

            backgroundColor: gradient,

            fill: true,

            borderWidth: 2.5,

            pointRadius: 4,

            pointHoverRadius: 7,

            pointBackgroundColor: '#1976D2',

            tension: 0.4

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {

            legend: {

                display: true

            },

            datalabels: {

                anchor: 'end',

                align: 'top',

                font: {

                    weight: 'bold',

                    size: 12

                },

                color: function(context) {

                    const value = context.dataset.data[context.dataIndex];

                    if (value > 200)
                        return '#F44336';

                    if (value > 100)
                        return '#FF9800';

                    return '#4CAF50';

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                title: {

                    display: true,

                    text: 'Average AQI'

                },

                grid: {
                    color: "#eeeeee"
                }

            },

            x: {

                title: {

                    display: true,

                    text: 'Last 7 Days'

                },

                grid: {
                    display: false
                }

            }

        }

    }

});

// =========================
// Pollution Source Chart
// =========================

const sourceCtx = document.getElementById('sourceChart').getContext('2d');

new Chart(sourceCtx, {

    type: 'doughnut',

    data: {

        labels: [

            'Traffic',

            'Construction',

            'Industries',

            'Biomass Burning'

        ],

        datasets: [{

            data: [

                45,

                25,

                20,

                10

            ],

            backgroundColor: [

                '#FF9800',

                '#4CAF50',

                '#2196F3',

                '#F44336'

            ],

            borderWidth: 2

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: true,

        aspectRatio: 1,

        cutout: '60%',

        plugins: {

            legend: {

                position: 'bottom',

                labels: {

                    boxWidth: 18,

                    padding: 20,

                    font: {

                        size: 14,

                        weight: 'bold'

                    }

                }

            },

            datalabels: {

                color: '#ffffff',

                font: {

                    size: 14,

                    weight: 'bold',

                    family: 'Arial'

                },

                formatter: (value) => value + '%',

                anchor: 'center',

                align: 'center',

                textStrokeColor: '#000000',

                textStrokeWidth: 2

            }

        }

    }

});


// =========================
// AirGuard AI Assistant
// =========================

function askAI(question){

    document.getElementById("userQuestion").value = question;

    sendQuestion();

}

function sendQuestion(){

    const question =
        document.getElementById("userQuestion")
        .value
        .toLowerCase();

    let response = "";

    if(question.includes("highest") || question.includes("ward")){

        response =
`🚨 HIGH RISK WARD

📍 Ward 18

Predicted AQI : 276

Main Pollution Source :
Traffic Congestion (63%)

Recommended Actions

• Restrict heavy diesel vehicles

• Increase traffic police deployment

• Water sprinkling

🤖 AI Confidence : 96%`;

    }

    else if(question.includes("budget")){

        response =
`💰 BUDGET PLAN

Available Budget

₹5,00,000

Recommended Allocation

🚧 Water Sprinkling
₹2,00,000

🚦 Traffic Diversion
₹1,50,000

📢 Public Awareness
₹1,00,000

📊 Air Quality Monitoring
₹50,000

Expected AQI Reduction

20–25 Points`;

    }

    else if(question.includes("cost")){

        response =
`📊 COST vs IMPACT

Heavy Vehicle Restriction

Cost : ₹4.8 Lakh

Expected AQI Improvement

34 Points

Priority

HIGH

AI Recommendation

Best Return on Investment`;

    }

    else if(question.includes("action")){

        response =
`📋 TODAY'S ACTION PLAN

08:00 AM

Inspect Ward 18

10:00 AM

Deploy Water Sprinklers

01:00 PM

Industrial Emission Inspection

04:00 PM

Traffic Diversion

Expected AQI Tomorrow

182

🤖 Confidence

94%`;

    }

    else{

        response =
`🤖 AirGuard AI

I can help you with

• Highest Risk Ward

• Budget Planning

• Cost & Impact Analysis

• Municipal Action Plans

Try asking one of these!`;

    }

    document.getElementById("aiResponse").innerText = response;

}

// Animate KPI Numbers

document.querySelectorAll(".card h2").forEach(card => {

    const target = parseInt(card.innerText);

    if (isNaN(target)) return;

    let value = 0;

    const interval = setInterval(() => {

        value += Math.ceil(target / 40);

        if (value >= target) {

            value = target;

            clearInterval(interval);

        }

        card.innerText = value;

    }, 25);

});