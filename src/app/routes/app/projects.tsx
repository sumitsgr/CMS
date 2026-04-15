import React from "react";
import { ProjectList } from "../../../features/projects/components/projects-list";
import { ContentLayout } from "../../../components/layouts";
import { Authorization, ROLES } from "../../../lib/authorization";

const ProjectsRoute = () => {
  return (
    <ContentLayout title="Projects">
      {/* <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      > */}
      <ProjectList />
      {/* </Authorization> */}
    </ContentLayout>
  );
};

export default ProjectsRoute;
