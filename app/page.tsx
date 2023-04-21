import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Settings from "@/app/components/navbar/Settings";
import getLeadersBoards, {
  ILeadersBoardsParams,
} from "@/app/actions/getLeadersBoards";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import qs from "query-string"

interface IParams {
  setting: string;
  searchParams: {
    setting: string;
  };
}

const Home = async ({searchParams}: { searchParams: IParams }) => {
  const leadersBoards = await getLeadersBoards(searchParams?.setting ?? "Sum");

  const currentUser = await getCurrentUser();

  if (leadersBoards.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        {/* add filter by max/min/sum */}
        <Settings />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {leadersBoards.map((leader: any, index: number) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {leader.user?.name}
                  </th>
                  <td className="px-6 py-4">{leader.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
