import { Helmet } from "react-helmet-async";
import { Navbar, Footer } from "../organisms";

interface ITemplateProps {
  title?: string;
  children: React.ReactNode;
}

const Template = (props: ITemplateProps) => {
  const { title, children } = props;
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title ? `${title} | AniHub` : "AniHub"}</title>
      </Helmet>
      <Navbar />
      <>{children}</>
      {/* <Footer /> */}
    </>
  );
};

export default Template;
