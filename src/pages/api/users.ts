import sqlite3 from "sqlite3";
import {open} from "sqlite";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../libs/types";

function openDB(){
    return open({
        filename: path.join(process.cwd(), "database.db"),
        driver: sqlite3.Database
    });
}

async function fetchFromDB() {
  try {
      const db = await openDB();
      const rows: User[] = await db.all("SELECT * FROM users");
      db.close();
      return rows;
  } catch (err: any) {
      console.error(err.message);
      throw new Error("Database fetch error");
  }
}


async function updateDB(user: Partial<User>) {
  try {
      const db = await openDB();
      const updates: string[] = [];
      const values: (string | number)[] = [];

      if (user.theme) {
          updates.push("theme = ?");
          values.push(user.theme);
      }

      if (user.fontSize) {
          updates.push("fontSize = ?");
          values.push(user.fontSize);
      }

      values.push(user.id as number);

      if (updates.length === 0) {
          throw new Error("No fields to update");
      }

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      await db.run(query, values);
      db.close();
  } catch (err: any) {
      console.error(err.message);
      throw new Error("Database update error");
  }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method === "GET"){
    try{
      const data = await fetchFromDB();
      res.status(200).json(data);
    } catch(error: any) {
      res.status(500).json({ error: error.message});
    }
  }
  else if(req.method === "PUT"){
    try {
      const body = req.body;
      if(!body.id){
        res.status(400).json({error: "User ID is required "});
        return;
      }
      await updateDB(body);
      res.status(200).json({message: "User settings updated successfully!"});
    } catch(error: any) {
      res.status(500).json({error: error.message})
    }
  }
  else {
    res.status(405).json({ error: "Method not allowed"});
  }
  
}