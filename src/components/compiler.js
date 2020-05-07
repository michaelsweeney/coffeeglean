import React, { useState } from 'react';
import { Assembly } from './assembly';
import { Dimensions } from './dimensions';
import { Environment } from './environment';
import { CompiledOutput } from './compiledoutput'


const Compiler = () => {
	const [environment, setEnvironment] = useState({});
	const [dimensions, setDimensions] = useState({});
	const [assembly, setAssembly] = useState({});
	const [compiled, setCompiled] = useState({})

	const environmentCallback = p => {
		setEnvironment(p);
	};

	const dimensionsCallback = p => {
		setDimensions(p);
	};

	const assemblyCallback = p => {
		setAssembly(p)
	};

	return (
		<React.Fragment>
			<div className="sidebar-container">
				<Environment callback={environmentCallback} />
				<Dimensions callback={dimensionsCallback} />
				<Assembly callback={assemblyCallback} />
			</div>
			<div className='sidebar-spacer' />
			<div className="main-container">
				<CompiledOutput environment={environment} dimensions={dimensions} assembly={assembly}></CompiledOutput>
			</div>
		</React.Fragment>
	);
};

export { Compiler };
