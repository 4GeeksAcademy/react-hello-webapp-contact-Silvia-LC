import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";


export const EditContact = () => {
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();


    const navigate = useNavigate();
    const { id } = useParams();

    const contactFind = store.contact.find(contact => contact.id === parseInt(id));
    const updateContact = async (event) => {
        event.preventDefault();
        let newContact = {
            name: name,
            phone: phonenumber,
            address: address,
            email: email,
        }

        await fetch(`https://playground.4geeks.com/contact/agendas/Orion/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        });

        const responsive = await fetch("https://playground.4geeks.com/contact/agendas/Orion");
        const data = await responsive.json();
        dispatch({
            type: "contact",
            payload: data.contacts
        });
        navigate("/")

    }

    useEffect(() => {
        if (contactFind) {
            setName(contactFind.name);
            setPhonenumber(contactFind.phone);
            setAddress(contactFind.address);
            setEmail(contactFind.email);
        }
    }, [contactFind])


    return (
        <div className="d-flex flex-column w-100 vh-100 align-items-center mt-5">
            <h1> Editar contacto </h1>
            <form class="row g-3" onSubmit={(e) => updateContact(e)}>
                <div class="col-md-4">
                    <label for="validationDefault01" class="form-label">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        class="form-control">
                    </input>
                </div>
                <div class="col-md-6">
                    <label for="validationDefault02" class="form-label">Phone Number</label>
                    <input
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        type="text"
                        placeholder="Phone Number"
                        class="form-control">
                    </input>
                </div>
                <div class="col-md-9">
                    <label for="validationDefault03" class="form-label">Address</label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Address"
                        class="form-control">
                    </input>
                </div>
                <div class="col-md-9">
                    <label for="validationDefault03" class="form-label">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        class="form-control">
                    </input>
                </div>
                <div class="col-12">
                    <button class="btn btn-success" type="submit">Save</button>
                </div>
            </form>
        </div>

    )
}
