import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as d4 from 'd3-sankey';

const produceSankey = ({ nodes, links }, width, height) => {
  const sankey = d4
    .sankey()
    .nodeId((d) => d.name)
    //.nodeAlign(d3[`sankeyJustify`])
    .nodeWidth(15)
    .nodePadding(10)
    .extent([
      [1, 5],
      [width - 1, height - 5],
    ]);
  return sankey({
    nodes: nodes.map((d) => Object.assign({}, d)),
    links: links.map((d) => Object.assign({}, d)),
  });
};

const colord3 = d3.scaleOrdinal(d3.schemeCategory10);

const color = (d) => colord3(d.category === undefined ? d.name : d.category);

const Diagram = (props) => {
  const svgRef = useRef(null);
  const edgeColor = 'path';
  const [highlightedInput, setHighlightedInput] = useState();
  const [highlightedOutput, setHighlightedOutput] = useState();
  const [count, setCount] = useState(0);
  const width = props.width;
  const height = props.height;
  const data = props.data;

  useEffect(() => {
    if (!svgRef) return;

    const { nodes, links } = produceSankey(data, width, height);
    // console.log(
    //   `highlightedInput: ${highlightedInput} \t highlightedOutput: ${highlightedOutput}`
    // );

    const format = (d) => {
      const format = d3.format(',.0f');
      return data.units ? `${format(d)} ${data.units}` : format;
    };

    const svgEl = d3.select(svgRef.current);
    svgRef.current.innerHTML = '';

    svgEl
      .append('g')
      .attr('stroke', '#000')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('fill', color)
      .attr('opacity', (d) =>
        // Opacity depends on input/output
        highlightedOutput && highlightedInput
          ? highlightedOutput == d.name && highlightedInput == d.category
            ? 1
            : 0.3
          : highlightedOutput
          ? highlightedOutput == d.name
            ? 1
            : 0.3
          : highlightedInput
          ? highlightedInput == d.category
            ? 1
            : 0.3
          : 1
      )
      // On mouseover of category rect, highlight group
      .on('mouseover', function (el, d) {
        // If rect has no sourceLinks, it is the "final" rect
        if (d.sourceLinks.length == 0) {
          // If final rect, we want to highlight all sources to the final rect
          // set(viewof highlightedInput, null);
          // set(viewof highlightedOutput, d.name);
          setHighlightedInput(null);
          setHighlightedOutput(d.name);
        } else {
          // Otherwise, we want to highlight all targets
          // set(viewof highlightedInput, d.category);
          // set(viewof highlightedOutput, null);
          setHighlightedInput(d.category);
          setHighlightedOutput(null);
        }
      })
      .on('mouseout', function (el, d) {
        // On mouseout, unhighight all
        setHighlightedInput(null);
        setHighlightedOutput(null);
      })
      .append('title')
      .text((d) => `${d.name}\n${format(d.value)}`);

    const link = svgEl
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.5)
      .selectAll('g')
      .data(links)
      .join('g')
      .style('mix-blend-mode', 'multiply');

    if (edgeColor === 'path') {
      const gradient = link
        .append('linearGradient')
        .attr('id', (d) => {
          d.uid = 'link' + Math.random().toString(16).slice(2);
          return d.uid;
        })
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', (d) => d.source.x1)
        .attr('x2', (d) => d.target.x0);

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', (d) => color(d.source));

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', (d) => color(d.target));
    }

    link
      .append('path')
      .attr('d', d4.sankeyLinkHorizontal())
      // .attr('stroke', (d) =>
      //   edgeColor === 'none'
      //     ? '#aaa'
      //     : edgeColor === 'path'
      //     ? d.uid
      //     : edgeColor === 'input'
      //     ? color(d.source)
      //     : color(d.target)
      // )
      .attr('stroke', (d) => `url(#${d.uid})`)
      // Change opacity based on highlighted
      .attr('opacity', (d) => {
        if (highlightedOutput && highlightedInput) {
          // If BOTH highlighted (via path highlight)
          // Highlight those that match source and target
          if (
            highlightedOutput == d.target.name &&
            highlightedInput == d.source.category
          ) {
            return 1;
          } else {
            return 0.3;
          }
        } else if (highlightedOutput) {
          // Otherwise, if target matches, highlight
          if (highlightedOutput == d.target.name) {
            return 1;
          } else {
            return 0.3;
          }
        } else if (highlightedInput) {
          // Otherwise, if source matches, highlight
          if (highlightedInput == d.source.category) {
            return 1;
          } else {
            return 0.3;
          }
        } else {
          return 1;
        }
      })
      .attr('stroke-width', (d) => Math.max(1, d.width))
      .on('mouseover', function (el, d) {
        // On mouseover of path, set highlights to equal source and target
        // set(viewof highlightedInput, d.source.category)
        // set(viewof highlightedOutput, d.target.name)
        setHighlightedInput(d.source.category);
        setHighlightedOutput(d.target.name);
      })
      .on('mouseout', () => {
        // On mouseout, unhighlight
        // set(viewof highlightedInput, null)
        // set(viewof highlightedOutput, null)
        setHighlightedInput(null);
        setHighlightedOutput(null);
      });

    link
      .append('title')
      .text((d) => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

    svgEl
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('pointer-events', 'none') // Remove pointer events so path hovers work
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr('y', (d) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end'))
      .text((d) => d.name);
  }, [svgRef, highlightedInput, highlightedOutput, props.data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default Diagram;
