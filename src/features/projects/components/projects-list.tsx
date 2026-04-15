// import { Spinner } from '@/components/ui/spinner';
// import { Table } from '@/components/ui/table';

// import { formatDate } from '@/utils/format';
import { formatDate } from "../../../utils/format";
import { Table } from "../../../components/ui/table";
import { useProjects } from "../api/get-projects";

// import { DeleteUser } from "./delete-user";

export const ProjectList = () => {
  const usersQuery = useProjects();
  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        {/* <Spinner size="lg" /> */}
        loading...
      </div>
    );
  }

  const projects = usersQuery.data?.projects;
  //   console.log(usersQuery);

  if (!projects) return null;

  return (
    <Table
      data={projects}
      columns={[
        {
          title: "Project Name",
          field: "project_name",
        },
        {
          title: "City",
          field: "city",
        },
        {
          title: "State",
          field: "state",
        },
        {
          title: "Address",
          field: "address",
        },
        {
          title: "Created At",
          field: "created_at",
          Cell({ entry: { created_at } }) {
            return <span>{formatDate(created_at)}</span>;
          },
        },
        {
          title: "Updated At",
          field: "updated_at",
          Cell({ entry: { updated_at } }) {
            return <span>{formatDate(updated_at)}</span>;
          },
        },

        {
          title: "",
          field: "id",
          //   Cell({ entry: { id } }) {
          //     return <DeleteUser id={id} />;
          //   },
        },
      ]}
    />
  );
};
