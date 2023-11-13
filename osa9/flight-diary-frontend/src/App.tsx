import { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries, createDiary } from './services/diarys';

function App() {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    })
      .then((data) => {
        if (data) {
          setDiaries(diaries.concat(data));
          setDate('');
          setVisibility('');
          setWeather('');
          setComment('');
        }
      })
      .catch((error) => setErrorMessage('Error: ' + error.message));
  };

  return (
    <div>
      <h4>Add new entry</h4>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <form onSubmit={diaryCreation}>
        <div>
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset>
          <legend>Select visibility</legend>
          <div>
            Visibility
            <input
              type="radio"
              id="visibilityChoice1"
              value="great"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="visibilityChoice1">great</label>
            <input
              type="radio"
              id="weatherChoice2"
              value="good"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="visibilityChoice2">good</label>
            <input
              type="radio"
              id="visibilityChoice3"
              value="ok"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="visibilityChoice3">ok</label>
            <input
              type="radio"
              id="visibilityChoice4"
              value="poor"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="visibilityChoice4">poor</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Select weather</legend>
          <div>
            Weather
            <input
              type="radio"
              id="weatherChoice1"
              value="sunny"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="weatherChoice1">sunny</label>
            <input
              type="radio"
              id="weatherChoice2"
              value="rainy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="weatherChoice2">sunny</label>
            <input
              type="radio"
              id="weatherChoice3"
              value="cloudy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="weatherChoice3">cloudy</label>
            <input
              type="radio"
              id="weatherChoice4"
              value="stormy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="weatherChoice4">stormy</label>
            <input
              type="radio"
              id="weatherChoice5"
              value="windy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="weatherChoice5">windy</label>
          </div>
        </fieldset>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      <ul>
        {diaries.map((note) => (
          <li key={note.id}>
            <h4> {note.date}</h4>
            <p>{note.visibility}</p>
            <p>{note.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
