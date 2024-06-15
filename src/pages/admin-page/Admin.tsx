import Body from "@/components/adminpage/Body";
import Notifications from "@/components/adminpage/Notifications";

function Admin() {
  return (
    <div className="w-full h-full space-y-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Notifications />
      <Body />
    </div>
  );
}

export default Admin;
