import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";
import { useQuery } from "react-query";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const { data: profile, isLoading } = useQuery("profile", () =>
    fetch(`http://localhost:5000/myProfile?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Spinner />;
  }
  const { phone, address, education, facebook, image, linkedin } = profile[0];
  const noImg =
    "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
  return (
    <div>
      <div class="card lg:w-2/4  shadow-xl mx-auto bg-base-200">
        <div class="card-body">
          <h2 class="text-center font-bold text-xl text-yellow-400">
            Update Profile
          </h2>
          <div className="mt-10">
            <div class="avatar online  mb-7">
              <div class="w-24 rounded-full">
                <img src={image ? image : noImg} alt={user.display} />
              </div>
            </div>
            <div className="text-left rounded-xl p-5 bg-white">
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1"> Name: </span>{" "}
                <br />
                <span className="font-bold text-xl"> {user?.displayName}</span>
              </h2>
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1"> Email: </span>
                <br />
                <span className="font-bold text-xl"> {user?.email}</span>
              </h2>
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1">
                  {" "}
                  Address:{" "}
                </span>
                <br />
                <span className="font-bold text-xl">
                  {address ? address : "Please Add Your Address"}
                </span>
              </h2>
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1"> Phone: </span>
                <br />
                <span className="font-bold text-xl">
                  {" "}
                  {phone ? phone : "Please Add Your Phone Number"}
                </span>
              </h2>
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1">
                  {" "}
                  Education:{" "}
                </span>
                <br />
                <span className="font-bold text-xl">
                  {" "}
                  {education ? education : "Please Add Your Education"}
                </span>
              </h2>
              <h2 className="mt-7">
                <span className="text-yellow-400 font-bold mr-1">
                  {" "}
                  Linkedin:{" "}
                </span>
                <br />
                <span className="font-bold text-xl">
                  {" "}
                  {linkedin
                    ? linkedin
                    : "Please Add Your Linkedin Profile Link"}
                </span>
              </h2>
              <h2 className="mt-7 mb-7">
                <span className="text-yellow-400 font-bold mr-1">
                  {" "}
                  Facebook:{" "}
                </span>
                <br />
                <span className="font-bold text-xl">
                  {" "}
                  {facebook
                    ? facebook
                    : "Please Add Your Facebook Profile Link"}
                </span>
              </h2>
            </div>
          </div>
          <div class="card-actions justify-center mt-4">
            <Link to="/editProfile" class="btn btn-warning">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
