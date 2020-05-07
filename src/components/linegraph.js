import React, { useEffect, useRef } from 'react';

import * as d3 from 'd3';

const LineGraph = props => {
	const d3Container = useRef(null);

	const width = 900;
	const height = 700;

	const duration = 500;

	useEffect(() => {
		if (props.data && d3Container.current) {
			const { data } = props;
			const margins = {
				t: 100,
				b: 200,
				l: 75,
				r: 50,
			};

			const plotwidth = width - margins.l - margins.r;
			const plotheight = height - margins.t - margins.b;

			const svg = d3.select(d3Container.current);
			const colorscale = d3.schemeCategory10;
			const xScale = d3
				.scaleLinear()
				.domain([0, Math.max(data[0].length, data[1].length, data[2].length)])
				.range([0, plotwidth]);

			const maxY = () => {
				if (data[0].length > 0) {
					return Math.max(data[0][0].temp * 1.1, data[1][0].temp * 1.1, data[2][0].temp * 1.1);
				} else {
					return 200;
				}
			};
			const yScale = d3
				.scaleLinear()
				.domain([0, maxY()])
				.range([plotheight, 0]);

			console.log(xScale.domain());
			console.log(yScale.domain());
			console.log(data);

			const line = d3
				.line()
				.x(d => xScale(d.minute))
				.y(d => yScale(d.temp));
			// .curve(d3.curveMonotoneX);

			const plotg = svg
				.selectAll('.plotg')
				.data([0])
				.join('g')
				.attr('class', 'plotg')
				.attr('transform', `translate(${margins.l}, ${margins.t})`);

			svg.selectAll('.xaxisg')
				.data([0])
				.join('g')
				.attr('class', 'xaxisg')
				.attr('transform', `translate(${margins.l}, ${margins.t + plotheight})`)
				// .transition().duration(duration)
				.call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

			svg.selectAll('.yaxisg')
				.data([0])
				.join('g')
				.attr('class', 'yaxisg')
				.attr('transform', `translate(${margins.l}, ${margins.t})`)
				// .transition().duration(duration)
				.call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

			let linepath = plotg.selectAll('path').data(data);
			linepath
				.attr('class', (d, i) => `datapath path-${i}`)
				// .transition().duration(duration)
				.attr('d', line);

			linepath
				.enter()
				.append('path')
				.attr('d', line)
				.style('fill', 'none')
				.style('stroke', (d, i) => colorscale[i])
				.style('stroke-width', (d, i) => (i == 0 ? '3px' : '1px'));

			linepath.exit().remove();

			let legendarray = [
				{ name: 'Your Assembly', color: colorscale[0] },
				{ name: 'Cardboard Cup', color: colorscale[1] },
				{ name: 'Styrofoam Cup', color: colorscale[2] },
			];

			let legend = svg
				.selectAll('.glegend')
				.data([0])
				.join('g')
				.attr('class', 'glegend');
			legend.attr('transform', `translate(${-50 + plotwidth / 2},${margins.t + plotheight + 40})`);
			legend
				.selectAll('rect')
				.data(legendarray)
				.join('rect')
				.attr('width', 20)
				.attr('height', 20)
				.attr('x', (d, i) => 20)
				.attr('y', (d, i) => (i + 1) * 30)
				.attr('fill', d => d.color);

			legend
				.selectAll('text')
				.data(legendarray)
				.join('text')
				// .attr('width', 20)
				// .attr('height', 20)
				.attr('x', (d, i) => 50)
				.attr('y', (d, i) => (i + 1) * 30 + 15)
				.text(d => d.name);

			svg.selectAll('.titletext')
				.data([0])
				.join('text')
				.attr('class', 'titletext')
				.attr('x', margins.l + plotwidth / 2 - 100)
				.attr('y', margins.t - 40)
				.text('Temperature Drop Over Time');

			svg.selectAll('.xaxis-title')
				.data([0])
				.join('text')
				.attr('class', 'xaxis-title axis-title')
				.attr('x', margins.l + plotwidth / 2 - 60)
				.attr('y', margins.t + plotheight + 40)
				.text('Time (Minutes)')
				.style('font-size', '12px')

			svg.selectAll('.yaxis-title')
				.data([0])
				.join('text')
				.attr('class', 'yaxis-title axis-title')
				.attr('transform','rotate(-90)')
				.attr('y', margins.l - 40)
				.attr('x', margins.t - plotheight - 60)
				.text('Temperature (deg F)')
				.style('font-size', '12px')

		}	
	}, [props.data, d3Container.current]);

	return <svg height={height} width={width} ref={d3Container} />;
};

export { LineGraph };
