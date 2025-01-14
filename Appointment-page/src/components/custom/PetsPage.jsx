import { useAuthStore } from "@/StateZustand/authStore";
import { usePetStore } from "@/StateZustand/authStore";
import { useMemo } from "react";
import { Button } from '@shad/button';
import { Trash, Pencil } from 'lucide-react'

const PetsData = () => {
  const user = useAuthStore((state) => state.user);
  const currentUser = useAuthStore((state) => state.getUser(user));
  const pets = usePetStore((state) => state.getPets);
  const setPets = usePetStore((state) => state.setPets);
  const clearPets = usePetStore((state) => state.clearPets);

  const currentPets = useMemo(() => {
    if (!currentUser) return [];
    return pets(currentUser?.name) || [];
  }, [pets, currentUser]);

  if (!currentUser) return null;

  function removePet(pet) {
    setPets(currentPets.filter(pets => pets.name !== pet));
    if (currentPets.length === 1 || currentPets.length === 0) {
        clearPets()
    }
}

  return (
    <>{currentPets.length == 0 ? (
      <div className="flex justify-center items-center h-full">
        <h2>Hello</h2>
      </div>
    ) : (
      <div className="flex flex-col justify-center items-center h-full">
        <h1>Current {currentUser.name}'s pets</h1>
        {currentPets.map((pet) => (
          <section key={pet.name}
            className="flex flex-row justify-between items-center m-4 bg-white p-3 rounded-lg shadow-md w-4/5">
            <ul className="list-none p-0">
              <h2 className="mb-2 text-black text-lg">Name: {pet.name}</h2>
              <li className="mb-2"><strong className="text-[#888b8d]">Species:</strong> {pet.species}</li>
              <li className="mb-2"><strong className="text-[#888b8d]">Race:</strong> {pet.race}</li>
              <li className="mb-2"><strong className="text-[#888b8d]">Commenst:</strong> {pet.comments}</li>
            </ul>
            <div className="flex flex-col justify-center items-center w-1/6">
              <Button variant='outline' className="m-2 w-full">
                <Pencil />
              </Button>
              <Button variant='destructive' className="m-2 w-full" onClick={() => removePet(pet.name)}>
                <Trash />
              </Button>
            </div>
          </section>
        ))}
      </div>
    )}</>
  );
};

export default PetsData; 