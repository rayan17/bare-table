
export default function generateColumns(size) {
  let columns = [];

  for (let i = 0 ; i < size ; i++ ) {
    columns.push( { 
      label: 'Label' + i,
      name: 'label'  + i
    });
  }
  return columns;
}