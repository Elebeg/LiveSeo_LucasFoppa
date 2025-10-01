
interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Pedro", age: 30 },
  { id: 3, name: "Maria", age: 22 }
];

function getNamesAboveAge(users: User[], minAge: number = 23): string[] {
  return users
    .filter(user => user.age > minAge)
    .map(user => user.name);
}

const result = getNamesAboveAge(users);
console.log("Usuarios com mais de 23 anos:");
console.log(result); 

const result30 = getNamesAboveAge(users, 28);
console.log("Usuarios com mais de 28 anos (personalizado):");
console.log(result30); 