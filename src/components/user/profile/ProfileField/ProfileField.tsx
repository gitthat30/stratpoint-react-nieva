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
        <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${name === 'email' ? 'bg-card-background' : 'bg-card-background-shade'}`}>
            <dt className="text-sm font-medium text-header-text flex items-center">
              {icon}
              <div className="px-2">
                {label}
              </div>
            </dt>
            <dd className="mt-1 text-sm text-header-text sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-border px-2 bg-background rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                value
              )}
            </dd>
        </div>
    )
}