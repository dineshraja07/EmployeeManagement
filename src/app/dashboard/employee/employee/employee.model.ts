export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    dob: string,
    address: string,
    bloodGroup: string,
    divisionName: string,
    gender: string,
    role: string,
    experience: string,
    email: string,
    phoneNumber: string,
    emergencyNumber: string,
    maritalStatus: string,
    linkedinUrl: string,
    twitterUrl: string,
    active: boolean
}

export const EmployeeColumns = ['delete', 'ID', 'Name', 'Email', 'PhoneNumber', 'Division', 'Role', 'Options']

export interface FormOne {
    firstName: string,
    lastName: string,
    bloodGroup: string,
    dob: string,
    phoneNumber: string,
    emergencyNumber: string,
    gender: string,
    maritalStatus: string,
    email: string,
    address: string
}
export interface FormTwo {
    divisionName: string,
    role: string,
    experience: string,
    linkedinUrl: string,
    twitterUrl: string
}
