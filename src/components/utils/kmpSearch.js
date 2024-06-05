function kmpSearch(games, searchTerm) {
  const result = [];
  const searchPattern = searchTerm.toLowerCase(); 

  games.forEach((game) => {
    const title = game.description.toLowerCase(); 
    const positions = []; 

    let j = 0; 
    for (let i = 0; i < title.length; i++) {
      while (j > 0 && title[i] !== searchPattern[j]) {
        j--;
      }
      if (title[i] === searchPattern[j]) {
        j++;
        if (j === searchPattern.length) {
    
          positions.push(i - j + 1);
          j = 0; 
        }
      }
    }

    if (positions.length > 0) {
    
      result.push({ ...game, positions });
    }
  });

  return result;
}

export default kmpSearch;
