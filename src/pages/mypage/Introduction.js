import Userside from 'components/userside/Userside';
import { useState } from 'react';
import './Introduction.scss';
import Button from 'components/button/Button';

const Introduction = () => {
  const [inputValue, setInputValue] = useState(
    `<p>안녕하세요</p> <p>테그를 사용하여 글을 작성하실 수 있어요</p> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />`
  );
  const [submittedValue, setSubmittedValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue('');
  };
  const handleEdit = () => {
    setInputValue(submittedValue);
  };
  return (
    <>
      <main>
        <Userside />
        <div className="notewrap">
          <div className="note">
            <p dangerouslySetInnerHTML={{ __html: submittedValue }}></p>
            <form onSubmit={handleSubmit}>
              <textarea
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter your input"
              />
              <hr />
              <Button type="submit">Submit</Button>
            </form>
            <div>
              {submittedValue && <Button onClick={handleEdit}>Edit</Button>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Introduction;
