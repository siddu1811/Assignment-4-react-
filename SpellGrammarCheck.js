import React, { useState } from 'react';
import axios from 'axios';
import './TextGearsChecker.css';

const TextGearsChecker = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedErrorIndex] = useState(null);
  const [selectedSuggestionIndex] = useState(null);

  const handleCheck = async () => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/grammar',
        `text=${inputText}`,
        {
          params: {
            language: 'en-GB',
            key: 'uA6hWUQ9eJmzN7L8',
          },
        }
      );
      const errors = response.data.response.errors;
      setSuggestions(errors);
    } catch (error) {
      console.error('Error checking text:', error);
      setSuggestions([{ error: 'Error occurred while checking text.', better: [] }]);
    }
  };

  const handleSuggestionClick =(index, suggestion) => {
    const updatedText = inputText.split(' ');
    updatedText[index] = suggestion;
    console.log(updatedText);
    setInputText(updatedText.join(' '));
    console.log(index);
    console.log(suggestion);
    

   
  };
  return (
    <div className="textgears-checker-container">
      <h1>TextGears Spell and Grammar Checker</h1>
      <textarea
        className="text-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button className="check-button" onClick={handleCheck}>
        Check
      </button>
      <div className="suggestions-container">
        <div>
          <h2>Better Words:</h2>
          <ul>
            {suggestions.map((error, errorIndex) => (
              <li key={errorIndex}>
                <span
                  className={`error-text ${selectedErrorIndex === errorIndex ? 'selected-error' : ''}`}
                  onClick={() => handleSuggestionClick(errorIndex, null)}
                >
                  {error.error}
                </span>
                <ul>
                  {error.better.map((suggestion, suggestionIndex) => (
                    <li key={suggestionIndex}>
                      <button
                        onClick={() => handleSuggestionClick(errorIndex, suggestion)}
                        className={`suggestion-button ${selectedSuggestionIndex === suggestionIndex && selectedErrorIndex === errorIndex ? 'selected-suggestion' : ''}`}
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextGearsChecker;
