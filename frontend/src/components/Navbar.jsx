import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { userLoginInfo } from "../../slices/userslice";
import { useDispatch } from "react-redux";


const Navbar = ({
  logo = {
    url: "#",
    src: "",
    alt: "logo",
    title: "E-Commerce",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop",
    },
  ],
  auth = {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/registration" },
  },
}) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice.value);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    dispatch(userLoginInfo(null));
  }
  return (
    <section className="py-4 fixed w-full z-50 bg-white dark:bg-[#0A0A0A] shadow-md">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-bold">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {
              data ?
                <div className="flex items-center justify-center gap-4">
                  <h2 className="flex items-center gap-1 dark:text-white text-md dark:bg-white/20 bg-gray-200 px-2 py-1 rounded-full"><CgProfile className="text-xl" />{data.name}</h2>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Log out
                  </Button>
                </div> :
                <div className=" items-center flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={auth.login.url}>{auth.login.text}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to={auth.signup.url}>{auth.signup.text}</Link>
                  </Button>
                </div>
            }
            <ModeToggle />
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2">
              <span className="text-lg font-bold">{logo.title}</span>
            </Link>
            <Sheet>
              <div className="grid grid-cols-2 gap-1">
                <ModeToggle />
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <span className="text-lg font-bold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {
                    data ?
                      <div className="mt-5">
                        <h2 className="flex items-center gap-2 text-md"><CgProfile className="text-2xl" />{data.name}</h2>
                        <Button onClick={handleLogout} className="mt-5 w-full" variant="outline" size="sm">
                          Log out
                        </Button>
                      </div> :
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline">
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                        <Button asChild>
                          <Link to={auth.signup.url}>{auth.signup.text}</Link>
                        </Button>
                      </div>
                  }
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div>{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export default Navbar;
