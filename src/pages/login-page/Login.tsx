import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-[600px] max-w-[500px] md:max-w-[600px] bg-secondary flex flex-col gap-9 rounded-3xl justify-center items-center p-6">
        <Button className="w-[300px] py-6">Sign in with Google</Button>
        <Button className="w-[300px] py-6">Sign in with GitHub</Button>
        <Button className="w-[300px] py-6">Sign in with Facebook</Button>
      </div>
    </div>
  );
}

export default Login;
