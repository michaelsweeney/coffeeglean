import React, { useState, useEffect } from 'react';

const Environment = props => {
	const { callback } = props;

	const defaultambient = 70;
	const defaultcoffee = 180;

	const [ambienttemp, setAmbientTemp] = useState(defaultambient);
	const [coffeetemp, setCoffeeTemp] = useState(defaultcoffee);

	const handleAmbientTempChange = e => {
		setAmbientTemp(e.target.value);
	};
	const handleCoffeeTempChange = e => {
		setCoffeeTemp(e.target.value);
	};

	const handleAmbientTempRelease = e => {
		handleCallback({ambienttemp: e.target.value, coffeetemp: coffeetemp});
	};
	const handleCoffeeTempRelease = e => {
		handleCallback({ambienttemp: ambienttemp, coffeetemp: e.target.value});
	};


	const restoreDefaults = () => {
		setAmbientTemp(defaultambient);
		setCoffeeTemp(defaultcoffee);
		handleCallback({ambienttemp: defaultambient, coffeetemp: defaultcoffee});
	};

	const handleCallback = p => {
		callback({
			ambienttemp: +p.ambienttemp,
			coffeetemp: +p.coffeetemp,
		});
	};

	useEffect(restoreDefaults, [])

	return (
		<div className="environment-container">
		<div className='input-header'>Environment</div>
			<div>
				<span>Ambient Temp (deg F)</span>
				<input 
				onChange={handleAmbientTempChange} 
				onBlur={handleAmbientTempRelease} 
				value={ambienttemp}
				></input>
			</div>

			<div>
				<span>Coffee Temp (deg F)</span>
				<input 
				onChange={handleCoffeeTempChange} 
				onBlur={handleCoffeeTempRelease} 
				value={coffeetemp}
				></input>
			</div>

			<div>
				<button onClick={restoreDefaults}>Restore Defaults</button>
			</div>
		</div>
	);
};

export { Environment };
