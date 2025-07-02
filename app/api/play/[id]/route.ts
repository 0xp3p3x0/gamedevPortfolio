import { NextRequest } from 'next/server';
 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify({ id, name: `User ${id}` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
 
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  // e.g. Delete user with ID `id` in DB
  return new Response(null, { status: 204 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  // e.g. Create a new user with ID `id` in DB
  const gameurl = "/assets/games/" + id + "/index.html";
  return new Response(JSON.stringify({ id, gameurl }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}