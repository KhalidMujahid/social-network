import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.user);

    if (user) {
      return user;
    } else {
      return null;
    }
};

export default useAuth;
