export function sortByLineNumber( a, b ) {
  if ( a.line_number < b.line_number ){
    return -1;
  }
  if ( a.line_number > b.line_number ){
    return 1;
  }
  return 0;
}