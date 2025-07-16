import './App.css';
import { ItemGrid } from './components/itemGrid';
import Add from "./assets/plus.svg";
import Bowl from "./assets/fruit-bowl.jpg";
import { addItem } from './services/items';

function App() {
  return (
    <div className="App" class="bg-gray-100 max-w-screen-lg rounded-lg m-auto">
      <nav class="bg-gray-900 border-gray-200">
        <div class="flex flex-wrap mx-auto p-4 justify-start">
          <img src={Bowl} alt="A fruit bowl." className="mr-4 h-8 rounded-md" />
          <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">Sam's Fruit Emporium</span>
        </div>
      </nav>
      <div class="flex justify-center align-center p-6">
        <ItemGrid />
      </div>
      <div class="relative right-[-95%] bottom-4 h-8 w-8 rounded-2xl overflow-clip">
        <button class="hover:stroke-blue-600" onClick={() => addItem()}>
          <img src={Add} class="shadow-md rounded-lg" alt="New fruit" />
        </button>
      </div>
    </div>
  );
}

export default App;
