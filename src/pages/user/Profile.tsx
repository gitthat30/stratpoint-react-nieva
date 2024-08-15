import React, { useState } from "react";
import { ProfileField } from "../../components/user/profile";
import { User, Mail, Phone } from "lucide-react";

type Profile = {
    name: string,
    email: string,
    phone: string
}

export function Profile() {
    const [profile, setProfile] = useState<Profile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        setIsEditing(false);
        alert('Profile updated successfully!')
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name , value } = e.target
        setProfile((prev) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
            </div>

            <div className="border-t border-gray-200">
                <dl>
                    <ProfileField 
                        label="Full Name"
                        icon={<User className="mr2" size={18} />}
                        value={profile.name}
                        name="name"
                        handleChange={handleChange}
                        isEditing={isEditing}
                    />

                    <ProfileField 
                        label="Email Address"
                        icon={<Mail className="mr2" size={18} />}
                        value={profile.email}
                        name="email"
                        handleChange={handleChange}
                        isEditing={isEditing}
                    />

                    <ProfileField 
                        label="Phone Number"
                        icon={<Phone className="mr2" size={18} />}  
                        value={profile.phone}
                        name="phone"
                        handleChange={handleChange} 
                        isEditing={isEditing}
                    />  
                </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {isEditing ? (
                <button
                    onClick={handleSave}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save
                </button>
                ) : (
                <button
                    onClick={handleEdit}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Edit
                </button>
                )}
            </div>
        </div>
    )
}