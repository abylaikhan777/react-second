import { useReducer, useState } from "react";

const init = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload.title,
            description: action.payload.description,
            date: action.payload.date,
            priority: action.payload.priority,
            completed: false,
          },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "medium",
  });

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      dispatch({ type: "ADD_TODO", payload: formData });
      setFormData({
        title: "",
        description: "",
        date: "",
        priority: "medium",
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (id) => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        updates: editData,
      },
    });
    setEditId(null);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditData({
      title: todo.title,
      description: todo.description,
      date: todo.date,
      priority: todo.priority,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginLeft: "600px" }}>
    

        <div>
          <label>marka:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>age:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>probeg</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>sostoıanıe:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Add Todo</button>
      </form>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by marka"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px", borderRadius: "5px" }}
        />
      </div>

      <ul>
        {state.todos
          .filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <li
              key={todo.id}
              style={{ listStyleType: "none", margin: "10px 0" }}
            >
              {editId === todo.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />
                  <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button onClick={() => handleEditSubmit(todo.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div
                  style={{
                    width: "200px",
                    paddingLeft: "50px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    border: "1px",
                  }}
                >
                  <h2>your car:</h2>
                  <p>ㅤmarka: {todo.title}</p>
                  <p>ㅤage: {todo.description}</p>
                  <p>ㅤDate: {todo.date}</p>
                  <p>ㅤPriority: {todo.priority}</p>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TODO", payload: todo.id })
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
