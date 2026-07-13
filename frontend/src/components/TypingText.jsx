import { useEffect, useState } from "react";

function TypingText({ text, speed = 10 }) {

  const [displayed, setDisplayed] = useState("");

  useEffect(() => {

    setDisplayed("");

    let index = 0;

    const interval = setInterval(() => {

      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {

        clearInterval(interval);

      }

    }, speed);

    return () => clearInterval(interval);

  }, [text, speed]);

  return (
    <pre className="whitespace-pre-wrap font-mono">
      {displayed}
    </pre>
  );
}

export default TypingText;