from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

# ------------------------
# Demo Dashboard Data
# ------------------------

dashboard_data = {

    "current_aqi": 182,

    "predicted_aqi": 215,

    "risk": "Poor",

    "high_risk_wards": 5

}


# ------------------------
# Demo Ward Data
# ------------------------

wards = [

    {
        "name": "MG Road",
        "lat": 12.9756,
        "lng": 77.6050,
        "aqi": 182,
        "predicted": 215,
        "risk": "Poor",
        "source":"Traffic"
    },

    {
        "name": "Whitefield",
        "lat": 12.9698,
        "lng": 77.7500,
        "aqi": 248,
        "predicted": 276,
        "risk": "Very Poor",
        "source":"Construction"
    },

    {
        "name": "Electronic City",
        "lat": 12.8456,
        "lng": 77.6603,
        "aqi": 112,
        "predicted": 140,
        "risk": "Moderate",
        "source":"Industries"
    },

    {
        "name": "Hebbal",
        "lat": 13.0358,
        "lng": 77.5970,
        "aqi": 168,
        "predicted": 194,
        "risk": "Poor",
        "source":"Traffic"
    },

    {
        "name": "Yeshwanthpur",
        "lat": 13.0280,
        "lng": 77.5540,
        "aqi": 221,
        "predicted": 251,
        "risk": "Very Poor",
        "source":"Industries"
    },

    {
        "name": "Koramangala",
        "lat": 12.9352,
        "lng": 77.6245,
        "aqi": 145,
        "predicted": 171,
        "risk": "Poor",
        "source":"Traffic"
    },

    {
        "name": "Indiranagar",
        "lat": 12.9784,
        "lng": 77.6408,
        "aqi": 96,
        "predicted": 112,
        "risk": "Moderate",
        "source":"Traffic"
    },

    {
        "name": "Jayanagar",
        "lat": 12.9250,
        "lng": 77.5938,
        "aqi": 88,
        "predicted": 101,
        "risk": "Moderate",
        "source":"Residential"
    },

    {
        "name": "Rajajinagar",
        "lat": 12.9915,
        "lng": 77.5553,
        "aqi": 156,
        "predicted": 179,
        "risk": "Poor",
        "source":"Industries"
    },

    {
        "name": "Banashankari",
        "lat": 12.9181,
        "lng": 77.5736,
        "aqi": 119,
        "predicted": 142,
        "risk": "Moderate",
        "source":"Construction"
    }

]

# ------------------------
# Routes
# ------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():

    current_time = datetime.now().strftime("%d %b %Y | %I:%M %p")

    return render_template(
        "dashboard.html",
        data=dashboard_data,
        wards=wards,
        current_time=current_time
    )


if __name__ == "__main__":
    app.run(debug=True)