function DataFilter(arr, filter) {
    var filteredItems = [];
    if (filter){
      arr.forEach((purpose) => {
        if (filter.includes(purpose.id)) {
          filteredItems.push(purpose);
        }
      });
    }

    return filteredItems;
}

export default DataFilter