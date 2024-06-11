import Notifications from "@/components/adminpage/Notifications";
import {
  ArrowRightCircle,
  Bell,
  Eye,
  Mails,
  MessageCircle,
  MessageSquareText,
  User,
} from "lucide-react";

function Admin() {
  return (
    <div className="w-full h-full space-y-16">
      <Notifications />
      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="w-full h-[500px] border-[2px] lg:basis-2/3"></div>
        <div className="border-[1px] w-full lg:basis-1/3 rounded-xl bg-white">
          <div className="p-4 flex gap-2 items-center bg-gray-300 rounded-tl-xl rounded-tr-xl">
            <Bell className="w-6 h-6" />
            <h1>Notifications Panel</h1>
          </div>

          <div className="m-5 border-[1px] border-gray-300 h-[500px] flex flex-col">
            <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-6 h-6" />
                <h1>New Comments</h1>
              </div>
              <p>4 minutes ago</p>
            </div>

            <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-6 h-6" />
                <h1>New Comments</h1>
              </div>
              <p>4 minutes ago</p>
            </div>

            <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-6 h-6" />
                <h1>New Comments</h1>
              </div>
              <p>4 minutes ago</p>
            </div>

            <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-6 h-6" />
                <h1>New Comments</h1>
              </div>
              <p>4 minutes ago</p>
            </div>

            <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-6 h-6" />
                <h1>New Comments</h1>
              </div>
              <p>4 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
