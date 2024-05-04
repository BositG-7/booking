import { useAuth } from "../modules/auth/context";
import md5 from "md5";

const sign = (method: string, url: string, body: any, userSecret: string) => {
  const stringToSign = `${method}${url}${body}${userSecret}`;
  const md5Sign = md5(stringToSign);
  return md5Sign;
};

interface SignProps {
  isbn?: string,
  url?: string
  deleteId?: number
  editId?: number
  status?: string
}


const useAuthHeaders = ({ isbn, url, deleteId, editId, status }: SignProps) => {
  const { user } = useAuth();
  const Key = user?.key || "";
  const userSecret = user?.secret || "";

  const firstRequest = {
    method: "GET",
    url: "/books",
    body: "",
  };

  const secondRequest = {
    method: "POST",
    url: "/users",
    body: "",
  };

  const thirdRequest = {
    method: "POST",
    url: "/books",
    body: JSON.stringify({ isbn })
  };

  const fourthRequest = {
    method: "GET",
    url: `/books/${url}`,
    body: "",
  }

  const fifthRequest = {
    method: "DELETE",
    url: `/books/${deleteId}`,
    body: "",
  }

  const sixthRequest = {
    method: "PATCH",
    url: `/books/${editId}`,
    body: JSON.stringify({ status })
  }

  const authHeadersFirst = {
    Key,
    Sign: sign(firstRequest.method, firstRequest.url, firstRequest.body, userSecret),
  };

  const authHeadersSecond = {
    Key,
    Sign: sign(secondRequest.method, secondRequest.url, secondRequest.body, userSecret),
  };

  const authHeadersThird = {
    Key,
    Sign: sign(thirdRequest.method, thirdRequest.url, thirdRequest.body, userSecret),
  }

  const authHeadersFourth = {
    Key,
    Sign: sign(fourthRequest.method, fourthRequest.url, fourthRequest.body, userSecret)
  }

  const authHeadersFifth = {
    Key,
    Sign: sign(fifthRequest.method, fifthRequest.url, fifthRequest.body, userSecret)
  }

  const authHeadersSixth = {
    Key,
    Sign: sign(sixthRequest.method, sixthRequest.url, sixthRequest.body, userSecret)
  }

  return { authHeadersFirst, authHeadersSecond, authHeadersThird, authHeadersFourth, authHeadersFifth, authHeadersSixth };
};

export default useAuthHeaders;