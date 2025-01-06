import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onPublish: () => void;
}

function Header({ onPublish }: HeaderProps) {
  return (
    <div className="w-full flex">
      <Button variant="default" onClick={onPublish}>
        Publish
      </Button>
    </div>
  );
}

export default Header;
