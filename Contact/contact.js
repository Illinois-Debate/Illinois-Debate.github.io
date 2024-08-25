// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWU2AIKsREL-bJOBzm5Iq03jnePzox6MY",
  authDomain: "illinois-debate-community.firebaseapp.com",
  projectId: "illinois-debate-community",
  storageBucket: "illinois-debate-community.appspot.com",
  messagingSenderId: "595482977676",
  appId: "1:595482977676:web:2d3bf4f6f2a2b9f6d4a2a9",
  measurementId: "G-XFY4R0QZ3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference to Firestore
const db = getFirestore(app);

// Fetch data from Firestore
const debateSchoolsCollection = collection(db, "debateSchools");
getDocs(debateSchoolsCollection).then((querySnapshot) => {
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
    <td>${data.School || "N/A"}</td>
    <td>${data.Coach || "N/A"}</td>
    <td>${data.Email || "N/A"}</td>
    <td>${data.Phone || "N/A"}</td>
    <td>${data.Congress ? "x" : ""}</td>
    <td>${data["Lincoln-Douglas"] ? "x" : ""}</td>
    <td>${data["Public Forum"] ? "x" : ""}</td>
    <td>${data.Policy ? "x" : ""}</td>
`;

  tableBody.appendChild(row);
}

// Search functionality
document.getElementById("searchInput").addEventListener("keyup", function () {
  const filter = this.value.toLowerCase();
  const rows = document.getElementById("tableBody").getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});
