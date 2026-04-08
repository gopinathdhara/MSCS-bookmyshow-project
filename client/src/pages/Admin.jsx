import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatersTable from "./TheatersTable";

function Admin() {
  const tabItems = [
    {
      key: 1,
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: 2,
      label: "Theaters",
      children: <TheatersTable />,
    },
  ];

  return (
    <div className="p-4">
      {/* <p class="admin-heading">Admin</p> */}
      <Tabs items={tabItems} />
    </div>
  );
}

export default Admin;
