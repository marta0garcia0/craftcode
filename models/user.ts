interface Address {
    city: string,
    geo: {lat: string, lng: string},
    street: string,
    suite: string,
    zipcode: string    
}

interface Company {
    bs: string,
    catchPhrase: string,
    name: string,
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    company: Company,
    phone: string,
    website: string,
}