import React, { useState } from 'react';
import '../App.css';

const MembersPage = () => {
  const [members, setMembers] = useState([
    { name: "Alice", age: 24, role: "Knight", tasks: "None" },
  ]);

  const addMember = () => {
    const name = prompt("Enter the member's name:");
    const age = prompt("Enter the member's age:");
    const role = prompt("Enter the member's role:");
    const tasks = prompt("Enter the member's tasks:");
    if (name && age && role && tasks) {
      setMembers([...members, { name, age, role, tasks }]);
    }
  };

  return (
    <div className="members-page">
      <h1>Members Page</h1>
      <p>This is the members page of the Guild Management AI application.</p>
      <button className="cool_button" style={{ marginBottom: "10px" }} onClick={addMember}>Add Member +</button>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.role}</td>
              <td>{member.tasks}</td>
              <td><button>manage</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersPage;