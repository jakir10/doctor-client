import { useEffect, useState } from "react";

const useUserRole = (user) => {
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const getUserRole = async () => {
      // Assuming you have an API endpoint that returns the user's role
      const response = await fetch(
        `https://doctors-server-beta.vercel.app/doctor/${user.email}`
      );
      const data = await response.json();
      setIsDoctor(data.doctor);
    };

    if (user) {
      getUserRole();
    }
  }, [user]);

  return isDoctor;
};

export default useUserRole;
