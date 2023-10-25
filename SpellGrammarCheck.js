import React, { useState } from 'react';
import axios from 'axios';

const TextGearsChecker = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleCheck = async () => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/grammar',
        `text=${inputText}`,
        {
          params: {
            key: 'u7LwMpX4u1xA7f3n',
          },
        }
      );
      console.log(response);

      if (response.data.errors) {
        const misspelledWords = response.data.errors;
        const suggestedWords = misspelledWords.map((error) => error.better.join(', '));
        setSuggestions(suggestedWords);
      } else {
        setSuggestions(['No suggestions found.']);
      }
    } catch (error) {
      console.error('Error checking text:', error);
      setSuggestions(['Error occurred while checking text.']);
    }
  };

  return (
    <div>
      <h1>TextGears Spell and Grammar Checker</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button onClick={handleCheck}>Check</button>
      <div>
        {suggestions.length > 0 && (
          <div>
            <h2>Suggestions:</h2>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextGearsChecker;
