import { useLocation, useNavigate } from "react-router-dom";
import { googleLogIn } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";

export default function GoogleConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(googleLogIn, {
    onSuccess: () => {
      console.log('성공');
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
      console.log('cc', code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);

  return <div>loading중?</div>;
}
