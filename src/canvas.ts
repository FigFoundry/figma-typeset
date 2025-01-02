type TextStats = {
  characters: number;
  words: number;
  lines: number;
};

type MessageType = {
  type: string;
  text?: string;
  converter?: string;
  formatter?: string;
  cleaner?: string;
};

figma.showUI(__html__, {
  width: 320,
  height: 488,
  themeColors: true
});

function getTextNodesInSelection(): TextNode[] {
  const textNodes: TextNode[] = [];

  function traverse(node: BaseNode) {
    if (node.type === 'TEXT') {
      textNodes.push(node);
    } else if ('children' in node) {
      const parent = node as ChildrenMixin;
      parent.children.forEach(child => traverse(child));
    }
  }

  figma.currentPage.selection.forEach(node => traverse(node));
  return textNodes;
}

function calculateTextStats(text: string): TextStats {
  return {
    characters: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    lines: text.split('\n').length,
  };
}

const basicCaseConverters = {
  title: (text: string) => {
    const lowercaseWords = new Set([
      'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for',
      'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'as',
      'yet', 'so',
    ]);

    return text
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0 || !lowercaseWords.has(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  },
  sentence: (text: string) => {
    return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
  },
  lower: (text: string) => text.toLowerCase(),
  upper: (text: string) => text.toUpperCase(),
  capitalized: (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
  },
};

const smartFormatting = {
  smartQuotes: (text: string) => {
    return text
      .replace(/(^|[-\u2014\s(\["])'/g, "$1'")
      .replace(/'/g, "'")
      .replace(/(^|[-\u2014/\[(\s])"/g, '$1"')
      .replace(/"/g, '"');
  },
  dashes: (text: string) => {
    return text
      .replace(/--/g, '–')
      .replace(/\s+-\s+/g, ' – ')
      .replace(/---/g, '—');
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

const cleanupTools = {
  removeExtraSpaces: (text: string) => text.replace(/\s+/g, ' ').trim(),
  removeLineBreaks: (text: string) => text.replace(/\n+/g, ' '),
  fixPunctuation: (text: string) => {
    return text
      .replace(/\s+([.,!?:;])/g, '$1')
      .replace(/([.,!?:;])\s*/g, '$1 ')
      .trim();
  },
  normalizeQuotes: (text: string) => {
    return text
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'");
  },
};

figma.ui.onmessage = async (msg: MessageType) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
    return;
  }

  const textNodes = getTextNodesInSelection();
  if (textNodes.length === 0) {
    figma.notify('Please select at least one text layer');
    return;
  }

  await Promise.all(
    textNodes.map(node => figma.loadFontAsync(node.fontName as FontName))
  );

  textNodes.forEach(node => {
    let newText = node.characters;

    if (msg.type === 'case-convert' && msg.converter) {
      if (msg.converter in basicCaseConverters) {
        newText = basicCaseConverters[msg.converter as keyof typeof basicCaseConverters](newText);
      }
    }

    else if (msg.type === 'smart-format' && msg.formatter) {
      newText = smartFormatting[msg.formatter as keyof typeof smartFormatting](newText);
    }

    else if (msg.type === 'cleanup' && msg.cleaner) {
      newText = cleanupTools[msg.cleaner as keyof typeof cleanupTools](newText);
    }

    node.characters = newText;

    const stats = calculateTextStats(newText);
    figma.ui.postMessage({
      type: 'stats-update',
      stats: stats,
    });
  });

  figma.notify(`Updated ${textNodes.length} text layer${textNodes.length > 1 ? 's' : ''}`);
};