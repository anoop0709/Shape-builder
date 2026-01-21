import { useState } from 'react';
import './App.css';
import ShapeBuilder from './ShapeBuilder';

export default function App() {
  const [arrayInput, setArrayInput] = useState('[[0,1,0],[1,1,1],[0,1,0]]');
  const [showShape, setShowShape] = useState(false);
  const normalizedInput = JSON.parse(arrayInput);
  return (
    <div className="container">
      <h1>Welcome to Shape Builder</h1>
      <p>Start building your shapes!</p>
      <div className="input-container">
        <label>2D ARRAY FOR BUILD SHAPE : </label>
        <input
          type="text"
          placeholder="Enter your 2d array"
          onChange={(e) => {
            setArrayInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setShowShape(true);
          }}
        >
          Build Shape
        </button>
      </div>
      {showShape && <ShapeBuilder arrayInput={arrayInput} />}
    </div>
  );
}
