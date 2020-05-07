import React, { useState, useEffect } from 'react';
import { MaterialInput } from './materialinput';

const Assembly = props => {
	const { callback } = props;

	const genTag = () => Math.floor(Math.random() * 1e9);

	const [materialObj, setMaterialObj] = useState({});

	const addMaterial = () => {
		let objcopy = Object.assign({}, materialObj)
		objcopy[genTag()] = {}
		setMaterialObj(objcopy);
		callback(objcopy)
	};

	const removeMaterial = e => {
		let tag = e.target.getAttribute('tag');
		let objcopy = Object.assign({}, materialObj)
		delete objcopy[tag]
		setMaterialObj(objcopy)
		callback(objcopy)
	};

	const updateMaterial = e => {
		let objcopy = Object.assign({}, materialObj);
		objcopy[e.tag] = e;
		setMaterialObj(objcopy)
		callback(objcopy)
	};

	useEffect(() => {
		addMaterial()
	}, [])

	return (
		<div className="assembly-container">
			<div className="input-header">Materials</div>
			<button className="add-type-button" onClick={addMaterial}>
				Add Type
			</button>

			{Object.keys(materialObj).map((m, i) => {
				return (
					<div key={m}>
						<MaterialInput
							tag={m}
							idx={i}
							updateCallback={updateMaterial}
							removeCallback={removeMaterial}
						></MaterialInput>
						<br></br>
					</div>
				);
			})}
		</div>
	);
};

export { Assembly };
