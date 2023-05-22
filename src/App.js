import "./App.css";
import ToDo from "./components/todoList/todo";

const initialTodos = [
    { id: 0, title: "Buy milk", done: true },
    { id: 1, title: "Eat tacos", done: false },
    { id: 2, title: "Brew tea", done: false },
];

function App() {
    return (
        <>
            <ToDo initialTodos={initialTodos} />
        </>
    );
}

export default App;
