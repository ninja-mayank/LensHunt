import { useCreateProfile } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";

const CreateProfile = () => {
    const { execute, loading, error } = useCreateProfile();
    const {address} = useAccount();
    console.log(address)
    if(!address) return null;
    const createProfile = async() => {
        const result = await execute({
            localName: 'mayank_lens_testnet', // full handle will be lens/foobar
            to: address,
        });
        if (result.isFailure()) {
            console.error(result.error);
            return;
        }
    }
    return (
        <button onClick={createProfile}>Create a profile</button>
    );
}
export default CreateProfile;