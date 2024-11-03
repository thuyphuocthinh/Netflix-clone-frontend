import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

export default function HomePage() {
  const user = false;
  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
}
