import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useEffect,useState} from "react";
import { UserRoundPen } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { Pin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const navigate = useNavigate();
	const editContact = (id) => {
		navigate(`/EditContact/${id}`);

	}

	const deleteContact = async (id) => {
		await fetch(`https://playground.4geeks.com/contact/agendas/Orion/contacts/${id}`,{
			 method: "DELETE",
		})
		getApi();
	}

	const getApi = async () =>{
		const responsive = await fetch ("https://playground.4geeks.com/contact/agendas/Orion");
		const data =await responsive.json();
		dispatch({
 			type: "contact",
  			payload: data.contacts
		});

	}


	useEffect(() => {
		getApi();
	}, [])

	 const { store, dispatch } = useGlobalReducer();
	 const { contact } = store;
	 
  return (
	<div>
		<div className="d-flex flex-column w-100 vh-100 align-items-center mt-5">
			<Link to="/AddContact">
				<button className = "btn btn-success w-40">
					Crear contacto
				</button>
			</Link>	
			<ol className="list-group m-4 w-50">
				{
					store.contact.map((contact, index) => {
						return(
							<div className="container" key={index}>
								<div className= "photo">
									<img className= "image" src="https://openpsychometrics.org/tests/characters/test-resources/pics/BBT/2.jpg"></img>
								</div>
								<div className= "info">
									<ul>
										<li>{contact.name}</li>
										<li><Mail/> {contact.email}</li>
										<li><Phone /> {contact.phone} </li>
										<li><Pin />{contact.address}</li>
									</ul>
								</div>
							<div className="btn-group d-flex gap-2">
									
									<button className="btn btn-outline-primary btn-sm" onClick={(e) => editContact (contact.id)}><UserRoundPen/></button>
									
									<button className="btn btn-outline-danger btn-sm" onClick={(e) => deleteContact (contact.id)}><CircleX /></button>
								</div>
							</div>
								
						)},
					)}
			</ol>
		</div>
	</div>	
  );
};	
	