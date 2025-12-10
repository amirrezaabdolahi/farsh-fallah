"use client";

import { AttachMoneyRounded, Home, HomeRounded, LocalMallRounded, Logout, LogoutRounded, Settings, SettingsRounded, VerifiedUserRounded } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { id: 1, name: "داشبورد", url: "/", icon: <HomeRounded /> },
    { id: 2, name: "محصولات", url: "/products", icon: <LocalMallRounded /> },
    { id: 3, name: "تنظیمات", url: "/settings", icon: <SettingsRounded /> },
    { id: 4, name: "فروش", url: "/sale", icon: <AttachMoneyRounded /> },
];

const Navbar = () => {

    const pathname = usePathname()

    return (
        <Box
            className="h-16 flex items-center justify-center fixed bottom-5 right-0 left-0 bg-transparent z-50"
        >
            <Card className="flex items-center h-full px-6 py-5 rounded-full! gap-4 overflow-hidden bg-white/50! backdrop-blur-[2px]">
                {links.map((link) => (
                    <Link key={link.id} href={link.url} className={`px-3 py-2 hover:bg-gray-200/50 transition-all duration-200  ${pathname === link.url ? '-translate-y-1 border-b border-blue-400 rounded-b-none text-blue-400' : ''} `}>
                        <Typography variant="button">
                            {
                                pathname === link.url ? link.icon : link.name
                            }
                        </Typography>
                    </Link>
                ))}
            </Card>
        </Box>
    );
};

export default Navbar;
