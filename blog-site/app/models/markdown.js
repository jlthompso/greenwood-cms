/*
|--------------------------------------|-----------------------------------------------------------------|
| Markdown                             | JSX                                                             |
|--------------------------------------|-----------------------------------------------------------------|
| # Heading level 1                    | <Typography variant="h1">Heading level 1</Typography>           |
| ## Heading level 2                   | <Typography variant="h2">Heading level 2</Typography>           |
| ### Heading level 3                  | <Typography variant="h3">Heading level 3</Typography>           |
| *bold text*                          | <Typography sx={{fontWeight: 'bold'}}>bold text</Typography>    |
| /italic text/                        | <Typography sx={{fontStyle: 'italic'}}>italic text</Typography> |
| Unorderered list with "-"            | <List sx={{ listStyleType: disc', pl: 4 }}>                     |
|  - First item                        |   <ListItem sx={{ display: 'list-item' }}>                      |
|  - Second item                       |     <ListItem><ListItemText primary="First item" />             |
|                                      |   </ListItem>                                                   |
|                                      |   <ListItem sx={{ display: 'list-item' }}>                      |
|                                      |     <ListItem><ListItemText primary="First item" />             |
|                                      |   </ListItem>                                                   |
|                                      | </List>                                                         |                    
| Link [Guide](https://www.google.com) | <Link href="https://www.google.com">Guide</Link>                |
| \r, \n, \r\n (newline)               | <br>                                                            |
|--------------------------------------------------------------------------------------------------------|
*/

import { createElement, ReactElement } from "react";
import { Typography } from "../components/material";

class Node {
  children = [];

  get openingTag() {
    return '<div>';
  }

  get closingTag() {
    return '</div>';
  }

  addChild(node) {
    this.children.push(node);
  }

  element(children) {
    return createElement('div', null, children)
  }
}

class TextStyle extends Node {
  #headingLevel;
  #bold;
  #italic;
  
  constructor(style) {
    super();
    this.#headingLevel = style.headingLevel;
    this.#bold = style.bold;
    this.#italic = style.italic;
  }

  get openingTag() {
    const variant = this.#headingLevel ? `h${this.#headingLevel}` : 'body1';
    const fontWeight = this.#bold ? 'bold' : 'normal';
    const fontStyle = this.#italic ? 'italic' : 'normal';
    return `<Typography variant="${variant}" sx={{fontWeight: "${fontWeight}", fontStyle: "${fontStyle}"}>`;
  }

  get closingTag() {
    return '</Typography>';
  }

  element(children) {
    const variant = this.#headingLevel ? `h${this.#headingLevel}` : 'body1';
    const fontWeight = this.#bold ? 'bold' : 'normal';
    const fontStyle = this.#italic ? 'italic' : 'normal';
    return createElement(Typography, { variant, fontWeight, fontStyle }, children);
  }
}

function generateNode(input) {
  switch (input) {
    case '#':
      return new TextStyle({ headingLevel: 1 });
    case '##':
      return new TextStyle({ headingLevel: 2 });
    case '###':
      return new TextStyle({ headingLevel: 3 });
    case '*':
      return new TextStyle({ bold: true });
    case '/':
      return new TextStyle({ italic: true });
    default:
      // raw text
      return input;
  }
}

function parseText(input, root) {
  if (!root) {
    root = new Node();
    input = input.replace(/\r?\n/g, ' <br> ');
    input = input.split(/\s/);
    console.log(input);
  }

  while (input.length) {
    const child = generateNode(input.shift());
    if (child instanceof Node) {
      root.addChild(parseText(input, child));
    } else {
      root.addChild(child);
    }
  }
  
  return root;
}

function generateJSX(root, visitedNodes) {
  if (!visitedNodes) {
    visitedNodes = [];
  }

  let output = root.openingTag;

  visitedNodes.push(root);
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!visitedNodes.includes(child)) {
      if (child instanceof Node) {
        output += generateJSX(child, visitedNodes);
      } else {
        // join all consecutive non-token children with spaces
        if (i && !(children[i - 1] instanceof Node)) {
          output += ' ' + child;
        } else {
          output += child;
        }
      }
    }
  }

  output += root.closingTag;

  return output;
}

function generateReactObjects(root, visitedNodes) {
  if (!visitedNodes) {
    visitedNodes = [];
  }

  const childElements = [];

  visitedNodes.push(root);
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (!visitedNodes.includes(child)) {
      if (child instanceof Node) {
        childElements.push(generateReactObjects(child, visitedNodes));
      } else if (child === '<br>') {
        childElements.push(createElement('br'));
      } else {
        let text = '';
        while (i < children.length && !(children[i + 1] instanceof Node) && children[i + 1] !== '<br>') {
          text += text.length ? ' ' + child : child;
          child = children[++i];
        }
        childElements.push(text);
      }
    }
  }

  return root.element(childElements);
}

export default function convertMarkdownToJSX(input) {
  return generateReactObjects(parseText(input));
}
