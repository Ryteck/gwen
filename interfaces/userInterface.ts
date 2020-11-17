interface UserInterface {
    id: string | number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar: string;
    administrador: boolean | 'true' | 'false';
}

export default UserInterface
