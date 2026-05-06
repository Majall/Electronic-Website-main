import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { ShopContext } from "../context/ShopContextContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const {backendUrl,token}=useContext(ShopContext)

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(backendUrl+"/api/user/profile"
        ,{headers:{token}});
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [backendUrl, token]);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-subtle">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center">
          <img
            src={
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="h-24 w-24 rounded-full border border-border bg-muted object-cover shadow-soft"
          />
        </div>

        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          {user.name}
        </h2>
        <p className="text-xs text-subtle">{user.email}</p>

        <div className="mt-6 rounded-lg border border-border bg-muted/60 p-4 text-left text-xs text-subtle">
          <p className="mb-2">
            <span className="font-semibold text-foreground">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-foreground">Phone:</span>{" "}
            {user.phone || "Not added"}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="sm">Edit profile</Button>
          <Button size="sm" variant="secondary">
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
