import { useState } from 'react';
import './App.css';
import ShapeBuilder from './ShapeBuilder';
import { Snackbar, SnackbarContent } from '@mui/material';

export default function App() {
  const [arrayInput, setArrayInput] = useState('');
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
          message="please enter a valid 2D array!"
          ContentProps={{ sx: { backgroundColor: 'red', color: 'white' } }}
        />
      )}
      <h1>Welcome to Shape Builder</h1>
      <p>Start building your shapes!</p>
      <div className="input-container">
        <form className="inputForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your 2d array"
            defaultValue={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
            }}
          />

          <button type="submit">Build Shape</button>
          <button
            type="reset"
            onClick={() => {
              setShowShape(false);
              setArrayInput('');
            }}
          >
            Clear Shape
          </button>
        </form>
      </div>
      {!showShape && (
        <>
          <p>
            example: Enter an array with 1 and 0 like this [ [0, 1, 0], [1, 1,
            1], [0, 1, 0] ]
          </p>
          <p>
            To see the above example shape, click "Build Shape" or Enter a new
            2D Array with "1" and "0"
          </p>
        </>
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
