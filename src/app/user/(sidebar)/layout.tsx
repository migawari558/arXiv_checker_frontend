import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "./component/sidebar";

export default function sidebarLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Sidebar>
      <Toaster />
      {children}
    </Sidebar>
  );
}
