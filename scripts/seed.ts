const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient()

async function main(){
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science"},
                { name: "Music"},
                { name: "Fitness"},
                { name: "Photography"},
                { name: "Accounting"},
                { name: "Engineering"},
                { name: "Filming"},
                { name: "Law"},
                { name: "Medical"},
                { name: "Farming"},
            ]
        })

        console.log("successfully created category");
        
    } catch (error) {
        console.log("Error seeeding the database categories", error);   
    } finally {
        await database.$disconnect()
    }
}

main()