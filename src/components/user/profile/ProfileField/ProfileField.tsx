import React from "react";


interface ProfileFieldProps {
    icon: React.ReactNode,
    label: string,
    isEditing: boolean,
    value: string,
    name: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProfileField( { icon, label, isEditing, value, name, handleChange }: ProfileFieldProps ) {
    return (
        <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${name === 'email' ? 'bg-white' : 'bg-gray-50'}`}>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              {icon}
              {label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                value
              )}
            </dd>
        </div>
    )
}