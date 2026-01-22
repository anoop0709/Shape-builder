import { useEffect, useMemo, useState } from 'react';

export default function ShapeBuilder({ arrayInput, setShowSnackbar }) {
  const [isValid, setIsValid] = useState(true);

  // Validate input and parse array
  const arrayInputParsed = useMemo(() => {
    try {
      if (!arrayInput || !arrayInput.startsWith('[')) {
        setIsValid(false);
        return null;
      }

      const parsed = JSON.parse(arrayInput);
      const isValid2dArray =
        Array.isArray(parsed) &&
        parsed.every(
          (row) =>
            Array.isArray(row) && row.every((cell) => cell === 0 || cell === 1)
        );

      if (!isValid2dArray) {
        setIsValid(false);
        return null;
      }

      setIsValid(true);
      return parsed;
    } catch (error) {
      setIsValid(false);
      return null;
    }
  }, [arrayInput]);

  // Show snackbar when validation fails
  useEffect(() => {
    if (!isValid) {
      setShowSnackbar(true);
    }
  }, [isValid, setShowSnackbar]);

  if (!isValid || !arrayInputParsed) {
    return null;
  }

  const [divsClicked, setDivsClicked] = useState(new Set());
  const [unloading, setUnloading] = useState(false);

  const flatternArray = useMemo(
    () => arrayInputParsed.flat(Infinity),
    [arrayInputParsed]
  );

  const numberOfDivs = useMemo(
    () => flatternArray.reduce((acc, val) => (acc += val), 0),
    [flatternArray]
  );

  const unLoad = () => {
    setUnloading(true);
    const keys = Array.from(divsClicked.keys());
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();
        setDivsClicked((prev) => {
          const updated = new Set(prev);
          updated.delete(currentKey);
          return updated;
        });
        setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
      }
    };
    setTimeout(removeNextKey, 100);
  };

  const handleClick = (e) => {
    const { target } = e;
    const index = Number(target.getAttribute('data-index'));
    if (isNaN(index) || index === null || unloading || divsClicked.has(index))
      return;
    if (flatternArray[index] === 1) {
      setDivsClicked((prev) => new Set(prev).add(index));
    }
  };

  useEffect(() => {
    if (divsClicked.size === numberOfDivs && numberOfDivs > 0) {
      unLoad();
    }
  }, [divsClicked, numberOfDivs]);

  return (
    <>
      <p>
        please click on each box (select random boxes) and will remove the
        selection by the clicking order
      </p>
      <div className="shape-container" onClick={handleClick}>
        {flatternArray.map((value, index) => (
          <div
            key={index}
            className="shape-item-div"
            data-index={index}
            style={{
              cursor: value === 1 ? 'pointer' : 'not-allowed',
              opacity: value,
              backgroundColor: divsClicked.has(index) ? 'green' : 'white',
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
