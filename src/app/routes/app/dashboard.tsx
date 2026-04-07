// import { ContentLayout } from "@/components/layouts";
// import { ContentLayout } from "../../../components/layouts/content-layout";
import { ContentLayout } from "../../../components/layouts";
import { useUser } from "../../../lib/auth";
import { ROLES } from "../../../lib/authorization";
import { Card, Text, Box, Flex, Avatar } from "@radix-ui/themes";

const DashboardRoute = () => {
  const user = useUser();
  // console.log(user.data);
  // Dummy roles

  if (!user.data) {
    return <div>Loading...</div>; // or skeleton
  }

  return (
    <ContentLayout title="Dashboard">
      <Flex direction="column" gap="3" maxWidth="350px">
        <Card variant="surface">
          <Text as="div" size="2" weight="bold">
            Quick start
          </Text>
          <Text as="div" color="gray" size="2">
            Start building your next project in minutes
          </Text>
        </Card>

        <Card variant="classic">
          <Text as="div" size="2" weight="bold">
            Quick start
          </Text>
          <Text as="div" color="gray" size="2">
            Start building your next project in minutes
          </Text>
        </Card>
      </Flex>
    </ContentLayout>
  );
};

export default DashboardRoute;
