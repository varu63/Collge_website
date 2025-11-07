from flask import Flask, render_template, request, jsonify, redirect, url_for,flash
from pymongo import MongoClient
from datetime import datetime



app = Flask(__name__)
app.secret_key = "techfest2025_secret" 

MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["techfest2025"]
registrations = db["registrations"]


# ---------------- Helper Validation ----------------
def validate_form(form):
    required = ["full_name", "email", "phone", "institution", "course", "year"]
    for field in required:
        if not form.get(field):
            return False, f"{field.replace('_', ' ').title()} is required."

    if "@" not in form["email"]:
        return False, "Invalid email address."
    if len(form["phone"]) < 7:
        return False, "Phone number too short."
    return True, ""

# -----------------------------
# Web Pages
# -----------------------------
@app.route("/")
def home():
    return render_template("home.html")

@app.route("/B_tech")
def B_Tech():
    return render_template("B_Tech.html")

@app.route("/BCA")
def BCA():
    return render_template("BCA.html")

@app.route("/Diploma")
def Diploma():
    return render_template("Diploma.html")

@app.route("/form")
def admission_form():
    return render_template("form.html")

@app.route("/Tech_Fest")
def Techfest():
    return render_template("Techfest_Details.html")

@app.route("/Placmen Drive")
def Placment_Drive():
    return render_template("Placment_Drive.html")

@app.route("/Admission Details")
def Admission_Details():
    return render_template("Admission_Details.html")

@app.route("/Techfest_Registration")
def Techfest_Regisiter():
    return render_template("Techfest_Registration.html")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True)  # safer version
    if not data or 'message' not in data:
        return jsonify({"reply": "⚠️ Invalid request. Please send a message."}), 400

    user_msg = data.get("message", "").lower()

    if "hello" in user_msg:
        reply = "Hello 👋! How can I help you today?"
    elif "course" in user_msg:
        reply = "We offer B.Tech, BCA, and Diploma programs at Elite College."
    elif "admission" in user_msg:
        reply = "Admissions are open! Visit our official portal to apply."
    else:
        reply = "I'm not sure about that — want details about our courses or facilities?"

    return jsonify({"reply": reply})


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    course = request.form.get('course')
    branch = request.form.get('branch')

    # Create a document (record) for MongoDB
    data = {
        "name": name,
        "email": email,
        "course": course,
        "branch": branch if branch else None,
        "timestamp": datetime.now()
    }

    # Insert into MongoDB collection
    registrations.insert_one(data)

    # Return confirmation
    return f"""
    <h2>Form Submitted Successfully ✅</h2>
    <p><b>Name:</b> {name}</p>
    <p><b>Email:</b> {email}</p>
    <p><b>Course:</b> {course}</p>
    <p><b>Branch:</b> {branch if branch else 'N/A'}</p>
    <p style='color:green;'>Data saved to MongoDB successfully!</p>
    <a href="/">Back to form</a>
    """
@app.route("/registration_form", methods=["GET", "POST"])
def registration_form():
    if request.method == "POST":
        form = request.form
        valid, msg = validate_form(form)

        if not valid:
            flash(msg, "error")
            return redirect(url_for("registration_form"))

        events = request.form.getlist("events")

        data = {
            "timestamp": datetime.now(),
            "full_name": form.get("full_name"),
            "email": form.get("email"),
            "phone": form.get("phone"),
            "institution": form.get("institution"),
            "course": form.get("course"),
            "branch": form.get("branch"),
            "year": form.get("year"),
            "events": events,
            "team_name": form.get("team_name"),
        }

        registrations.insert_one(data)
        flash("✅ Registration submitted successfully!", "success")
        return redirect(url_for("registration_form"))

    return render_template("register.html")

# -----------------------------
# Run App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True,use_reloader = False)
