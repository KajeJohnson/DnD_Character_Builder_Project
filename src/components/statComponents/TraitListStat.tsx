import { useEffect, useState } from "react";
import { fetchTrait } from "../../services/statPage.service";
import { Trait } from "../../types/characterOptions/traits.types";

interface TraitProps {
  traits: Trait[];
}

export default function TraitListStatPage({ traits }: TraitProps) {
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);

  //   useEffect(() => {
  //     for (const trait of traits) {
  //       fetchTrait(trait.index).then((trait) => {
  //         console.log("after .then: " + JSON.stringify(trait));
  //         setSelectedTraits([...selectedTraits, trait]);
  //       });
  //       // break;
  //     }
  //   }, []);
  useEffect(() => {
    let ignore = false;
    traits.forEach((trait) =>
      fetchTrait(trait.index).then((trait) => {
        if (!ignore) {
          // console.log("after .then: " + JSON.stringify(equip));
          setSelectedTraits((prev) => [...prev, trait]);
        }
      })
    );
    return () => {
      ignore = true;
    };
  }, []);

  if (selectedTraits.length > 0) {
    return (
      <div>
        <h4>Traits:</h4>
        {selectedTraits.map((trait) => (
          <div key={trait.index}>
            <p>{trait.name}</p>
            <p>{trait.desc}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
