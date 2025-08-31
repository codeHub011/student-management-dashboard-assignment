let students = JSON.parse(localStorage.getItem("students")) || [];
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("search");

function renderTable(data = students) {
  studentTableBody.innerHTML = "";
  data.forEach((student, index) => {
    let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.regNo}</td>
        <td>${student.dept}</td>
        <td>${student.year}</td>
        <td>${student.marks}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    studentTableBody.innerHTML += row;
  });
}

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const newStudent = {
    name: document.getElementById("name").value,
    regNo: document.getElementById("regNo").value,
    dept: document.getElementById("dept").value,
    year: document.getElementById("year").value,
    marks: document.getElementById("marks").value
  };

  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  studentForm.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("regNo").value = student.regNo;
  document.getElementById("dept").value = student.dept;
  document.getElementById("year").value = student.year;
  document.getElementById("marks").value = student.marks;
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(searchValue) || s.regNo.toLowerCase().includes(searchValue)
  );
  renderTable(filtered);
});

// Initial render
renderTable();
