import React, { useState, useEffect } from "react";
import { OpenActionType, useCreatePost, useCurrencies, usePublication, PublicationId } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";
import { WelcomeToLens } from "./WelcomeToLens";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import {textOnly} from "@lens-protocol/metadata"
import PopupForm from "./PopupForm"

interface Bounty {
    company: string;
    role: string;
    description: string;
    val: string;
}

const CreateBountyComponent = () => {
    const { execute: createPost } = useCreatePost();
    const { data: currencies } = useCurrencies();
    const { address } = useAccount();
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [val, setVal] = useState('');
    const [v, setV] = useState<Bounty[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    useEffect(() => {
        const newObject1: Bounty = {
            company : "Company1",
            role : "Role1",
            description : "Description1",
            val: "1",
          };
        v.push(newObject1)
        const newObject2: Bounty = {
            company : "Company2",
            role : "Role2",
            description : "Description2",
            val: "2",
          };
        v.push(newObject2)
        const newObject3: Bounty = {
            company : "Company3",
            role : "Role3",
            description : "Description3",
            val: "3",
          };
        v.push(newObject3)
        const newObject4: Bounty = {
            company : "Company4",
            role : "Role4",
            description : "Description4",
            val: "4",
          };
        v.push(newObject4)
        const newObject5: Bounty = {
            company : "Company5",
            role : "Role5",
            description : "Description5",
            val: "5",
          };
        v.push(newObject5)
    },[])
    const metadata = textOnly({
        content: "lol",
    });
    // Call usePublication at the top level of the component
    const handleCreateBounty = async () => {
        if (!currencies) return;
        const matic = currencies.find(c => c.name === "Wrapped Matic");
        if (!matic) return;
        
        const storage = new ThirdwebStorage({
            clientId: "a7e2c7b5deac446385525b33d9ea6caf",
            secretKey: process.env.THIRDWEB_KEY
        });
        
        const uri = await storage.upload(metadata);
        console.log('Metadata URI:', uri);

        const result = await createPost({
            metadata: uri,

        });

        if (result.isFailure()) {
            console.error('Failed to create bounty:', result.error.message);
            return;
        }

        console.log('Post Creation Result:', result);
        const completion = await result.value.waitForCompletion();

        if (completion.isFailure()) {
            console.error('There was an error processing the transaction:', completion.error.message);
            return;
        }
        const post = completion.value;
        setV(prevV => [
            { company, role, description, val },
            ...prevV
        ]);
    };

    return (
        <div className="pt-28 pl-28">
            <div className="inline-flex w-full">
                <div style={{height:"28rem"}} className="bg-gray-200 w-96 mt-20 overflow-y-auto rounded-md"> 
                    <WelcomeToLens />
                    <div className="pr-96 mt-6 w-96 bg-gray-200 items-center rounded-md">
                        <div className="pl-32 pt-6 w-96 text-2xl">
                            Create a job
                        </div>
                        <div className="pl-14 pt-6">
                        <input className="rounded-md border-2 border-black w-64 pl-2" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
                        </div>
                        <div className="pl-14 pt-3">
                        <input className="rounded-md border-2 border-black w-64 pl-2" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
                        </div>
                        <div className="pl-14 pt-3">
                        <textarea className="rounded-md border-2 border-black w-64 pl-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="pl-14 pt-3">
                        <input className="rounded-md border-2 border-black w-64 pl-2" placeholder="Bounty Price" value={val} onChange={e => setVal(e.target.value)} />
                        </div>
                        <div className="pl-14 pt-3">
                        <button className= "rounded-md bg-teal-400 p-1 w-64 rounded-md mb-2" onClick={handleCreateBounty}>Create Bounty</button>
                        </div>
                    </div>
                </div>
                <div style={{width:'48rem'}}> 
                    <h1 className="pl-96 pb-8 text-5xl w-full">Feed</h1>
                    {v.map((bounty, index) => (
                            <div key={index} className="rounded-md border-b-2 border-gray-300 ml-20 t-4 bg-gray-200 p-1 mb-4 w-full">
                                <div><strong>Company:</strong> {bounty.company}</div>
                                <div><strong>Role:</strong> {bounty.role}</div>
                                <div><strong>Description:</strong> {bounty.description}</div>
                                <button className="bg-green-600 text-white p-1 rounded-md" onClick={togglePopup} style={{marginLeft:'39rem'}}>Bounty Price: {bounty.val}</button>
                                <PopupForm show={showPopup} onClose={togglePopup} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CreateBountyComponent;
