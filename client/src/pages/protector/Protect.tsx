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

  const { isError, isLoading, isFetching } = useGetMeQuery(undefined, {
    // Only run the DB check if we actually have userInfo in Redux
    skip: !userInfo,
  });

  useEffect(() => {
    // If there is NO userInfo in Redux, go to login
    if (!userInfo) {
      navigate("/login", { replace: true });
      return;
    }

    // ONLY kick the user out if the API call is finished and definitely failed
    // Check !isFetching to ensure the request isn't still in flight
    if (isError && !isFetching) {
      dispatch(clearUserInfo());
      navigate("/login", { replace: true });
    }
  }, [userInfo, isError, isFetching, navigate, dispatch]);

  // Show loading while the initial check is happening
  if (isLoading || (userInfo && isFetching)) {
    console.log(isLoading, userInfo, isFetching);

    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white font-mono">
        Verifying Session...
      </div>
    );
  }

  // Final check: only show content if we have info and NO error
  return userInfo && !isError ? <>{children}</> : null;
}

export default Protect;
