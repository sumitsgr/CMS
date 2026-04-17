<<<<<<< HEAD
import { Helmet, HelmetData } from "react-helmet-async";
=======
import { Helmet, HelmetData } from 'react-helmet-async';
>>>>>>> origin

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

<<<<<<< HEAD
export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | CMS` : undefined}
=======
export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Bulletproof React` : undefined}
>>>>>>> origin
      defaultTitle="Bulletproof React"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
