# College Website

A web application for managing a college website — built with Python Flask, MongoDB, Docker, and standard web front-end technologies.

---

## ✨ Features

- Clean, responsive front-end using HTML, CSS & JavaScript.  
- Back-end built in Flask (`app.py`).  
- Uses MongoDB (via `mongodb.yaml` configuration) to store data.  
- Containerised setup using Docker (`Dockerfile`).  
- Static assets separated into `static/` and HTML templates in `templates/`.  
- Easily configurable via the `.env` file.

---

## 📁 Project Structure

.
├── app.py # Main Flask application
├── Dockerfile # Docker build instructions
├── mongodb.yaml # MongoDB configuration / schema
├── requirements.txt # Python dependencies
├── .env # Environment variables (keep secrets out of version control)
├── templates/ # HTML templates
├── static/ # CSS, JS, images, other static assets
└── README.md # (this file)

yaml
Copy code

---

## 🚀 Getting Started

### Prerequisites

- Docker installed on your machine.  
- (Optional) A MongoDB instance if you prefer not to run via Docker.  

### Running with Docker

1. Copy `.env.example` to `.env` and configure your environment variables (e.g., `MONGO_URI`, `FLASK_ENV`).  
2. Build the Docker image:
   ```bash
   docker build -t college-website:latest .
Run the container:

bash
Copy code
docker run --env-file .env -p 5000:5000 college-website:latest
Open http://localhost:5000 in your browser.

Running Locally (without Docker)
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Set environment variables (or create a .env file).

Start the Flask app:

bash
Copy code
flask run
Visit http://localhost:5000.

🛠️ Configuration
.env — Store secret keys, database URIs, debug mode flag, etc.

mongodb.yaml — Contains MongoDB setup or schema details.

Dockerfile — Defines how the container is built (base image, dependencies, startup command).

✅ Contributions
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a feature branch: git checkout -b my-feature.

Commit your changes: git commit -m "Add some feature".

Push to the branch: git push origin my-feature.

Open a Pull Request and describe your changes.

Please ensure your code adheres to the repository’s style and includes documentation where needed.



📬 Contact
Created by [Varun] — feel free to reach out with suggestions, bugs or improvements.
