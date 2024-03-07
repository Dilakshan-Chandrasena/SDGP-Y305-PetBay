import React from "react";

const OptionsList = ({ question, optionRefs, handleOptionClick }) => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, idx) => {
        const optionId = idx + 1;
        const optionKey = `option${optionId}`;
        return (
          <li
            ref={(el) => (optionRefs.current[idx] = el)}
            key={optionId}
            onClick={(e) => handleOptionClick(e, optionId)}
          >
            {question[optionKey]}
          </li>
        );
      })}
    </ul>
  );
};

export default OptionsList;
