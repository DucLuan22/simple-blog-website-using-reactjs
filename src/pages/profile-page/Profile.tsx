import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCounterStore } from "@/store";

function Profile() {
  const user = useCounterStore((state) => state.user);

  return (
    <div className="w-full h-full z-10">
      <div className="flex flex-col lg:flex-row lg:h-full">
        <div className="lg:basis-1/3 lg:h-full lg:border-r-[2px]">
          <div className="flex mt-16 lg:mt-32 flex-col items-center gap-y-1">
            <img
              src={user?.avatar_url}
              alt="Technology"
              className="rounded-[100%] border-[1px] border-black w-[120px] overflow-hidden"
            />
            <h2 className="font-bold text-xl">
              {user?.familyName + " " + user?.givenName}
            </h2>
          </div>
        </div>
        <div className="pl-3 pt-12 lg:pl-8 lg:pt-14 w-full space-y-5">
          <p className="text-xl font-bold">Edit your profile</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Label htmlFor="name">Family Name</Label>
              <Input type="text" id="name" placeholder={user?.familyName} />
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input type="text" placeholder={user?.givenName} />
            </div>

            <div className="col-span-2">
              <Label htmlFor="surname">Email</Label>
              <Input type="text" placeholder={user?.email} readOnly />
            </div>
            <div>
              <Label htmlFor="name">Country</Label>
              <Input type="text" id="name" placeholder="Country" />
            </div>
            <div>
              <Label htmlFor="surname">Region/State</Label>
              <Input type="text" placeholder="Region/State" />
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
