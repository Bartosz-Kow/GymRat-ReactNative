const BASE_URL = "https://gym-rat-backend.onrender.com";

export const register = async (data: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  console.log("REGISTER STATUS:", res.status);
  console.log("REGISTER BODY:", json);

  if (!json.successful) {
    throw new Error(json.message || "Błąd rejestracji");
  }

  return json;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  console.log("LOGIN STATUS:", res.status);
  console.log("LOGIN BODY:", json);

  if (!json.successful) {
    throw new Error(json.message || "Błąd logowania");
  }

  return json;
};
