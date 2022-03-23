export function getCellValue(cell) {
  if (!cell) return null;

  switch (cell.type) {
    case 'number':
      return cell.number;

    case 'select':
      return cell.select.name;

    case 'formula':
      switch (cell.formula.type) {
        case 'number':
          return cell.formula.number;

        default:
          console.log(`'${cell.formula.type}' is not defined as a cell.formula.type!`);
          return '♣️♣️♣️';
      }

    case 'rollup':
      switch (cell.rollup.type) {
        case 'number':
          return cell.rollup.number;

        default:
          console.log(`'${cell.rollup.type}' is not defined as a cell.rollup.type!`);
          return '♣️♣️♣️';
      }

    case 'date':
      return `${cell.date.start} -> ${cell.date.end}`;

    case 'title':
      return cell.title[0].text.content;

    default:
      console.log(`'${cell.type}' is not defined as a cell.type!`);
      return '♣️♣️♣️';
  }
}