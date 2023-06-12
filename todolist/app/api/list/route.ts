import { NextResponse } from "next/server";
import { createConnection } from "mysql2/promise";

export async function GET(request: Request) {
  try {
    const connection = await createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    });
    const [rows, fields] = await connection.query(`select * from list`);
    connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const connection = await createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    });
    const [rows, fields] = await connection.query(
      `insert into list (title,created) values('${title}',now())`
    );
    connection.end();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
}
