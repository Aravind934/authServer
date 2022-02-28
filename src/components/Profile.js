import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let [user, setUser] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:8000/user/profile", {
          withCredentials: "include",
        })
        .then((res) => {
          console.log(res.data.data);
          if (!res.data.status === 200) {
            alert(res.data.data.message);
            navigate("/login");
          }
          setUser(res.data.data);
        });
    }
    return () => setUser([]);
  }, []);
  return (
    <Container>
      {user && (
        <div>
          <h4>{user.username}</h4>
          <p>{user.email}</p>
        </div>
      )}
    </Container>
  );
};

export default Profile;
