interface IPerson {
    getName(): string
}

class Person implements IPerson {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name,
        this.age = age
    }

    getName(): string {
        return this.name;
    }

    static Builder = class {
        private personName: string;
        private personAge: number;
        
        name(name: string) {
            this.personName = name;
            return this;
        }

        age(age: number) {
            this.personAge = age;
            return this;
        }

        build() {
            return new Person(this.personName, this.personAge); 
        }
    }
}

const roie: IPerson = new Person.Builder()
    .name("roie")
    .age(20)
    .build();

console.log(roie.getName());