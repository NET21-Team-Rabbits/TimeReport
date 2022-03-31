export function getCellValue(cell) {
  if (!cell) return 'N/A';

  switch (cell.type) {
    case 'number':
      return cell.number;

    case 'select':
      return cell.select.name;

    case 'date':
      if (cell.date.end) return `${cell.date.start.substring(0, 10)} -> ${cell.date.end.substring(0, 10)}`;
      return cell.date.start.substring(0, 10);

    case 'title':
      return cell.title.map(item => item.text.content);

    case 'people':
      return cell.people.map(item => item.name);

    case 'rich_text':
      return cell.rich_text.map(item => item.text.content).join();

    case 'string':
      return cell.string;

    case 'relation':
      return cell.relation.map(item => item.id).join();

    case 'array':
      return cell.array.map(item => getCellValue(item)).join(', ');

    case 'formula':
      return getCellValue(cell.formula);

    case 'rollup':
      return getCellValue(cell.rollup);

    default:
      console.log(`'getCellValue() -> ${cell.type}' is not defined as a cell.type!`);
      return '♣️';
  }
}