import React, { useState, useEffect } from 'react';

const Dimensions = props => {
	const { callback } = props;

	const defaultheight = 8;
	const defaultdiameter = 3;

	const [diameter, setDiameter] = useState(defaultdiameter);
	const [height, setHeight] = useState(defaultheight);

	const handleDiameterChange = e => {
		setDiameter(e.target.value);
	};

	const handleHeightChange = e => {
		setHeight(e.target.value);
	};


	const handleDiameterRelease = e => {
		handleCallback({diameter: e.target.value, height: height});
	};

	const handleHeightRelease = e => {
		handleCallback({height: e.target.value, diameter: diameter});
	};

	const handleCallback = (p) => {
		callback({
			diameter: +p.diameter,
			height: +p.height,
		});
	};

	const restoreDefaults = () => {
		setDiameter(defaultdiameter);
		setHeight(defaultheight);
		handleCallback({height: defaultheight, diameter: defaultdiameter});
	};

	useEffect(restoreDefaults, [])

	return (
		<div className="dimensions-container">
		<div className='input-header'>Mug Dimensions</div>
			<div>
				<span>Inner Diameter (in)</span>
				<input 
				onChange={handleDiameterChange} 
				onBlur={handleDiameterRelease} 
				value={diameter}
				></input>
			</div>

			<div>
				<span>Inner Height (in)</span>
				<input 
				onChange={handleHeightChange} 
				onBlur={handleHeightRelease} 
				value={height}
				></input>
			</div>
			<div>
				<button onClick={restoreDefaults}>Restore Defaults</button>
			</div>
		</div>
	);
};

export { Dimensions };
