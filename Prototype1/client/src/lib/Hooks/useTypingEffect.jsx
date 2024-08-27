import { useState, useEffect } from "react";

function useTypingEffect(text, speed = 100) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedText((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return typedText;
}

export default useTypingEffect;
