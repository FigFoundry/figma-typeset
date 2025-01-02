import React from 'react';

interface SmartFormattingProps {
  text: string;
  setText: (text: string) => void;
}

const SmartFormatting: React.FC<SmartFormattingProps> = ({ text, setText }) => {
  const smartFormatting = {
    smartQuotes: (text: string) => {
      return text.replace(/[‘“].*?[’”]/g, (match) => {
        const startsWithSingle = match.startsWith('‘');
        const startsWithDouble = match.startsWith('“');

        if (startsWithSingle) {
          return match.replace(/[’”]/g, '’');
        } else if (startsWithDouble) {
          return match.replace(/[’”]/g, '”');
        }
        return match;
      });
    },
    dashes: (text: string) => {
      return text
        .replace(/---/g, '—')
        .replace(/--/g, '—')
        .replace(/\s+-\s+/g, ' — ');
    },
    ellipsis: (text: string) => {
      return text.replace(/\.{3,}/g, '…');
    },
    numbers: (text: string) => {
      return text
        .replace(/(\d+)(st|nd|rd|th)/g, '$1$2')
        .replace(/(\d+)\/(\d+)/g, (_, num, den) => {
          const fraction = new Map([
            ['1/4', '¼'], ['1/2', '½'], ['3/4', '¾'],
            ['1/3', '⅓'], ['2/3', '⅔'], ['1/8', '⅛'],
            ['3/8', '⅜'], ['5/8', '⅝'], ['7/8', '⅞'],
          ]);
          const key = `${num}/${den}`;
          return fraction.has(key) ? fraction.get(key)! : key;
        });
    },
  };

  const handleSmartFormat = (formatter: keyof typeof smartFormatting) => {
    setText(smartFormatting[formatter](text));
  };

  return (
    <div className="button-group">
      <button className="case-button" onClick={() => handleSmartFormat('smartQuotes')}>
        Smart Quotes
      </button>
      <button className="case-button" onClick={() => handleSmartFormat('dashes')}>
        Format Dashes
      </button>
      <button className="case-button" onClick={() => handleSmartFormat('ellipsis')}>
        Fix Ellipsis
      </button>
      <button className="case-button" onClick={() => handleSmartFormat('numbers')}>
        Format Numbers
      </button>
    </div>
  );
};

export default SmartFormatting;