import { NextResponse } from "next/server";
import { createConnection } from "mysql2/promise";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;
    const connection = await createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
    });
    const [rows, fields] = await connection.query(
      `delete from list where id=${id}`
    );
    connection.end();
    return NextResponse.json({ message: "delete" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
}
