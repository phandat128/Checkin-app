import { useEffect, useState } from "react";
import axios from "axios"

import './App.css';

function App() {
	const [name,setName] = useState("")
	const [id, setId] = useState("")
	const [gate, setGate] = useState("GATE1")
	const [history, setHistory] = useState([])

	// const history = {}

	const addCheck = async (name,id,gate) => {
		const newCheck = {
			name: name,
			id: id,
			gate: gate,
		}

		try {
			const response = await axios.post("http://localhost:8000/check",newCheck)
			console.log(response.data)
		} catch (err) {
			console.log(err)
		}
		
	}

	const handleSubmit = e => {
		e.preventDefault();
		if (!name || !id) return alert("Please enter both name and id")
		
		addCheck(name,id ,gate)
		alert("Check!")

		setId("")
		setName("")
		setGate("GATE1")
	}

	const getHistory = async () => {
		try{
			const response = await axios.get("http://localhost:8000/history")
			setHistory(response.data.reverse())
		} catch(err){
			console.log(err)
		}
	}

	useEffect(() => {
		getHistory()
	},[])

	return (
		<div className="container">
			{/* get checkin data using a form  */}
			<form className="add-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label>Employee's name:</label>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Employee's ID</label>
					<input
						type="text"
						placeholder="ID"
						value={id}
						onChange={e => setId(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Check-in gate:</label>
					<select onChange={e => setGate(e.target.value)}>
						<option value="GATE1">GATE1</option>
						<option value="GATE2">GATE2</option>
						<option value="GATE3">GATE3</option>
					</select>
					{/* <input
						type="text"
						placeholder="GATE"
						value={gate}
						onChange={e => setGate(e.target.value)}
					/> */}
				</div>
				<input type="submit" value="Check-in" className="btn btn-block" />
			</form>
			<div>
				{history.map(e => (
					<div key={`item${e.id}`} className='tab'>
						<h3>Time Check-in: {(e.checkin.slice(0,-5))}</h3>
						<p>Name: {e.User.name}</p>
						<p>Gate: {e.Gate}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
