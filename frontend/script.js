const API_URL = "http://your-vps-ip:3000";

// 🔹 Buat Akun Pterodactyl
async function createUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(JSON.stringify(data, null, 2));
}

// 🔹 Buat Server Pterodactyl
async function createServer() {
    const userId = document.getElementById("userId").value;
    const serverName = document.getElementById("serverName").value;

    const response = await fetch(`${API_URL}/create-server`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, serverName })
    });

    const data = await response.json();
    alert(JSON.stringify(data, null, 2));
}

function showForm(formId) {
    let forms = document.querySelectorAll(".form");
    forms.forEach(form => form.classList.add("hidden"));

    let selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.classList.remove("hidden");
    }
}