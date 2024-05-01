import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full h-[600px] max-w-[500px] font-bold md:max-w-[600px] bg-secondary flex flex-col gap-9 rounded-3xl justify-center items-center p-6">
        <Button className="w-[300px] py-6 text-white hover:bg-green-400 bg-green-500 font-semibold">
          <span className="w-7">
            <img src="/logos/google.svg" alt="YouTube" />
          </span>
          <span>Sign in with Google</span>
        </Button>
        <Button className="w-[300px] py-6 text-white hover:bg-gray-400 bg-gray-500 font-semibold flex gap-4 items-center">
          <span className="w-7">
            <img src="/logos/github.svg" alt="YouTube" />
          </span>
          <span> Sign in with GitHub</span>
        </Button>
        <Button className="w-[300px] py-6 text-white hover:bg-blue-500 bg-blue-700 flex gap-4 items-center font-semibold">
          <span className="w-7">
            <img src="/logos/facebook.svg" alt="YouTube" />
          </span>
          <span>Sign in with Facebook</span>
        </Button>
      </div>
    </div>
  );
}

export default Login;
