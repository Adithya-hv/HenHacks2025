import React, { useState, useEffect } from "react";
import { getResources, updateResource } from "./api_service";
import "../App.css";

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getResources();
        setMembers(
          membersData.length
            ? membersData
            : [{ name: "Alice", age: 24, role: "Knight", tasks: "None" }]
        );
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers([{ name: "Alice", age: 24, role: "Knight", tasks: "None" }]);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const addDefaultMember = async () => {
      try {
        await updateResource(1, {
          name: "Alice",
          age: 24,
          role: "Knight",
          tasks: "None",
        });
      } catch (error) {
        console.error("Error adding default member:", error);
      }
    };

    addDefaultMember();
  }, []);

  const addMember = async () => {
    const name = prompt("Enter the member's name:");
    const age = prompt("Enter the member's age:");
    const role = prompt("Enter the member's role:");
    const tasks = prompt("Enter the member's tasks:");
    if (name && age && role && tasks) {
      const newMember = { name, age, role, tasks };
      setMembers([...members, newMember]);
      try {
        await updateResource(members.length + 1, newMember);
      } catch (error) {
        console.error("Error adding member:", error);
      }
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="members-page">
      <h1>Members Page</h1>
      <p>This is the members page of the Guild Management AI application.</p>
      <button
        className="add_member"
        style={{ marginBottom: "10px" }}
        onClick={addMember}
      >
        Add Member +
      </button>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>Tasks</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.role}</td>
              <td>{member.tasks}</td>
              <td>
                <button
                  className="x_button"
                  onClick={() => removeMember(index)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersPage;
