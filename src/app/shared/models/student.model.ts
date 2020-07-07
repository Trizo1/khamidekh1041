export interface Student {
    id?: number;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    email: string;
    date: string;
    group: string;
    section: string;
}

export enum StudentSection {
    web = "ВЕБ",
    cad = "САПР",
    infMaths = "Информатика и математика",
    is = "Информационная безопасность"
}

export enum GroupSection {
    web1 = "181-111",
    cad1 = "181-112",
    infMaths1 = "181-113",
    is1 = "181-114"
}