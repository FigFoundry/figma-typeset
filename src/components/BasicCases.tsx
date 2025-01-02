import React from 'react';

interface BasicCasesProps {
  text: string;
  setText: (text: string) => void;
}

const BasicCases: React.FC<BasicCasesProps> = ({ text, setText }) => {
  const basicCaseConverters = {
    title: (text: string) => {
      const lowercaseWords = new Set([
        'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for',
        'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'as',
        'yet', 'so',
      ]);

      return text
        .split('\n')
        .map((paragraph) =>
          paragraph
            .split(/([.!?]\s+)/)
            .map((sentence, index, sentencesArray) => {
              if (index % 2 === 0) {
                return sentence
                  .split(/(\s+)/)
                  .map((word) => {
                    const leadingMatch = word.match(/^['"“‘”([{]+/);
                    const trailingMatch = word.match(/['"’”)\]}.,!?;:]+$/);
                    const leading = leadingMatch ? leadingMatch[0] : '';
                    const trailing = trailingMatch ? trailingMatch[0] : '';
                    const trimmedWord = word.slice(leading.length, trailing.length ? -trailing.length : undefined);

                    const shouldCapitalize =
                      trimmedWord.length > 0 &&
                      (leading.length > 0 || !lowercaseWords.has(trimmedWord.toLowerCase()));

                    const capitalizedWord = shouldCapitalize
                      ? trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase()
                      : trimmedWord.toLowerCase();

                    return leading + capitalizedWord + trailing;
                  })
                  .join('');
              }
              return sentence;
            })
            .join('')
        )
        .join('\n');
    },
    sentence: (text: string) => {
      return text
        .toLowerCase()
        .replace(/(^|[.!?]\s+)(['"“‘”]?)(\w)/g, (_, p1, p2, p3) => {
          return p1 + (p2 || '') + p3.toUpperCase();
        });
    },
    lower: (text: string) => text.toLowerCase(),
    upper: (text: string) => text.toUpperCase(),
    capitalized: (text: string) => {
      return text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
    },
    alternating: (text: string) => {
      return text
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join('');
    },
  };

  const handleCaseChange = (converter: keyof typeof basicCaseConverters) => {
    setText(basicCaseConverters[converter](text));
  };

  return (
    <div className="button-group">
      <button className="case-button" onClick={() => handleCaseChange('title')}>
        Title Case
      </button>
      <button className="case-button" onClick={() => handleCaseChange('sentence')}>
        Sentence case
      </button>
      <button className="case-button" onClick={() => handleCaseChange('lower')}>
        lower case
      </button>
      <button className="case-button" onClick={() => handleCaseChange('upper')}>
        UPPER CASE
      </button>
      <button className="case-button" onClick={() => handleCaseChange('capitalized')}>
        Capitalized Case
      </button>
      <button className="case-button" onClick={() => handleCaseChange('alternating')}>
        aLtErNaTiNg cAsE
      </button>
    </div>
  );
};

export default BasicCases;