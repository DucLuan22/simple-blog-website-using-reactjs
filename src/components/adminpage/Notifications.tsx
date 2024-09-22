import {
  ArrowRightCircle,
  Eye,
  Mails,
  MessageSquareText,
  User,
} from "lucide-react";

export default function Notifications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg aspect-w-1 h-[250px] flex flex-col bg-green-500">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <Eye className="w-28 h-28 text-white " />
            <p className=" text-8xl font-bold text-white">30</p>
          </div>
          <h2 className="mt-3 text-end text-white text-lg font-semibold spacing tracking-wider">
            Today Views
          </h2>
        </div>
        <div className="mx-1 px-5 bg-white h-[62px] rounded-lg flex items-center justify-between">
          <p className="text-green-500">View Details</p>
          <ArrowRightCircle className="w-6 h-6 text-green-500" />
        </div>
      </div>

      <div className="rounded-lg aspect-w-1 h-[250px] flex flex-col bg-blue-500">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <Mails className="w-28 h-28 text-white " />
            <p className=" text-8xl font-bold text-white">30</p>
          </div>
          <h2 className="mt-3 text-end text-white text-lg font-semibold spacing tracking-wider">
            Today Bookmarks
          </h2>
        </div>
        <div className="mx-1 px-5 bg-white h-[62px] rounded-lg flex items-center justify-between">
          <p className="text-blue-500">View Details</p>
          <ArrowRightCircle className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="rounded-lg aspect-w-1 h-[250px] flex flex-col bg-red-500">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <MessageSquareText className="w-28 h-28 text-white " />
            <p className=" text-8xl font-bold text-white">30</p>
          </div>
          <h2 className="mt-3 text-end text-white text-lg font-semibold spacing tracking-wider">
            New Comments
          </h2>
        </div>
        <div className="mx-1 px-5 bg-white h-[62px] rounded-lg flex items-center justify-between">
          <p className="text-red-500">View Details</p>
          <ArrowRightCircle className="w-6 h-6 text-red-500" />
        </div>
      </div>

      <div className="rounded-lg aspect-w-1 h-[250px] flex flex-col bg-yellow-500">
        <div className="m-4">
          <div className="flex justify-between items-center">
            <User className="w-28 h-28 text-white " />
            <p className=" text-8xl font-bold text-white">30</p>
          </div>
          <h2 className="mt-3 text-end text-white text-lg font-semibold spacing tracking-wider">
            New Users
          </h2>
        </div>
        <div className="mx-1 px-5 bg-white h-[62px] rounded-lg flex items-center justify-between">
          <p className="text-yellow-500">View Details</p>
          <ArrowRightCircle className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}
