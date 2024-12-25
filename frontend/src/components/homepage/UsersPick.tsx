import useGetUsersChoice from "@/hooks/useGetUsersChoice";
import UsersPickCard from "./UsersPickCard";

function UsersPick() {
  const { data, isLoading } = useGetUsersChoice();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-7">
        <div>
          <p>Chosen by the users</p>
          <p className="text-lg md:text-xl font-bold">Users Pick</p>
        </div>
        {data?.map((item) => (
          <UsersPickCard
            key={item.post_id}
            category={item.category_name}
            title={item.title}
            author={`${item.familyName} ${item.givenName}`}
            date={item.createDate}
            imageUrl={item.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersPick;
