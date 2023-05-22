import { useState } from "react";
import "./todo.css";

let nextId = 3;

const App = ({ initialTodos }) => {
    const [todos, setTodos] = useState(initialTodos);

    //  Add
    const handleAdd = (title) => {
        console.log(title);
        setTodos([
            ...todos,
            {
                id: nextId++,
                title: title,
                done: false,
            },
        ]);
    };

    //  Delete
    const handleDelete = (index) => {
        setTodos(todos.filter((e) => e.id !== index));
    };

    //  Edit
    const handleEdit = (editedObject) => {
        // სეტერში ჩასმის გარეშე არ შეიცვლება.
        setTodos(
            todos.map((currentObj) => {
                if (currentObj.id === editedObject.id) {
                    return editedObject;
                } else {
                    return currentObj;
                }
            })
        );
    };

    return (
        <>
            <AddList handleAdd={handleAdd} todos={todos} />
            <Tasks
                initialTodos={todos}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </>
    );
};

const AddList = ({ handleAdd }) => {
    const [title, setTitle] = useState("");
    return (
        <>
            <div className="addDiv">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="add todos.."
                />
                <button
                    onClick={() => {
                        setTitle("");
                        title !== "" && handleAdd(title);
                    }}
                >
                    Add
                </button>
            </div>
        </>
    );
};

const Tasks = ({ initialTodos, handleDelete, handleEdit }) => {
    return (
        <>
            <ul>
                {/* ანუ todo-ები უკვე უშუალოდ ობიექტებია და eachList-ს ობიექტები
                გადაეცემა */}
                {initialTodos.map((todoObject) => (
                    <li>
                        <EachList
                            todoObject={todoObject}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

const EachList = ({ todoObject, handleDelete, handleEdit }) => {
    const [edited, setEdit] = useState(false);
    let content;

    if (edited) {
        content = (
            <>
                <input
                    type="text"
                    value={todoObject.title}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        return handleEdit({
                            ...todoObject,
                            title: e.target.value,
                        });
                    }}
                />
                <button onClick={() => setEdit(false)}>Save</button>
            </>
        );
    } else {
        content = (
            <>
                <span>{todoObject.title}</span>
                <button onClick={() => setEdit(true)}>Edit</button>
            </>
        );
    }

    return (
        <>
            <div>
                <input type="checkbox" />
                {content}
                <button onClick={() => handleDelete(todoObject.id)}>
                    Delete
                </button>
            </div>
        </>
    );
};

export default App;
