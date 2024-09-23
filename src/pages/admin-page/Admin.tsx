import Body from "@/components/adminpage/Body";
import Notifications from "@/components/adminpage/Notifications";
import { useCounterStore } from "@/store";

function Admin() {
  const user = useCounterStore((state) => state.user);
  return (
    <div className="w-full h-full space-y-16">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Notifications user_id={user?.id} />
      <Body user_id={user?.id} />
    </div>
  );
}

export default Admin;
