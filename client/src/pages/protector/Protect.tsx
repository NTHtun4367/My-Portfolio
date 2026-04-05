import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../store";
import { clearUserInfo } from "../../store/slices/auth";
import { useGetMeQuery } from "../../store/slices/userApi";

function Protect({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isLoading } = useGetMeQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    // No local user info found
    if (!userInfo) {
      navigate("/login");
      return;
    }

    // DB check failed (User deleted, token expired, or modified in DB)
    if (isError) {
      dispatch(clearUserInfo());
      navigate("/login");
    }
  }, [userInfo, isError, navigate, dispatch]);

  // Show a loading state while checking the database
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white font-mono">
        Verifying Session...
      </div>
    );
  }

  // Only render children if we have a local user and the DB check didn't fail
  return userInfo && !isError ? <>{children}</> : null;
}

export default Protect;
