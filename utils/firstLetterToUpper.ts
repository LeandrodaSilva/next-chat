export default function firstLetterToUpper(text: string) {
  const firstLetter = 0;
  const restOfString = 1;

  return text.charAt(firstLetter).toUpperCase() + text.slice(restOfString);
}
