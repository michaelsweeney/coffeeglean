import React, { useState, useEffect } from 'react';
import d3 from 'd3';
import {LineGraph} from './linegraph'

const CompiledOutput = props => {
	let { environment, dimensions, assembly } = props;

	let { height, diameter } = dimensions;

	let { ambienttemp, coffeetemp } = environment;

	let radius_ft = diameter / 2 / 12;
	let height_ft = height / 12;
	let volume_cu_ft = Math.PI * radius_ft ** 2 * height_ft;

	let surface_area_lateral_ft = 2 * Math.PI * radius_ft * height_ft;
	let surface_area_top_ft = Math.PI * radius_ft ** 2;
	let surface_area_bottom_ft = Math.PI * radius_ft ** 2;

	let water_pound_per_cubic_foot = 62.427;

	let water_weight_pounds = water_pound_per_cubic_foot * volume_cu_ft;

	let water_specific_heat = 1; // btu / lb

	// create dummy assembly to avoid calc error
	if (Object.keys(assembly).length == 0) {
		assembly = { 1: { rperinch: 0, thickness: 0 } };
	}

	let rassembly = 0;

	Object.values(assembly).forEach(a => {
		let rperinch = a.rperinch;
		let thickness = a.thickness;

		if (!rperinch) {
			rperinch = 0;
		}
		if (!thickness) {
			thickness = 0;
		}

		rassembly += rperinch * thickness;
	});

	let uassembly = 1 / rassembly;
	// uassembly = 0.8// for debuggging
	// loop array to generate curve


	function generatePoints(uassembly) {
		let timearray = [];
		let currenttemp = coffeetemp;
		for (let minute = 0; minute < 24*60; minute++) {
			let dt = currenttemp - ambienttemp;
			let btuloss = (uassembly * (surface_area_lateral_ft + surface_area_bottom_ft + surface_area_top_ft) * dt) / 60;
			let tdrop = btuloss / (water_specific_heat * water_weight_pounds);
			
			// console.log(uassembly)
			currenttemp = Math.max(ambienttemp, currenttemp - tdrop);

			// if (currenttemp > ambienttemp * 1.05) {
			let minuteobj = {
				minute: minute,
				temp: isNaN(currenttemp) ? ambienttemp : currenttemp,
			};
	
			timearray.push(minuteobj);
			// }
	}
	return timearray
	}

	let timearray = generatePoints(uassembly)
	let cardboardarray = generatePoints(1.0)
	let styrofoamarray = generatePoints(0.8)

	console.log([timearray, cardboardarray, styrofoamarray])

	function round(n) {
		return Math.floor(n*1000) /1000
	}
	return (
		<div>
			<LineGraph data={[timearray, cardboardarray, styrofoamarray]}></LineGraph>
			
			<div className="summary-container">
				<div>Ambient Temp: {round(environment.ambienttemp)}</div>
				<div>Coffee Temp: {round(environment.coffeetemp)}</div>
				<div>Diameter: {round(dimensions.diameter)}</div>
				<div>Height: {round(dimensions.height)}</div>
				<div>Radius (ft): {round(radius_ft)}</div>
				<div>Volume (cu ft): {round(volume_cu_ft)}</div>
				<div>Lateral Surface Area (sf): {round(surface_area_lateral_ft)}</div>
				<div>Bottom Surface Area (sf): {round(surface_area_bottom_ft)}</div>
				<div>Top Surface Area (sf): {round(surface_area_top_ft)}</div>
				<div>Weight of Water (lb): {round(water_weight_pounds)}</div>
				<div>Total R-Value: {round(rassembly)}</div>
				<div>U-Assembly: {round(uassembly)}</div>
			</div>
		</div>
	);
};

export { CompiledOutput };
