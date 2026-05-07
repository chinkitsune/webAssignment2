import mongoClient, { MongoClient } from 'mongodb'
import fs from 'node:fs/promises'
import express from 'express'
import path from 'path';
import { backup } from 'node:sqlite';
import { json } from 'node:stream/consumers';
const router = express.Router();

const dbName = "mydb";
const backupPath = "./db_backups";
const tableList = ["products","users"];

async function exportToJson()
{
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    const db = client.db(dbName);
    for(let table of tableList){
        console.log(table);
        const collection_products = db.collection(table);
        const data = await collection_products.find({}).toArray();
        const json_data = JSON.stringify(data,null,2);

        await fs.mkdir(backupPath, { recursive: true });
        await fs.writeFile(path.join(backupPath,table+'.json'),json_data);
    }
    console.log('Export completed');
    await client.close();
}

async function importFromJson() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db(dbName);
  
  for(let table of tableList){
    const rawData = await fs.readFile(path.join(backupPath,table+'.json'));
    const jsonData = JSON.parse(rawData).map(item => {
        const {_id,...rest} = item;
        return rest;
    });
    if(jsonData.length > 0){
        await db.collection(table).drop();
        await db.collection(table).insertMany(jsonData);
        console.log('Import complete to',table);
    }else{
        console.log("File was empty, nothing to restore");
    }
  }
  await client.close();
}

router.get('/export',async (req,res) => {
    await exportToJson();
    res.json({res:"success"});
});

router.get('/import',async (req,res) => {
    await importFromJson();
    res.json({res:"success"});
});


export default router;