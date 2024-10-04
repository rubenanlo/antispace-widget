import { Container } from "@/components/ui/Container";

const AppLayout = ({ children }) => (
  <Container
    as="section"
    className="flex-grow overflow-y-auto px-20 pb-5 pt-20"
  >
    {children}
  </Container>
);

export default AppLayout;
