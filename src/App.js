import { useState } from 'react';
import './App.css';
import ShapeBuilder from './ShapeBuilder';
import { Snackbar } from '@mui/material';
import { LETTERS_6X6 } from '../data';

export default function App() {
  const [arrayInput, setArrayInput] = useState(LETTERS_6X6.A);
  const [showShape, setShowShape] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowShape(true);
  };

  return (
    <div className="container">
      {showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message="Something went wrong try again!"
          ContentProps={{ sx: { backgroundColor: 'red', color: 'white' } }}
        />
      )}
      <h1>Welcome to Shape Builder</h1>
      <p>Start building your shapes and play the Game!</p>
      <div className="input-container">
        <form className="inputForm" onSubmit={handleSubmit}>
          <select
            defaultValue={Object.keys(LETTERS_6X6)[0]}
            onChange={(e) => {
              setArrayInput(LETTERS_6X6[e.target.value]);
            }}
          >
            {Object.keys(LETTERS_6X6).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <button type="submit">Build Shape</button>
          <button
            type="reset"
            onClick={() => {
              setShowShape(false);
              setArrayInput(LETTERS_6X6);
            }}
          >
            Clear Shape
          </button>
        </form>
      </div>
      {!showShape && (
        <p>
          Select a letter from the dropdown and click on "Build Shape" to start
          playing!
        </p>
      )}
      {showShape && (
        <ShapeBuilder
          arrayInput={arrayInput}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </div>
  );
}
