// Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore
const db = firebase.firestore();

// Fetch data from Firestore
db.collection("debateSchools").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        addRowToTable(data);
    });
});

// Function to add row to the table
function addRowToTable(data) {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.school}</td>
        <td>${data.coach}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.typesOfDebate}</td>
        <td>${data.congress ? 'x' : ''}</td>
        <td>${data.lincolnDouglas ? 'x' : ''}</td>
        <td>${data.publicForum ? 'x' : ''}</td>
        <td>${data.policy ? 'x' : ''}</td>
    `;

    tableBody.appendChild(row);
}

// Search functionality
document.getElementById("searchInput").addEventListener("keyup", function() {
    const filter = this.value.toLowerCase();
    const rows = document.getElementById("tableBody").getElementsByTagName("tr");

    Array.from(rows).forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});
