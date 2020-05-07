import React, { useState, useEffect } from 'react';

const MaterialInput = props => {
	const defaultmaterials = {
		air: {
			name: 'Air',
			rperinch: 1,
			thickness: 0.1,
			key: 'air',
		},
		polystyrene: {
			name: 'Polystyrene',
			rperinch: 4,
			thickness: 0.25,
			key: 'polystyrene',
		},
		cardboard: {
			name: 'Cardboard',
			rperinch: 3.5,
			thickness: 0.1,
			key: 'cardboard',
		},
		aluminum: {
			name: 'Aluminum',
			rperinch: 3.5,
			thickness: 0.1,
			key: 'aluminum',
		},
		custom: {
			name: 'Custom Material',
			rperinch: 0,
			thickness: 0,
			key: 'custom',
		},
	};

	const [material, setMaterial] = useState({
		name: 'Air', // written name e.g. "Air"
		rperinch: '',
		thickness: '',
		key: 'air', // object key e.g. 'air,
		tag: props.tag,
	});

	const { updateCallback, tag, idx, removeCallback } = props;

	const handleSelect = e => {
		let copy = Object.assign({}, defaultmaterials[e.target.value]);
		copy['tag'] = tag;
		setMaterial(copy);
		updateCallback(copy);
	};

	const handleRChange = e => {
		setMaterial({ ...material, ...{ rperinch: e.target.value, tag: tag } });
	};

	const handleThickChange = e => {
		setMaterial({ ...material, ...{ thickness: e.target.value, tag: tag } });
	};


	const handleRRelease = e => {
		updateCallback({ ...material, ...{ rperinch: +e.target.value, tag: tag } });
	}

	const handleThickRelease = e => {
		updateCallback({ ...material, ...{ thickness: +e.target.value, tag: tag } });

	}


	const restoreDefault = () => {
		let copy = Object.assign({}, defaultmaterials[material['key']]);
		copy['tag'] = tag;
		setMaterial(copy);
		updateCallback(copy);
	};

	const removeSelf = e => {
		removeCallback(e);
	};

	return (
		<div className="material-select-container">
			<div>
				<div className="material-header-container">
					<span className="material-header">Material # {idx + 1}</span>
					{/* <span>${tag}</span> */} {/* tag debugging*/}
					<button className="remove-btn" tag={tag} onClick={removeSelf}>
						X
					</button>
					<button className="default-btn" onClick={restoreDefault}>
						Restore Default
					</button>
				</div>

				<span>Material Type</span>
				<select onChange={handleSelect}>
					{Object.values(defaultmaterials).map(m => {
						return (
							<option key={m.key} value={m.key}>
								{m.name}
							</option>
						);
					})}
				</select>
			</div>

			<div>
				<span>R per Inch</span>
				<input onChange={handleRChange} onBlur={handleRRelease} value={material['rperinch']}></input>
			</div>
			<div>
				<span>Thickness (in)</span>
				<input onChange={handleThickChange} onBlur={handleThickRelease} value={material['thickness']}></input>
			</div>
		</div>
	);
};

export { MaterialInput };
