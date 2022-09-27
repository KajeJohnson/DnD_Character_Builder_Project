import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CharacterList from "../components/CharacterList";
import { AuthContext } from "../context/auth.context";
import { logout } from "../services/auth.service";
import inside from "../img/inside.png";
import { getUserCharacters } from "../services/character.service";
import { Character } from "../types/character.types";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [userCharacters, setUserCharacters] = useState<Character[]>([]);
  // const [opened, handlers] = useDisclosure(false);
  //do we need character in place of user here?

  useEffect(() => {
    getUserCharacters(user?._id as string).then((characters) =>
      setUserCharacters(characters)
    );
  }, []);
  // const characters = [
  //   { _id: "test", uid: "test", email: "test", displayName: "test" },
  // ];

  //added async
  // const characters = useQuery(
  //   [{}],
  //   async () => await getUserCharacters(user?._id as string)
  // );

  // const { data: characters } = useQuery(
  // 	["characters", user?._id],
  // 	async () => await getUserCharacters(user?._id as string)
  // );

  //use effect call service function set state
  console.log("user", user);

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${inside})`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          margin: "0",
          color: "#fff",
        }}
      >
        <Link to={"/createCharacter"}>
          <button>New character</button>
          {/* {characters && <CharacterList characters={characters} />} */}
          {userCharacters && <CharacterList characters={userCharacters} />}
        </Link>

        {/* below div is for testing - delete later -kj */}
        <div>
          <Link to={"/"}>
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
