import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { NearContext } from "@/context";

const NavbarContainer = styled.nav`
  background-color: #FFFFFF; // Pure white for the navbar
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  padding: 10px 0;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavbarBrand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333333; // Dark gray for text
  font-weight: bold;
  font-size: 1.2rem;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background: black;
  color: #FFFFFF; // White text
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9; // Slight opacity change on hover
  }
`;
export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarBrand href="/" passHref>
          {/* <Logo>
            <Image src="/logo.svg" alt="New Social Logo" width={40} height={40} />
          </Logo> */}
          Near Social JS Examples
        </NavbarBrand>
        <LogoutButton onClick={action}>{label}</LogoutButton>
      </NavbarContent>
    </NavbarContainer>
  );
};