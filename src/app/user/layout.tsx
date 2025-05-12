import StoreProvider from "./component/StoreProveider";

export default function App({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
