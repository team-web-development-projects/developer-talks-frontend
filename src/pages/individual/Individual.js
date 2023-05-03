// import { Component } from 'react';
import Left from 'components/left/Left';
import './Individual.scss';
import { useState, useEffect } from 'react';

const Main = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const liList = JSON.parse(localStorage.getItem('liList')) || [];
    setNotes(liList);
  }, []);

  useEffect(() => {
    localStorage.setItem('liList', JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    const input = document.querySelector('input');
    const value = input.value.trim();
    if (value) {
      setNotes((prevNotes) => [...prevNotes, value]);
      input.value = '';
    }
  }

  function removeNote(index) {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes.splice(index, 1);
      return newNotes;
    });
  }

  function clearNotes() {
    setNotes([]);
    localStorage.removeItem('liList');
  }

  const handleScroll = () => {
    const mainText = document.querySelector('h2');
    const value = window.scrollY;
    if (value > 300) {
      mainText.style.animation = 'disapper 1s ease-out';
    } else {
      mainText.style.animation = 'side 1s ease-out';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <main>
        <div className="section">
          <Left />
          <section className="notes">
            <h2>개인노트 페이지</h2>
            <form>
              <input type="text" placeholder="글을 적어주세여" />
              <button onClick={addNote}>입력</button>
            </form>
            <ul className="note">
              {notes.map((note, index) => (
                <li key={index}>
                  {note}
                  <p onClick={() => removeNote(index)}>❌</p>
                </li>
              ))}
            </ul>
            <button onClick={clearNotes}>전체 삭제</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Main;