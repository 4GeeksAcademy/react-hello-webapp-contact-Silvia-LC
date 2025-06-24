import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const AddContact = () => {

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();

    const addNewContact = async (event) => {
        event.preventDefault();

        let newContact = {
            name: name,
            phone: phonenumber,
            address: address,
            email: email,

        }

        await fetch("https://playground.4geeks.com/contact/agendas/Orion/contacts", {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        });
        navigate("/")

    }

    return (
        <div className="d-flex flex-column w-100 vh-100 align-items-center mt-5">
            <h1> Nuevo contacto </h1>
            <form class="row g-3" onSubmit={(e) => addNewContact(e)}>
                <div class="col-md-4">
                    <label for="validationDefault01" class="form-label">Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        id="validationDefault01">
                    </input>
                </div>
                <div class="col-md-6">
                    <label for="validationDefault02" class="form-label">Phone Number</label>
                    <input
                        onChange={(e) => setPhonenumber(e.target.value)}
                        type="text"
                        placeholder="Phone number"
                        class="form-control"
                        id="validationDefault02">
                    </input>
                </div>
                <div class="col-md-9">
                    <label for="validationDefault03" class="form-label">Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="address"
                        class="form-control"
                        id="validationDefault03">
                    </input>
                </div>
                <div class="col-md-9">
                    <label for="validationDefault03" class="form-label">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="email"
                        class="form-control"
                        id="validationDefault03">
                    </input>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-success" >Save</button>
                </div>
            </form>
        </div>

    )
}
