import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex justify-between mt-32">
      <div className="basis-2/3 space-y-3">
        <div className="flex gap-x-3 items-center">
          <div className="rounded-[100%] border-[1px] border-black w-[50px] overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
              alt="Technology"
            />
          </div>
          <div>Luan Blog</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          sunt quaerat iure quas officia distinctio aliquam consequatur
          quibusdam, ab nemo nam autem odio. Tempora accusamus est unde dolore
          cumque ex?
        </p>

        <div className="flex gap-x-3">
          <div className="w-[20px]">
            <img src="/logos/facebook.svg" alt="Facebook" />
          </div>
          <div className="w-[20px]">
            <img src="/logos/instagram.svg" alt="Instagram" />
          </div>
          <div className="w-[20px]">
            <img src="/logos/tiktok.svg" alt="TikTok" />
          </div>
          <div className="w-[25px]">
            <img src="/logos/youtube.svg" alt="YouTube" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="font-semibold">Links</div>
        <Link to="/">Homepage</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="font-semibold">Tags</div>
        <div>Style</div>
        <div>Fashion</div>
        <div>Coding</div>
        <div>Travel</div>
      </div>
    </div>
  );
}

export default Footer;
