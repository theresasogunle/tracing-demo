
export const dynamic = "force-dynamic";

async function getUsers() {
  const res = await fetch(
    "https://" + "tracing-demo-xi.vercel.app" + "/api/users"
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function Index() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4">
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
