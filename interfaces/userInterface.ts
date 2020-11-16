interface UserInterface {
    id: string | number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar: string;
    administrador: 'true' | 'false';
}

export default UserInterface
