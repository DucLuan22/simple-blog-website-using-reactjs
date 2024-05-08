import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Contact() {
  return (
    <div className="w-full h-vh space-y-40 mb-64">
      <div className="flex flex-col items-center mx-[20%] gap-y-4">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">
          CONTACT US
        </h1>
        <p className="leading-10 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero animi
          possimus incidunt ipsam voluptas sunt ut, accusantium tempore ratione
          explicabo modi asperiores deserunt consequatur magnam eum saepe nisi
          temporibus ipsum.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-x-20 lg:gap-x-40">
        <div className="w-full basis-3/4 space-y-14">
          <div className="space-y-14">
            <section className="space-y-1">
              <h2 className="font-semibold text-xl mb-5">OFFICE</h2>
              <div>742 Runolfsdottir Courts Apt. 787</div>
              <div>Schambergerview</div>
              <div>Hawaii, USA</div>
            </section>
            <hr className="border-b-[1px] border-foreground opacity-20" />
          </div>

          <div className="space-y-14">
            <section className="space-y-1">
              <h2 className="font-semibold text-xl mb-5">ELECTRONIC EMAIL</h2>
              <div>ducluandang22@gmail.com</div>
            </section>
            <hr className="border-b-[1px] border-foreground opacity-20" />
          </div>

          <div className="space-y-14">
            <section className="space-y-6">
              <h2 className="font-semibold text-xl -mb-3">PHONE SUPPORT</h2>
              <div>Hours: 9am - 5pm (ICT), Monday - Friday</div>
              <div>09331116434</div>
            </section>
          </div>
        </div>
        <div className="mt-20 w-full md:w-[65%] md:mt-0">
          <div className="space-y-4">
            <h3>NAME</h3>
            <Input className="rounded-none focus-visible:ring-0" />
            <h3>EMAIL</h3>
            <Input className="rounded-none focus-visible:ring-0" />
            <h3>PHONE NUMBER</h3>
            <Input className="rounded-none focus-visible:ring-0" />
            <h3>NAME</h3>
            <Textarea className="rounded-none focus-visible:ring-0 h-60" />
            <div className="w-full flex justify-end">
              <Button className="" variant={"outline"}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
