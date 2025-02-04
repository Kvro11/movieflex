import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import { FooterLinks } from "./data.ts";

const Footer = () => {
  const socialMedia = [
    { link: "https://www.facebook.com/", icon: <FaFacebook /> },
    { link: "https://www.instagram.com/", icon: <FaInstagram /> },
    { link: "https://www.twitter.com/", icon: <FaSquareXTwitter /> },
    { link: "https://www.youtube.com/", icon: <FaYoutube /> },
  ];
  return (
    <div
      className=" hidden bg-black text-lightColor h-fit px-28 pb-10
      sm:flex items-center justify-center"
    >
      <div className=" flex flex-col gap-5 w-10/12">
        <div className="flex gap-3">
          {socialMedia.map((list) => (
            <a href={list.link} target="_blank" className="text-3xl">
              {list.icon}
            </a>
          ))}
        </div>
        <ul className="flex flex-col flex-wrap h-20 list-none">
          {FooterLinks.map((links: string) => (
            <li className="w-2/12 hover:underline cursor-pointer">{links}</li>
          ))}
        </ul>
        <div className="copyright">
          <div>Service Code</div>
          <span>© 1999-2024 MovieFlex, Inc</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
