interface InputInterface {
    id: string | number;
    item: string | number;
    origin: string;
    quantity: number;
    user: string | number;
    when: Date;
}

export default InputInterface
