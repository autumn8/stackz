interface UserListErrorProps {
  error: string;
}
const UserListError = ({ error }: UserListErrorProps) => {
  return (
    <div className="flex-container flex-column">
      <div className="app-message">
        There was an error loading users. ({error})
      </div>
    </div>
  );
};

export default UserListError;
