// Add Member
document.getElementById('memberForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  let members = JSON.parse(localStorage.getItem('members')) || [];
  const newMember = {
    id: members.length + 1,
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    mobile: document.getElementById('mobile').value,
    age: document.getElementById('age').value,
    plan: document.getElementById('plan').value,
    transactionId: document.getElementById('transactionId').value,
    date: new Date().toLocaleDateString()
  };

  members.push(newMember);
  localStorage.setItem('members', JSON.stringify(members));
  alert("Member added!");
  window.location.href = 'members.html';
});

// Show Members with Edit/Delete
if (document.getElementById('memberList')) {
  let members = JSON.parse(localStorage.getItem('members')) || [];
  const list = document.getElementById('memberList');
  members.forEach((member, index) => {
    const row = `<tr>
      <td>${member.id}</td><td>${member.name}</td><td>${member.address}</td>
      <td>${member.mobile}</td><td>${member.age}</td><td>${member.plan}</td>
      <td>${member.transactionId}</td><td>${member.date}</td>
      <td>
        <button onclick="editMember(${index})">✏️ Edit</button>
        <button onclick="deleteMember(${index})">🗑️ Delete</button>
      </td>
    </tr>`;
    list.innerHTML += row;
  });
}

// Edit Member
function editMember(index) {
  const members = JSON.parse(localStorage.getItem('members'));
  const member = members[index];

  const name = prompt("Edit Name", member.name);
  const address = prompt("Edit Address", member.address);
  const mobile = prompt("Edit Mobile", member.mobile);
  const age = prompt("Edit Age", member.age);
  const plan = prompt("Edit Plan", member.plan);
  const transactionId = prompt("Edit Transaction ID", member.transactionId);

  if (name && address && mobile && age && plan && transactionId) {
    members[index] = { ...member, name, address, mobile, age, plan, transactionId };
    localStorage.setItem('members', JSON.stringify(members));
    alert("Member updated!");
    window.location.reload();
  }
}

// Delete Member
function deleteMember(index) {
  if (confirm("Are you sure you want to delete this member?")) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.splice(index, 1);
    members.forEach((m, i) => m.id = i + 1); // Reassign IDs
    localStorage.setItem('members', JSON.stringify(members));
    window.location.reload();
  }
}

// Export Members to CSV
document.getElementById('exportCSV')?.addEventListener('click', () => {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  let csv = "ID,Name,Address,Mobile,Age,Plan,Transaction ID,Date\n";
  members.forEach(m => {
    csv += `${m.id},"${m.name}","${m.address}",${m.mobile},${m.age},${m.plan},${m.transactionId},${m.date}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gym_members.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// Attendance Save
document.getElementById('attendanceForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  let attendances = JSON.parse(localStorage.getItem('attendance')) || [];
  const newAttendance = {
    memberId: parseInt(document.getElementById('memberId').value),
    timeIn: document.getElementById('timeIn').value,
    timeOut: document.getElementById('timeOut').value,
    date: new Date().toLocaleDateString()
  };

  attendances.push(newAttendance);
  localStorage.setItem('attendance', JSON.stringify(attendances));
  alert("Attendance recorded!");
  window.location.reload();
});

// Show Attendance
if (document.getElementById('attendanceList')) {
  let attendances = JSON.parse(localStorage.getItem('attendance')) || [];
  let members = JSON.parse(localStorage.getItem('members')) || [];
  const list = document.getElementById('attendanceList');

  attendances.forEach(att => {
    const member = members.find(m => m.id === att.memberId);
    const row = `<tr>
      <td>${att.memberId}</td>
      <td>${member ? member.name : 'Unknown'}</td>
      <td>${att.timeIn}</td><td>${att.timeOut}</td><td>${att.date}</td>
    </tr>`;
    list.innerHTML += row;
  });
}

// Manage Classes - Load checklist
if (document.getElementById('memberChecklist')) {
  const checklist = document.getElementById('memberChecklist');
  const members = JSON.parse(localStorage.getItem('members')) || [];

  members.forEach(member => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${member.id}"> ${member.name}`;
    checklist.appendChild(label);
  });
}

// Save Class Attendance
document.getElementById('classForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedMembers = Array.from(document.querySelectorAll('#memberChecklist input:checked')).map(input => parseInt(input.value));
  const classDate = document.getElementById('classDate').value;
  let classAttendance = JSON.parse(localStorage.getItem('classAttendance')) || [];

  selectedMembers.forEach(id => {
    classAttendance.push({
      memberId: id,
      date: classDate
    });
  });

  localStorage.setItem('classAttendance', JSON.stringify(classAttendance));
  alert("Class attendance recorded!");
  window.location.reload();
});

// Display Class Attendance
if (document.getElementById('classAttendanceList')) {
  const classAttendance = JSON.parse(localStorage.getItem('classAttendance')) || [];
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const list = document.getElementById('classAttendanceList');

  classAttendance.forEach(entry => {
    const member = members.find(m => m.id === entry.memberId);
    const row = `<tr>
      <td>${entry.memberId}</td>
      <td>${member ? member.name : 'Unknown'}</td>
      <td>${entry.date}</td>
    </tr>`;
    list.innerHTML += row;
  });
}

// Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
if (toggle) {
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
}
