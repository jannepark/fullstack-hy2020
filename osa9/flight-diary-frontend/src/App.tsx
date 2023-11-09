import { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries, createDiary } from './services/diarys';

function App() {
  // const [newDiary, setNewDiary] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const [diaries, setDiaries] = useState<Diary[]>([]);

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
    }).then((data) => {
      if (data) {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      }
    });
  };

  return (
    <div>
      <h4>Add new entry</h4>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
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
