import React from "react";

const NavBar = () => (
  <div className="flex h-screen flex-col gap-4 border-r p-2">
    <div className="mb-6 mt-6 flex justify-center">
      <div className="h-8 w-8 overflow-hidden rounded-full">
        <img
          alt="logo"
          className="h-full w-full object-cover"
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3b/7d/a6/3b7da699-8c08-0200-bcc4-71de05c1eee0/AppIconV2-0-0-1x_U007epad-0-0-sRGB-85-220.png/434x0w.webp"
        />
      </div>
    </div>
  </div>
);

export default NavBar;
