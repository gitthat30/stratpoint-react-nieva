import React, { useEffect, useState } from "react";
import { ProfileField } from "../../components/user/profile";
import { User, Mail } from "lucide-react";
import { useAuthContext } from "../../hooks";
import { KYCField } from "../../components/user/profile/KYCField/KYCField";
import { KYCService } from "../../services";

type ProfileType = {
    name: string | null,
    email: string | null
}

export function Profile() {
    const { user, token } = useAuthContext();
    const [ file, setFile ] = useState<File | null>(null);
    const [ isApproved, setIsApproved ] = useState<boolean>(false);

    const kycService = new KYCService();

    //use kycService to get KYC Status ad use it to set isApproved

    useEffect(() => {
        checkKYCStatus();
    }, [])

    useEffect(() => {
        console.log(isApproved)
    }, [isApproved])

    const [profile, setProfile] = useState<ProfileType>({
        name: `${user?.firstName} ${user?.lastName}`,
        email: `${user?.email}`
    });

    const [isEditing] = useState<boolean>(false);
    
    async function checkKYCStatus() {
        const status = await kycService.getKYCStatus(token);
        console.log(status)
        
        if(status === "approved") {
            setIsApproved(true);
        }
        else {
            setIsApproved(false);
        }
    }

    // function handleEdit() {
    //     setIsEditing(true);
    // }

    // function handleSave() {
    //     setIsEditing(false);
    //     alert('Profile updated successfully!')
    // }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name , value } = e.target
        setProfile((prev) => ({
            ...prev, [name]: value
        }))
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    }

    function handleSubmit() {
        kycService.initiateKYC(token, file!);
        setIsApproved(true);
    }

    return (
        <div className="space-y-6">
            <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-header-text">User Profile</h3>
                </div>

                <div className="border-t border-border">
                    <dl>
                        <ProfileField 
                            label="Full Name"
                            icon={<User className="mr2" size={18} />}
                            value={profile.name!}
                            name="name"
                            handleChange={handleChange}
                            isEditing={isEditing}
                        />

                        <ProfileField 
                            label="Email Address"
                            icon={<Mail className="mr2" size={18} />}
                            value={profile.email!}
                            name="email"
                            handleChange={handleChange}
                            isEditing={isEditing}
                        />
                    </dl>
                </div>
                
                {/* <div className="px-4 py-3 bg-card-background text-right sm:px-6">
                    {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-button-white bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                    ) : (
                    <button
                        onClick={handleEdit}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700text-button-white bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Edit
                    </button>
                    )}
                </div> */}
            </div>
            <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                <div className="space-y-3 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-header-text">KYC Status</h3>

                    {isApproved ? (
                        <div className="text-lg text-green-600 font-small">Your KYC is approved!</div>
                    ) : (
                        <KYCField
                        file={file}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}/>
                    )}
                </div>
            </div>
        </div>
    )
}