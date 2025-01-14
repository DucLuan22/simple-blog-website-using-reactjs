import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="items-center flex md:flex-row flex-col md:justify-between gap-y-4 md:gap-y-0">
      <div className="md:basis-2/3 space-y-5">
        <div className="flex gap-x-3 items-center justify-center md:justify-start">
          <div className="text-4xl md:text-lg font-semibold">luanblog</div>
        </div>
        <p className="mx-5 md:mx-0 leading-9 text-xl">
          Discover insights, stories, and inspiration on LuanBlog, your go-to
          destination for engaging content and fresh perspectives. Stay
          connected, stay informed.
        </p>

        <div className="flex justify-center md:justify-start gap-x-10 md:gap-x-3">
          <div className="w-[40px] md:w-[25px] ">
            <img src="/logos/facebook.svg" alt="Facebook" />
          </div>
          <div className="w-[40px] md:w-[25px]">
            <img src="/logos/instagram.svg" alt="Instagram" />
          </div>
          <div className="w-[40px] md:w-[25px]">
            <img src="/logos/tiktok.svg" alt="TikTok" />
          </div>
          <div className="w-[45px] md:w-[35px]">
            <img src="/logos/youtube.svg" alt="YouTube" />
          </div>
        </div>
      </div>

      <div className="flex md:flex-col gap-x-4 md:gap-x-0 flex-row gap-y-2">
        <div className="font-semibold">Links</div>
        <div className="inline-block md:hidden">-</div>
        <Link to="/">Homepage</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="flex md:flex-col gap-x-4 md:gap-x-0 flex-row gap-y-2">
        <div className="font-semibold">Tags</div>
        <div className="inline-block md:hidden">-</div>
        <div>Style</div>
        <div>Fashion</div>
        <div>Coding</div>
        <div>Travel</div>
      </div>
    </div>
  );
}

export default Footer;
