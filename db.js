const Database= require("better-sqlite3");
const db= new Database("tasks.db");

db.prepare(`
    create table if not exists tasks(
    id integer primary key autoincrement,
    title text not null,
    done integer not null default 0)
    `).run();

const row= db.prepare("select count(*) as count from tasks").get();

if (row.count===0){
    const insert= db.prepare(`
        insert into tasks( title, done)
        values(?, ?)`);
    
    insert.run("Finish stage 0", 0);
    insert.run("Run my program", 1);
    insert.run("Connect to database", 0);

    console.log("Database seeded.");
}

module.exports= db;