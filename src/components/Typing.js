import React, { useState, useEffect } from 'react';

function Typing(props) {
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(props.text);
  const [index, setIndex] = useState(0);
  const typingSpeed = 100; // Adjust this value to change the typing speed

  useEffect(() => {
    if (index < fullText.length) {
        setTimeout(() => {
          setText(text + fullText[index])
          setIndex(index + 1)
        }, 40)
      }
    }, [index])
    
  return <div>{text}</div>;
}

export default Typing;