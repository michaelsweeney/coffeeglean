import React, { useState } from 'react';
import './App.css';

import { Compiler } from './components/compiler';
import { Header } from './components/header';


function App() {
	return (
		<div className="App">
			<Header />
			<Compiler />
		</div>
	);
}

export default App;
