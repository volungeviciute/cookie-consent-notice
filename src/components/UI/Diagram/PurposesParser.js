import Data from '../../../data.json';

// parses the purposes array, mapes them to categories
// and produces a d3-sankey diagram compliant data structure
const ParsePurposes = (purposeIds) => {
  const categories = Data.categories.filter((x) =>
    x.purposes.some((p) => purposeIds.includes(p))
  );

  const purposes = Data.purposes.filter((x) => purposeIds.includes(x.id));

  const dataTypes = new Set();
  purposes.forEach((p) => {
    p.data.forEach((d) => {
      dataTypes.add(d);
    });
  });

  let links = [];
  for (const p of purposes) {
    for (const c of categories) {
      if (c.purposes.includes(p.id)) {
        for (const d of p.data) {
          links.push({
            source: d,
            target: c.title,
            value: 1,
          });
        }
      }
    }
  }

  return {
    nodes: Array.from(dataTypes)
      .map((x) => ({
        name: x,
        category: x,
      }))
      .concat(
        categories.map((x) => ({
          name: x.title,
          category: x.title,
        }))
      ),
    links,
    units: 'Unit',
  };
};

export default ParsePurposes;
