// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState, useContext } from "react";
// import styled from "styled-components";

// import { NearContext } from "@/context";

// const NavbarContainer = styled.nav`
//   background-color: #FFFFFF; // Pure white for the navbar
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
//   padding: 10px 0;
// `;

// const NavbarContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// `;

// const NavbarBrand = styled(Link)`
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #333333; // Dark gray for text
//   font-weight: bold;
//   font-size: 1.2rem;
// `;

// const Logo = styled.div`
//   width: 40px;
//   height: 40px;
//   margin-right: 10px;
// `;

// const LogoutButton = styled.button`
//   background: linear-gradient(to right, #A7C7E7, #C8A2C8); // Gradient from soft blue to lavender
//   color: #FFFFFF; // White text
//   border: none;
//   padding: 8px 16px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-weight: bold;
//   transition: opacity 0.3s ease;

//   &:hover {
//     opacity: 0.9; // Slight opacity change on hover
//   }
// `;
// export const Navigation = () => {
//   const { signedAccountId, wallet } = useContext(NearContext);
//   const [action, setAction] = useState(() => {});
//   const [label, setLabel] = useState("Loading...");

//   useEffect(() => {
//     if (!wallet) return;

//     if (signedAccountId) {
//       setAction(() => wallet.signOut);
//       setLabel(`Logout ${signedAccountId}`);
//     } else {
//       setAction(() => wallet.signIn);
//       setLabel("Login");
//     }
//   }, [signedAccountId, wallet]);

//   return (
//     <NavbarContainer>
//       <NavbarContent>
//         <NavbarBrand href="/" passHref>
//           <Logo>
//             <Image src="/logo.svg" alt="New Social Logo" width={40} height={40} />
//           </Logo>
//           New Social
//         </NavbarBrand>
//         <LogoutButton onClick={action}>{label}</LogoutButton>
//       </NavbarContent>
//     </NavbarContainer>
//   );
// };

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { Social } from "@builddao/near-social-js";
import { NearContext } from "@/context";
import { NetworkId, SocialContractAccountId } from "@/config";

const NavbarContainer = styled.nav`
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #333333;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const UserButton = styled.button`
  background: linear-gradient(to right, #A7C7E7, #C8A2C8);
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;



const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333333;
  font-size: 14px;

  &:hover {
    background-color: #F0F0F0;
  }
`;

const UserButtonContainer = styled.div`
  position: relative;
`;

const DEFAULT_PROFILE_IMAGE = "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const dropdownRef = useRef(null);

  const client = new Social({
    contractId: SocialContractAccountId,
    network: NetworkId,
  });

  useEffect(() => {
    const fetchProfileName = async () => {
      if (signedAccountId) {
        try {
          const profileData = await client.get({keys: [`${signedAccountId}/profile/**`]});
          if (profileData && profileData[signedAccountId]) {
            const userProfile = profileData[signedAccountId].profile;
            setProfileName(userProfile.name || signedAccountId);
            setProfileImage(userProfile.image?.ipfs_cid || "");
          } else {
            setProfileName(signedAccountId);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfileName(signedAccountId);
        }
      }
    };

    fetchProfileName();
  }, [signedAccountId, client]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    wallet.signOut();
    setIsOpen(false);
  };

  const handleProfile = () => {
    // For now, this doesn't do anything
    console.log("Profile clicked");
    setIsOpen(false);
  };

  const getProfileImageUrl = (cid) => {
    return cid
      ? `https://ipfs.near.social/ipfs/${cid}`
      : DEFAULT_PROFILE_IMAGE;
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarBrand href="/" passHref>
          <Logo>
            <Image src="/logo.svg" alt="New Social Logo" width={40} height={40} />
          </Logo>
          New Social
        </NavbarBrand>
        {signedAccountId ? (
          <UserButtonContainer ref={dropdownRef}>
            <UserButton onClick={() => setIsOpen(!isOpen)}>
              
              <Image 
                  src={getProfileImageUrl(profileImage)}
                  alt={profileName}
                  width={28}
                  height={28}
                  style={{ borderRadius: '50%', marginRight: 8 }}
                />
              
              {profileName}
            </UserButton>
            <DropdownMenu isOpen={isOpen}>
              <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </UserButtonContainer>
        ) : (
          <UserButton onClick={() => wallet.signIn()}>Login</UserButton>
        )}
      </NavbarContent>
    </NavbarContainer>
  );
};