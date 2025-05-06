import { useState } from "react";

export default function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

                if (!id.trim() || !name.trim() || !age.trim()) {
            setError("All fields are required!");
            return;
        }

        
        if (isNaN(age)) {
            setError("Age must be a number");
            return;
        }

        
        const isDuplicate = users.some(
            (user) => 
                user.id === id.trim() ||
                user.name === name.trim() ||
                user.age === age.trim()
        );

        if (isDuplicate) {
            setError("A user with the same ID, name, or age already exists!");
            return;
        }

        setError(""); 

        const newUser = {
            id: id.trim(),
            name: name.trim(),
            age: age.trim(),
        };

        setUsers((prev) => [...prev, newUser]);

        setId("");
        setName("");
        setAge("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="id"
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                />
                <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="age"
                />

                <button>Add user</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <div>
                <h2>User List:</h2>
                {users.length === 0 ? (
                    <p>No users added yet</p>
                ) : (
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                <p>ID: {user.id}</p>
                                <p>Name: {user.name}</p>
                                <p>Age: {user.age}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}