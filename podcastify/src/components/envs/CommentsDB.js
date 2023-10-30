// SANDBOX PARA TESTEAR LA ENTRADA DE COMENTARIOS DESDE USUARIOS FICTICIOS
import {faker} from '@faker-js/faker';

const db = [
    {
        "id": 0,
        "name": faker.person.firstName(),
        "comment": faker.hacker.phrase(),
    },
    {
        "id": 1,
        "name": faker.person.firstName(),
        "comment": faker.hacker.phrase(),
    },
    {
        "id": 2,
        "name": faker.person.firstName(),
        "comment": faker.hacker.phrase(),
    },
]

export default db;