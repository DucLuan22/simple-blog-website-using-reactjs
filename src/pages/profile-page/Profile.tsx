import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Profile() {
  return (
    <div className="w-full h-full z-10">
      <div className="flex flex-col lg:flex-row lg:h-full">
        <div className="lg:basis-1/3 lg:h-full lg:border-r-[2px]">
          <div className="flex mt-16 lg:mt-32 flex-col items-center gap-y-1">
            <div className="rounded-[100%] border-[1px] border-black w-[120px] overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
                alt="Technology"
              />
            </div>
            <h2 className="font-bold text-xl">John Doe</h2>
            <p className="text-lg">ducluandang@gmail.com</p>
          </div>
        </div>
        <div className="pl-3 pt-12 lg:pl-8 lg:pt-14 w-full space-y-5">
          <h1 className="text-xl font-bold">Edit your profile</h1>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Name" />
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input type="text" placeholder="Surname" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="surname">Username</Label>
              <Input type="text" placeholder="Username" />
            </div>

            <div className="col-span-2">
              <Label htmlFor="surname">Email</Label>
              <Input type="text" placeholder="Email" />
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
