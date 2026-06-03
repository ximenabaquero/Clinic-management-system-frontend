import LoginPage from "@/features/auth/LoginPage";

export const metadata = {
  title: "Acceso al Sistema",
  description: "",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Login() {
  return <LoginPage />;
}
